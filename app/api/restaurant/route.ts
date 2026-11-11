// app/api/restaurant/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prismaRestaurant } from "@/lib/prisma-restaurant";
import { handleApiError } from "@/lib/api-error";
import { getRestaurant } from "@/lib/restaurant";
import { updateRestaurantSchema } from "@/lib/validators";
import { requireAdmin } from "@/lib/auth";

// GET /api/restaurant — publiczne: godziny, dni zamknięte, max liczba osób
export async function GET() {
  try {
    const restaurant = await getRestaurant();
    const biggestTable = await prismaRestaurant.table.aggregate({
      where: { restaurantId: restaurant.id, isActive: true },
      _max: { capacity: true },
    });

    return NextResponse.json({
      ...restaurant,
      maxPartySize: biggestTable._max.capacity ?? 0,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH /api/restaurant
export async function PATCH(request: NextRequest) {
  try {
    if (!(await requireAdmin()))
      return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

    const restaurant = await getRestaurant();
    const body = await request.json();
    const { openingHours, ...data } = updateRestaurantSchema.parse(body);

    await prismaRestaurant.$transaction([
      prismaRestaurant.restaurant.update({
        where: { id: restaurant.id },
        data,
      }),
      ...(openingHours ?? []).map((h) =>
        prismaRestaurant.openingHours.upsert({
          where: {
            restaurantId_weekday: {
              restaurantId: restaurant.id,
              weekday: h.weekday,
            },
          },
          update: { openTime: h.openTime, closeTime: h.closeTime },
          create: { ...h, restaurantId: restaurant.id },
        }),
      ),
    ]);

    return NextResponse.json(await getRestaurant());
  } catch (error) {
    return handleApiError(error);
  }
}
