// app/api/restaurant/closed-days/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prismaRestaurant } from "@/lib/prisma-restaurant";
import { handleApiError } from "@/lib/api-error";
import { getRestaurantId } from "@/lib/restaurant";
import { requireAdmin } from "@/lib/auth";

// DELETE /api/restaurant/closed-days/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    if (!(await requireAdmin()))
      return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

    const restaurantId = getRestaurantId();
    const { id } = await params;

    await prismaRestaurant.closedDay.delete({ where: { id, restaurantId } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleApiError(error);
  }
}
