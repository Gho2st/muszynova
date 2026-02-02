import { useTranslations } from "next-intl";
import Button from "./Buttons/Button";

export default function NotFoundPage() {
  const t = useTranslations("notfound");

  return (
    <section className="px-6 xl:px-20 py-32 text-center">
      <h1 className="text-4xl md:text-6xl mb-10">{t("title")}</h1>
      <p className="mb-10">{t("text")}</p>
      <div className="flex justify-center items-center">
        <Button link="/" text={t("button")} />
      </div>
    </section>
  );
}
