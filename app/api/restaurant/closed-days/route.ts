// app/api/restaurant/closed-days/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prismaRestaurant } from "@/lib/prisma-restaurant";
import { handleApiError } from "@/lib/api-error";
import { getRestaurantId } from "@/lib/restaurant";
import { createClosedDaySchema } from "@/lib/validators";
import { requireAdmin } from "@/lib/auth";

// POST /api/restaurant/closed-days
export async function POST(request: NextRequest) {
  try {
    if (!(await requireAdmin()))
      return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

    const restaurantId = getRestaurantId();
    const body = await request.json();
    const data = createClosedDaySchema.parse(body);

    const closedDay = await prismaRestaurant.closedDay.create({
      data: { ...data, restaurantId },
    });

    return NextResponse.json(closedDay, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
