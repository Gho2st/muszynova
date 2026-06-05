// app/api/restaurant/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prismaRestaurant } from "@/lib/prisma-restaurant";
import { handleApiError } from "@/lib/api-error";
import { getRestaurant } from "@/lib/restaurant";
import { updateRestaurantSchema } from "@/lib/validators";

// GET /api/restaurant
export async function GET() {
  try {
    const restaurant = await getRestaurant();
    return NextResponse.json(restaurant);
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH /api/restaurant
export async function PATCH(request: NextRequest) {
  try {
    const restaurant = await getRestaurant();
    const body = await request.json();
    const data = updateRestaurantSchema.parse(body);

    const updated = await prismaRestaurant.restaurant.update({
      where: { id: restaurant.id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return handleApiError(error);
  }
}
