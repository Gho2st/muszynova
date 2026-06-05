// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",

  datasource: {
    url: env("DATABASE_URL_UNPOOLED"), // ← używamy unpooled (bez poolera)
  },

  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
