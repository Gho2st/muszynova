import { useTranslations } from "next-intl";
import Button from "./Buttons/Button";
export default function CtaLink() {
  const t = useTranslations("cta");
  return (
    <div className="mt-16 md:mt-24 md:w-3/4 mx-auto ">
      <div className="text-center p-6 md:p-10 rounded-2xl bg-customGreen text-white shadow-2xl">
        <h2 className="font-semibold text-2xl md:text-3xl xl:text-4xl">
          {t("header")}
        </h2>
        <p className="my-8 xl:my-12 text-light text-gray-300 md:text-lg xl:text-xl">
          {t.rich("text", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
        <Button text={t("button")} link="/park" />
      </div>
    </div>
  );
}
