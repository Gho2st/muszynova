// app/api/availability/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prismaRestaurant } from "@/lib/prisma-restaurant";
import { handleApiError } from "@/lib/api-error";
import { getRestaurant } from "@/lib/restaurant";
import { availabilityQuerySchema } from "@/lib/validators";
import { generateDaySlots, calcEndTime, getDayHours } from "@/lib/slots";
import { addDays, localToUtc, todayLocal } from "@/lib/time";

/**
 * GET /api/availability?date=2026-04-25&partySize=4
 * date i godziny slotów są w czasie polskim
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

    const empty = (reason: string) =>
      NextResponse.json({
        date: query.date,
        partySize: query.partySize,
        closed: true,
        reason,
        slots: [],
      });

    if (
      query.date < todayLocal() ||
      query.date > addDays(todayLocal(), restaurant.maxAdvanceDays)
    ) {
      return empty("Ten termin jest poza zakresem rezerwacji online");
    }

    const hours = getDayHours(restaurant, query.date);
    if (!hours) {
      const closedDay = restaurant.closedDays.find((d) => d.date === query.date);
      return empty(
        closedDay?.reason
          ? `W tym dniu restauracja jest nieczynna (${closedDay.reason})`
          : "W tym dniu restauracja jest nieczynna",
      );
    }

    const slotTimes = generateDaySlots(
      hours.openTime,
      hours.closeTime,
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

    const dayStart = localToUtc(query.date, "00:00");
    const dayEnd = localToUtc(addDays(query.date, 1), "00:00");

    const reservations = await prismaRestaurant.reservation.findMany({
      where: {
        restaurantId: restaurant.id,
        status: { in: ["PENDING", "CONFIRMED"] },
        startTime: { lt: dayEnd },
        endTime: { gt: dayStart },
      },
      select: { tableId: true, startTime: true, endTime: true },
    });

    const minStart = Date.now() + restaurant.minAdvanceMinutes * 60 * 1000;

    const slots = slotTimes.map((time) => {
      const slotStart = localToUtc(query.date, time);
      const slotEnd = calcEndTime(
        slotStart,
        restaurant.defaultReservationDuration,
      );

      const availableTables =
        slotStart.getTime() < minStart
          ? []
          : tables.filter(
              (table) =>
                !reservations.some(
                  (r) =>
                    r.tableId === table.id &&
                    r.startTime < slotEnd &&
                    r.endTime > slotStart,
                ),
            );

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
      closed: false,
      openTime: hours.openTime,
      closeTime: hours.closeTime,
      reservationDuration: restaurant.defaultReservationDuration,
      slots,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
