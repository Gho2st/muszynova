import "dotenv/config";
import { Client } from "pg";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/prisma/client"; // dopasuj do output

const SITE = {
  domain: "muszynova.pl",
  name: "Muszynova",
  isMultilingual: true,
  defaultLocale: "pl",
};

async function main() {
  const old = new Client({
    connectionString: process.env.OLD_DATABASE_URL_UNPOOLED,
  });
  await old.connect();

  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL_UNPOOLED,
  });
  const prisma = new PrismaClient({ adapter });

  // 1. Site
  const site = await prisma.site.upsert({
    where: { domain: SITE.domain },
    update: {},
    create: SITE,
  });
  console.log("Site id:", site.id);

  // 2. PELNE czyszczenie danych muszynova.
  //    Najpierw tlumaczenia po siteId (lapie tez osierocone z poprzednich prob),
  //    potem posty po siteId.
  const delT = await prisma.postTranslation.deleteMany({
    where: { siteId: site.id },
  });
  const delP = await prisma.post.deleteMany({ where: { siteId: site.id } });
  console.log(
    `Wyczyszczono: ${delP.count} postow, ${delT.count} tlumaczen (w tym osierocone)`,
  );

  // 3. Wczytaj ze starej bazy
  const { rows: posts } = await old.query(`SELECT * FROM "Post" ORDER BY id`);
  const { rows: trans } = await old.query(
    `SELECT * FROM post_translations ORDER BY id`,
  );

  const transByPost = new Map();
  for (const t of trans) {
    if (!transByPost.has(t.postId)) transByPost.set(t.postId, []);
    transByPost.get(t.postId).push(t);
  }

  // Deduplikacja slugow w obrebie (locale): przy kolizji dopisujemy -2, -3, ...
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
        siteId: site.id,
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
              siteId: site.id,
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
  }

  console.log(
    `Przeniesiono: ${postCount} postow (ze starych ${posts.length}), ${transCount} tlumaczen (ze starych ${trans.length})`,
  );

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
