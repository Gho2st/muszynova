// app/api/reservations/[id]/route.ts
import { NextRequest, NextResponse, after } from "next/server";
import { prismaRestaurant } from "@/lib/prisma-restaurant";
import { ApiError, handleApiError } from "@/lib/api-error";
import { getRestaurantId } from "@/lib/restaurant";
import { updateReservationSchema } from "@/lib/validators";
import {
  reservationEmailData,
  sendReservationCancelled,
  sendReservationConfirmation,
} from "@/lib/mailer";
import { requireAdmin } from "@/lib/auth";

// GET /api/reservations/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    if (!(await requireAdmin()))
      return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

    const restaurantId = getRestaurantId();
    const { id } = await params;

    const reservation = await prismaRestaurant.reservation.findUnique({
      where: { id, restaurantId },
      include: { customer: true, table: true },
    });

    if (!reservation) throw new ApiError("Rezerwacja nie istnieje", 404);
    return NextResponse.json(reservation);
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH /api/reservations/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    if (!(await requireAdmin()))
      return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

    const restaurantId = getRestaurantId();
    const { id } = await params;
    const body = await request.json();
    const data = updateReservationSchema.parse(body);

    const existing = await prismaRestaurant.reservation.findUnique({
      where: { id, restaurantId },
      include: { customer: true, table: true },
    });
    if (!existing) throw new ApiError("Rezerwacja nie istnieje", 404);

    // Walidacja przejść statusu
    if (data.status) {
      const allowed = getAllowedTransitions(existing.status);
      if (!allowed.includes(data.status)) {
        throw new ApiError(
          `Nie można zmienić statusu z ${existing.status} na ${data.status}`,
          400,
        );
      }
    }

    // Sprawdź stolik i konflikt jeśli zmieniamy stolik
    if (data.tableId && data.tableId !== existing.tableId) {
      const table = await prismaRestaurant.table.findUnique({
        where: { id: data.tableId, restaurantId },
      });
      if (!table) throw new ApiError("Stolik nie istnieje", 404);
      if (table.capacity < existing.partySize) {
        throw new ApiError(
          `Stolik nr ${table.number} jest za mały (do ${table.capacity} os.)`,
          400,
        );
      }

      const conflict = await prismaRestaurant.reservation.findFirst({
        where: {
          id: { not: id },
          tableId: data.tableId,
          status: { in: ["PENDING", "CONFIRMED"] },
          startTime: { lt: existing.endTime },
          endTime: { gt: existing.startTime },
        },
      });
      if (conflict) {
        throw new ApiError("Ten stolik jest już zajęty w tym terminie", 409);
      }
    }

    const updateData: Record<string, unknown> = { ...data };
    if (data.status === "CONFIRMED") updateData.confirmedAt = new Date();
    if (data.status === "CANCELLED") updateData.cancelledAt = new Date();

    const reservation = await prismaRestaurant.reservation.update({
      where: { id },
      data: updateData,
      include: { customer: true, table: true },
    });

    // Mail do gościa po zatwierdzeniu / odwołaniu (po wysłaniu odpowiedzi)
    const send =
      data.status === "CONFIRMED"
        ? sendReservationConfirmation
        : data.status === "CANCELLED"
          ? sendReservationCancelled
          : null;
    if (send) {
      const emailData = reservationEmailData(reservation);
      after(() =>
        send(emailData).catch((err) => {
          console.error("Błąd wysyłki emaila do gościa:", err);
        }),
      );
    }

    return NextResponse.json(reservation);
  } catch (error) {
    return handleApiError(error);
  }
}

function getAllowedTransitions(current: string): string[] {
  const transitions: Record<string, string[]> = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["COMPLETED", "CANCELLED", "NO_SHOW"],
    CANCELLED: [],
    COMPLETED: [],
    NO_SHOW: [],
  };
  return transitions[current] ?? [];
}
