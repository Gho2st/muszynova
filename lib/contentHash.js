import crypto from "crypto";

export function hash(value) {
  if (!value) return null;
  return crypto
    .createHash("sha256")
    .update(String(value))
    .digest("hex")
    .slice(0, 16);
}

export function hashCta(
  ctaTitle,
  ctaDescription,
  ctaPrimaryLabel,
  ctaSecondaryLabel,
) {
  const combined = [
    ctaTitle,
    ctaDescription,
    ctaPrimaryLabel,
    ctaSecondaryLabel,
  ]
    .map((v) => v || "")
    .join("\n---\n");
  return hash(combined);
}
