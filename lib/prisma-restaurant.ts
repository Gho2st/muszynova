import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/restaurant/client";

const g = globalThis as unknown as { prismaRestaurant?: PrismaClient };

const adapter = new PrismaNeon({
  connectionString: process.env.RESTAURANT_DATABASE_URL, // POOLED
});

export const prismaRestaurant =
  g.prismaRestaurant ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production")
  g.prismaRestaurant = prismaRestaurant;
