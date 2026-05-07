// app/api/reservations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiError, handleApiError } from "@/lib/api-error";
import { getRestaurant, getRestaurantId } from "@/lib/restaurant";
import { createReservationSchema } from "@/lib/validators";
import { validateSlot, validateOpeningHours, calcEndTime } from "@/lib/slots";

// GET /api/reservations?date=2026-04-25&status=CONFIRMED&customerId=...
export async function GET(request: NextRequest) {
  try {
    const restaurantId = getRestaurantId();
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const status = searchParams.get("status");
    const customerId = searchParams.get("customerId");

    const where: Record<string, unknown> = { restaurantId };

    if (customerId) where.customerId = customerId;
    if (status) where.status = status;
    if (date) {
      const dayStart = new Date(`${date}T00:00:00.000Z`);
      const dayEnd = new Date(`${date}T23:59:59.999Z`);
      where.startTime = { gte: dayStart, lte: dayEnd };
    }

    const reservations = await prisma.reservation.findMany({
      where,
      orderBy: { startTime: "asc" },
      include: {
        customer: {
          select: { id: true, name: true, email: true, phone: true },
        },
        table: {
          select: { id: true, number: true, capacity: true, location: true },
        },
      },
    });

    return NextResponse.json(reservations);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/reservations
export async function POST(request: NextRequest) {
  try {
    const restaurant = await getRestaurant();
    const body = await request.json();

    // usuń restaurantId z body — bierzemy z env
    const data = createReservationSchema.parse({
      ...body,
      restaurantId: restaurant.id,
    });

    const startTime = new Date(data.startTime);

    if (startTime < new Date()) {
      throw new ApiError("Nie można rezerwować w przeszłości", 400);
    }

    validateSlot(startTime, restaurant.slotDuration);

    const endTime = calcEndTime(
      startTime,
      restaurant.defaultReservationDuration,
    );

    validateOpeningHours(
      startTime,
      endTime,
      restaurant.openingTime,
      restaurant.closingTime,
    );

    // Sprawdź stolik jeśli podany
    if (data.tableId) {
      const table = await prisma.table.findUnique({
        where: { id: data.tableId, restaurantId: restaurant.id },
      });

      if (!table) throw new ApiError("Stolik nie istnieje", 404);
      if (!table.isActive) throw new ApiError("Stolik jest nieaktywny", 400);
      if (table.capacity < data.partySize) {
        throw new ApiError(
          `Stolik nr ${table.number} ma pojemność ${table.capacity} osób, rezerwacja dla ${data.partySize}`,
          400,
        );
      }

      const conflict = await prisma.reservation.findFirst({
        where: {
          tableId: data.tableId,
          status: { in: ["PENDING", "CONFIRMED"] },
          startTime: { lt: endTime },
          endTime: { gt: startTime },
        },
      });

      if (conflict) {
        throw new ApiError(
          "Ten stolik jest już zajęty w wybranym terminie",
          409,
        );
      }
    }

    // Upsert klienta po emailu
    let customerId = data.customerId;
    if (!customerId && data.customerData) {
      const customer = await prisma.customer.upsert({
        where: { email: data.customerData.email },
        update: {
          name: data.customerData.name,
          phone: data.customerData.phone ?? undefined,
        },
        create: data.customerData,
      });
      customerId = customer.id;
    }

    if (!customerId) throw new ApiError("Brak danych klienta", 400);

    const reservation = await prisma.reservation.create({
      data: {
        restaurantId: restaurant.id,
        customerId,
        tableId: data.tableId ?? null,
        startTime,
        endTime,
        durationMinutes: restaurant.defaultReservationDuration,
        partySize: data.partySize,
        notes: data.notes,
        status: "PENDING",
      },
      include: {
        customer: true,
        table: true,
      },
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
