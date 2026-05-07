// prisma/seed.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DIRECT_URL!;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const existing = await prisma.restaurant.findFirst();

  if (existing) {
    console.log(
      `✅ Restauracja już istnieje: ${existing.name} (id: ${existing.id})`,
    );
    console.log(`\n👉 Ustaw w .env:\nRESTAURANT_ID=${existing.id}`);
    return;
  }

  const restaurant = await prisma.restaurant.create({
    data: {
      name: "Moja Restauracja",
      address: "ul. Przykładowa 1, Warszawa",
      phone: "+48 123 456 789",
      email: "kontakt@restauracja.pl",
      openingTime: "12:00",
      closingTime: "23:00",
      defaultReservationDuration: 90,
      slotDuration: 30,
    },
  });

  console.log(`✅ Restauracja utworzona: ${restaurant.name}`);
  console.log(`\n👉 Ustaw w .env:\nRESTAURANT_ID=${restaurant.id}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
