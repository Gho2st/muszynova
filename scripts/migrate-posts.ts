import "dotenv/config";
import { Client } from "pg";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/prisma/client";

// siteId muszynovej w STAREJ (wielostronnej) bazie
const OLD_SITE_ID = "cmq0oz5y60000sv9kxau85zq5";

async function main() {
  const old = new Client({
    connectionString: process.env.OLD_DATABASE_URL_UNPOOLED,
  });
  await old.connect();

  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL_UNPOOLED,
  });
  const prisma = new PrismaClient({ adapter });

  // 1. Wyczysc nowa baze (ma tylko muszynove, wiec kasujemy wszystko)
  const delT = await prisma.postTranslation.deleteMany({});
  const delP = await prisma.post.deleteMany({});
  console.log(
    `Wyczyszczono nowa baze: ${delP.count} postow, ${delT.count} tlumaczen`,
  );

  // 2. Wczytaj ze starej bazy TYLKO posty muszynovej (filtr po siteId)
  const { rows: posts } = await old.query(
    `SELECT * FROM "Post" WHERE "siteId" = $1 ORDER BY id`,
    [OLD_SITE_ID],
  );
  const { rows: trans } = await old.query(
    `SELECT * FROM post_translations WHERE "siteId" = $1 ORDER BY id`,
    [OLD_SITE_ID],
  );

  console.log(
    `Ze starej bazy: ${posts.length} postow, ${trans.length} tlumaczen`,
  );

  const transByPost = new Map();
  for (const t of trans) {
    if (!transByPost.has(t.postId)) transByPost.set(t.postId, []);
    transByPost.get(t.postId).push(t);
  }

  // Deduplikacja slugow w obrebie (locale)
  const usedSlugs = new Set();
  const dedupeSlug = (locale, slug) => {
    const base = slug || "post";
    let candidate = base;
    let n = 2;
    while (usedSlugs.has(`${locale}|${candidate}`)) {
      candidate = `${base}-${n}`;
      n++;
    }
    usedSlugs.add(`${locale}|${candidate}`);
    return candidate;
  };

  let postCount = 0;
  let transCount = 0;
  const renamed = [];

  for (const p of posts) {
    const newPost = await prisma.post.create({
      data: {
        coverImage: p.coverImage,
        status: p.status,
        publishedAt: p.publishedAt,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        ctaPrimaryUrl: p.ctaPrimaryUrl,
        ctaSecondaryUrl: p.ctaSecondaryUrl,
        translations: {
          create: (transByPost.get(p.id) ?? []).map((t) => {
            const finalSlug = dedupeSlug(t.locale, t.slug);
            if (finalSlug !== t.slug) {
              renamed.push(`${t.locale}: "${t.slug}" -> "${finalSlug}"`);
            }
            return {
              locale: t.locale,
              slug: finalSlug,
              title: t.title,
              excerpt: t.excerpt,
              content: t.content,
              ctaTitle: t.ctaTitle,
              ctaDescription: t.ctaDescription,
              ctaPrimaryLabel: t.ctaPrimaryLabel,
              ctaSecondaryLabel: t.ctaSecondaryLabel,
              sourceHashTitle: t.sourceHashTitle,
              sourceHashExcerpt: t.sourceHashExcerpt,
              sourceHashContent: t.sourceHashContent,
              sourceHashCta: t.sourceHashCta,
              createdAt: t.createdAt,
              updatedAt: t.updatedAt,
            };
          }),
        },
      },
      include: { translations: true },
    });
    postCount++;
    transCount += newPost.translations.length;
    const plTitle =
      newPost.translations.find((t) => t.locale === "pl")?.title ?? newPost.id;
    console.log(`  + ${plTitle} (${newPost.translations.length} tlumaczen)`);
  }

  console.log(`\nPrzeniesiono: ${postCount} postow, ${transCount} tlumaczen`);

  if (renamed.length) {
    console.log("\nZmienione slugi (kolizje) - popraw w panelu jesli trzeba:");
    renamed.forEach((r) => console.log("  " + r));
  }

  await old.end();
  await prisma.$disconnect();
  console.log("\nGotowe.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
