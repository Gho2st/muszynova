import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "./prisma-restaurant/restaurant.prisma",
  datasource: {
    url: env("RESTAURANT_DATABASE_URL_UNPOOLED"),
  },
  migrations: {
    path: "prisma-restaurant/migrations-restaurant", // ← osobny folder, żeby nie kolidował z migracjami bloga
  },
});
