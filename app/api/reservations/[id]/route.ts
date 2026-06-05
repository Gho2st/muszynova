// app/api/reservations/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prismaRestaurant } from "@/lib/prisma-restaurant";
import { ApiError, handleApiError } from "@/lib/api-error";
import { getRestaurantId } from "@/lib/restaurant";
import { updateReservationSchema } from "@/lib/validators";
import { sendReservationConfirmation } from "@/lib/mailer";

// GET /api/reservations/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
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

    // Sprawdź konflikt jeśli zmieniamy stolik
    if (data.tableId && data.tableId !== existing.tableId) {
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

    // Wyślij email potwierdzający gdy admin zatwierdzi rezerwację
    if (data.status === "CONFIRMED") {
      const date = new Date(reservation.startTime).toLocaleDateString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC",
      });
      const time = new Date(reservation.startTime).toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      });

      // Nie blokujemy response — email idzie asynchronicznie
      sendReservationConfirmation({
        customerName: reservation.customer.name,
        customerEmail: reservation.customer.email,
        date,
        time,
        partySize: reservation.partySize,
        tableNumber: reservation.table?.number,
        tableLocation: reservation.table?.location,
        notes: reservation.notes,
      }).catch((err) => {
        console.error("Błąd wysyłki emaila potwierdzającego:", err);
      });
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
