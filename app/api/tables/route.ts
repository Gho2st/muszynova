// app/api/tables/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prismaRestaurant } from "@/lib/prisma-restaurant";
import { handleApiError } from "@/lib/api-error";
import { getRestaurantId } from "@/lib/restaurant";
import { createTableSchema } from "@/lib/validators";

// GET /api/tables
export async function GET() {
  try {
    const restaurantId = getRestaurantId();

    const tables = await prismaRestaurant.table.findMany({
      where: { restaurantId },
      orderBy: { number: "asc" },
    });

    return NextResponse.json(tables);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/tables
export async function POST(request: NextRequest) {
  try {
    const restaurantId = getRestaurantId();
    const body = await request.json();
    const data = createTableSchema.parse(body);

    const table = await prismaRestaurant.table.create({
      data: { ...data, restaurantId },
    });

    return NextResponse.json(table, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
