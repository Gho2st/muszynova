// app/api/reservations/route.ts
import { NextRequest, NextResponse, after } from "next/server";
import { prismaRestaurant } from "@/lib/prisma-restaurant";
import { ApiError, handleApiError } from "@/lib/api-error";
import { getRestaurant, getRestaurantId } from "@/lib/restaurant";
import { createReservationSchema } from "@/lib/validators";
import { validateReservationTime, calcEndTime } from "@/lib/slots";
import { addDays, localToUtc } from "@/lib/time";
import { requireAdmin } from "@/lib/auth";
import { verifyRecaptcha } from "@/lib/recaptcha";
import {
  reservationEmailData,
  sendNewReservationNotification,
  sendReservationReceived,
} from "@/lib/mailer";

// GET /api/reservations?date=2026-04-25&status=CONFIRMED&customerId=...&upcoming=1
// date w czasie polskim; upcoming=1 → tylko od teraz
export async function GET(request: NextRequest) {
  try {
    if (!(await requireAdmin()))
      return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

    const restaurantId = getRestaurantId();
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const status = searchParams.get("status");
    const customerId = searchParams.get("customerId");
    const upcoming = searchParams.get("upcoming") === "1";

    const where: Record<string, unknown> = { restaurantId };

    if (customerId) where.customerId = customerId;
    if (status) where.status = status;
    if (date) {
      where.startTime = {
        gte: localToUtc(date, "00:00"),
        lt: localToUtc(addDays(date, 1), "00:00"),
      };
    } else if (upcoming) {
      where.endTime = { gte: new Date() };
    }

    const reservations = await prismaRestaurant.reservation.findMany({
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
    const isAdmin = Boolean(await requireAdmin());
    const body = await request.json();

    // usuń restaurantId z body — bierzemy z env
    const data = createReservationSchema.parse({
      ...body,
      restaurantId: restaurant.id,
    });

    // Gość: reCAPTCHA, wybrany stolik i telefon są wymagane
    if (!isAdmin) {
      if (!(await verifyRecaptcha(data.recaptchaToken))) {
        throw new ApiError("Weryfikacja reCAPTCHA nie powiodła się", 400);
      }
      if (!data.tableId) throw new ApiError("Wybierz stolik", 400);
      if (!data.customerData?.phone) {
        throw new ApiError("Podaj numer telefonu", 400);
      }
    }

    const startTime = new Date(data.startTime);
    validateReservationTime(restaurant, startTime, {
      skipAdvanceCheck: isAdmin,
    });

    const endTime = calcEndTime(
      startTime,
      restaurant.defaultReservationDuration,
    );

    // Sprawdzenie konfliktu i zapis w jednej transakcji, żeby dwie równoczesne
    // rezerwacje nie zajęły tego samego stolika
    const reservation = await prismaRestaurant.$transaction(
      async (tx) => {
        // Sprawdź stolik jeśli podany
        if (data.tableId) {
          const table = await tx.table.findUnique({
            where: { id: data.tableId, restaurantId: restaurant.id },
          });

          if (!table) throw new ApiError("Stolik nie istnieje", 404);
          if (!table.isActive) throw new ApiError("Stolik jest nieaktywny", 400);
          if (
            table.capacity < data.partySize ||
            table.minCapacity > data.partySize
          ) {
            throw new ApiError(
              `Stolik nr ${table.number} jest dla ${table.minCapacity}–${table.capacity} osób, rezerwacja dla ${data.partySize}`,
              400,
            );
          }

          const conflict = await tx.reservation.findFirst({
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
        // customerId i nadpisywanie danych istniejącego klienta tylko dla admina
        let customerId = isAdmin ? data.customerId : undefined;
        if (!customerId && data.customerData) {
          const customer = await tx.customer.upsert({
            where: { email: data.customerData.email },
            update: isAdmin
              ? {
                  name: data.customerData.name,
                  phone: data.customerData.phone ?? undefined,
                }
              : {},
            create: data.customerData,
          });
          customerId = customer.id;
        }

        if (!customerId) throw new ApiError("Brak danych klienta", 400);

        return tx.reservation.create({
          data: {
            restaurantId: restaurant.id,
            customerId,
            tableId: data.tableId ?? null,
            startTime,
            endTime,
            durationMinutes: restaurant.defaultReservationDuration,
            partySize: data.partySize,
            notes: data.notes || null,
            status: "PENDING",
          },
          include: {
            customer: true,
            table: true,
          },
        });
      },
      { isolationLevel: "Serializable" },
    );

    if (!isAdmin) {
      // Maile po wysłaniu odpowiedzi. Gość dostaje dane, które sam wpisał.
      const emailData = {
        ...reservationEmailData(reservation),
        customerName: data.customerData.name,
        customerEmail: data.customerData.email,
        customerPhone: data.customerData.phone,
      };
      const adminUrl = `${request.nextUrl.origin}/admin/restauracja`;
      after(async () => {
        const results = await Promise.allSettled([
          sendReservationReceived(emailData),
          sendNewReservationNotification(emailData, adminUrl),
        ]);
        for (const r of results) {
          if (r.status === "rejected")
            console.error("Błąd wysyłki emaila rezerwacji:", r.reason);
        }
      });
    }

    if (isAdmin) return NextResponse.json(reservation, { status: 201 });

    // Niezalogowany nie dostaje danych istniejącego klienta (np. telefonu)
    const { customer, ...rest } = reservation;
    return NextResponse.json(
      { ...rest, customer: { name: customer.name } },
      { status: 201 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
