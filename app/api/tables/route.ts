// app/api/tables/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/lib/api-error";
import { getRestaurantId } from "@/lib/restaurant";
import { createTableSchema } from "@/lib/validators";

// GET /api/tables
export async function GET() {
  try {
    const restaurantId = getRestaurantId();

    const tables = await prisma.table.findMany({
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

    const table = await prisma.table.create({
      data: { ...data, restaurantId },
    });

    return NextResponse.json(table, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
