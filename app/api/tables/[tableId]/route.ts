// app/api/tables/[tableId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prismaRestaurant } from "@/lib/prisma-restaurant";
import { ApiError, handleApiError } from "@/lib/api-error";
import { getRestaurantId } from "@/lib/restaurant";
import { updateTableSchema } from "@/lib/validators";

// PATCH /api/tables/[tableId]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ tableId: string }> },
) {
  try {
    const restaurantId = getRestaurantId();
    const { tableId } = await params;
    const body = await request.json();
    const data = updateTableSchema.parse(body);

    const table = await prismaRestaurant.table.update({
      where: { id: tableId, restaurantId },
      data,
    });

    return NextResponse.json(table);
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/tables/[tableId]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ tableId: string }> },
) {
  try {
    const restaurantId = getRestaurantId();
    const { tableId } = await params;

    const activeReservations = await prismaRestaurant.reservation.count({
      where: {
        tableId,
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    });

    if (activeReservations > 0) {
      throw new ApiError(
        "Nie można usunąć stolika z aktywnymi rezerwacjami. Najpierw anuluj rezerwacje.",
        409,
      );
    }

    await prismaRestaurant.table.delete({ where: { id: tableId, restaurantId } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
