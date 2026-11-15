// prisma-restaurant/seed.ts
// Tworzy rekord restauracji z godzinami otwarcia (jeśli jeszcze nie istnieje).
// Uruchomienie: npx tsx prisma-restaurant/seed.ts
import { config } from "dotenv";
config({ path: ".env" });
config({ path: ".env.local" });

// Import dynamiczny (w main), żeby klient Prismy widział zmienne z .env
let prisma: typeof import("../lib/prisma-restaurant").prismaRestaurant;

// 0 = niedziela ... 6 = sobota; codziennie 12–21
const OPENING_HOURS = [0, 1, 2, 3, 4, 5, 6].map((weekday) => ({
  weekday,
  openTime: "12:00",
  closeTime: "21:00",
}));

async function main() {
  ({ prismaRestaurant: prisma } = await import("../lib/prisma-restaurant"));
  const id = process.env.RESTAURANT_ID;

  const existing = id
    ? await prisma.restaurant.findUnique({ where: { id } })
    : await prisma.restaurant.findFirst();

  if (existing) {
    console.log(`✅ Restauracja już istnieje: ${existing.name} (id: ${existing.id})`);
    return;
  }

  const restaurant = await prisma.restaurant.create({
    data: {
      // Używamy RESTAURANT_ID z .env, żeby nie trzeba było go zmieniać
      ...(id ? { id } : {}),
      name: "Restauracja Muszynova",
      address: "ul. Złockie 77c, 33-370 Muszyna",
      phone: "+48 509 445 000",
      email: "biuro@muszynova.pl",
      defaultReservationDuration: 90,
      slotDuration: 30,
      minAdvanceMinutes: 120,
      maxAdvanceDays: 60,
      openingHours: { create: OPENING_HOURS },
    },
  });

  console.log(`✅ Restauracja utworzona: ${restaurant.name}`);
  if (!id) console.log(`\n👉 Ustaw w .env:\nRESTAURANT_ID=${restaurant.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma?.$disconnect());
