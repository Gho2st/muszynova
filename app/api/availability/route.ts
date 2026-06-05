// app/api/availability/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prismaRestaurant } from "@/lib/prisma-restaurant";
import { ApiError, handleApiError } from "@/lib/api-error";
import { getRestaurant } from "@/lib/restaurant";
import { availabilityQuerySchema } from "@/lib/validators";
import { generateDaySlots, calcEndTime } from "@/lib/slots";

/**
 * GET /api/availability?date=2026-04-25&partySize=4
 */
export async function GET(request: NextRequest) {
  try {
    const restaurant = await getRestaurant();
    const { searchParams } = new URL(request.url);

    const query = availabilityQuerySchema.parse({
      date: searchParams.get("date"),
      partySize: searchParams.get("partySize"),
      tableId: searchParams.get("tableId") ?? undefined,
    });

    if (!restaurant.openingTime || !restaurant.closingTime) {
      throw new ApiError("Restauracja nie ma ustawionych godzin otwarcia", 400);
    }

    const slotTimes = generateDaySlots(
      restaurant.openingTime,
      restaurant.closingTime,
      restaurant.slotDuration,
      restaurant.defaultReservationDuration,
    );

    const tables = await prismaRestaurant.table.findMany({
      where: {
        restaurantId: restaurant.id,
        isActive: true,
        capacity: { gte: query.partySize },
        minCapacity: { lte: query.partySize },
        ...(query.tableId ? { id: query.tableId } : {}),
      },
      orderBy: [{ capacity: "asc" }, { number: "asc" }],
    });

    const dayStart = new Date(`${query.date}T00:00:00.000Z`);
    const dayEnd = new Date(`${query.date}T23:59:59.999Z`);

    const reservations = await prismaRestaurant.reservation.findMany({
      where: {
        restaurantId: restaurant.id,
        status: { in: ["PENDING", "CONFIRMED"] },
        startTime: { lte: dayEnd },
        endTime: { gte: dayStart },
      },
      select: { tableId: true, startTime: true, endTime: true },
    });

    const slots = slotTimes.map((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      const slotStart = new Date(`${query.date}T00:00:00.000Z`);
      slotStart.setUTCHours(hours, minutes, 0, 0);
      const slotEnd = calcEndTime(
        slotStart,
        restaurant.defaultReservationDuration,
      );

      const availableTables = tables.filter((table) => {
        const isOccupied = reservations.some(
          (r) =>
            r.tableId === table.id &&
            r.startTime < slotEnd &&
            r.endTime > slotStart,
        );
        return !isOccupied;
      });

      return {
        time,
        startTime: slotStart.toISOString(),
        endTime: slotEnd.toISOString(),
        available: availableTables.length > 0,
        availableTables: availableTables.map((t) => ({
          id: t.id,
          number: t.number,
          capacity: t.capacity,
          location: t.location,
        })),
      };
    });

    return NextResponse.json({
      date: query.date,
      partySize: query.partySize,
      reservationDuration: restaurant.defaultReservationDuration,
      slots,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
