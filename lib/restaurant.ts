// lib/restaurant.ts
import { prismaRestaurant } from "./prisma-restaurant";
import { ApiError } from "./api-error";

/**
 * Zwraca dane restauracji na podstawie RESTAURANT_ID z .env.
 * Rzuca ApiError jeśli ID nie jest ustawione lub restauracja nie istnieje.
 */
export async function getRestaurant() {
  const id = process.env.RESTAURANT_ID;
  if (!id) throw new ApiError("RESTAURANT_ID nie jest ustawione w .env", 500);

  const restaurant = await prismaRestaurant.restaurant.findUnique({ where: { id } });
  if (!restaurant) throw new ApiError("Restauracja nie istnieje", 500);

  return restaurant;
}

export function getRestaurantId(): string {
  const id = process.env.RESTAURANT_ID;
  if (!id) throw new ApiError("RESTAURANT_ID nie jest ustawione w .env", 500);
  return id;
}
