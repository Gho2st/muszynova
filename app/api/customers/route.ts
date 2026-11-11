// app/api/customers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prismaRestaurant } from "@/lib/prisma-restaurant";
import { handleApiError } from "@/lib/api-error";
import { createCustomerSchema } from "@/lib/validators";
import { requireAdmin } from "@/lib/auth";

// GET /api/customers?email=...&name=...
export async function GET(request: NextRequest) {
  try {
    if (!(await requireAdmin()))
      return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const name = searchParams.get("name");

    const customers = await prismaRestaurant.customer.findMany({
      where: {
        ...(email ? { email: { contains: email, mode: "insensitive" } } : {}),
        ...(name ? { name: { contains: name, mode: "insensitive" } } : {}),
      },
      include: { _count: { select: { reservations: true } } },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(customers);
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/customers
export async function POST(request: NextRequest) {
  try {
    if (!(await requireAdmin()))
      return NextResponse.json({ error: "Brak dostępu" }, { status: 401 });

    const body = await request.json();
    const data = createCustomerSchema.parse(body);
    const customer = await prismaRestaurant.customer.create({ data });
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
