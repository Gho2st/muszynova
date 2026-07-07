// lib/api-error.ts
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/client";

export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number = 400,
  ) {
    super(message);
  }
}

export function handleApiError(error: unknown): NextResponse {
  console.error(error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status },
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "Nieprawidłowe dane", details: error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Naruszenie unikalności (np. duplikat numeru stolika)
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Rekord już istnieje (naruszenie unikalności)" },
        { status: 409 },
      );
    }
    // Rekord nie istnieje
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Nie znaleziono" }, { status: 404 });
    }
    // Naruszenie klucza obcego (np. nieistniejący customerId / tableId)
    if (error.code === "P2003") {
      return NextResponse.json(
        { error: "Powiązany rekord nie istnieje" },
        { status: 400 },
      );
    }
  }

  return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
}
