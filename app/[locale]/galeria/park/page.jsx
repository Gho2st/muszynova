import { useTranslations } from "next-intl";
import ImagesR from "./Images";

export const metadata = {
  title: "Galeria Parku Rekreacyjno-Sportowego - Muszynova",
  alternates: {
    canonical: "https://muszynova.pl/galeria/park",
  },
  description:
    "Zapraszamy do galerii parku rekreacyjno-sportowego Muszynova. Zobacz tereny do aktywnego wypoczynku, sportowe atrakcje i piękno przyrody!",
};

export default function GalleryPark() {
  const t = useTranslations("gallery");
  return (
    <div className="px-6 xl:px-24 py-16 xl:py-20 ">
      <h1 className="text-4xl xl:text-5xl font-bold text-customGold text-center mb-16 xl:mb-20">
        {t("header3")}
      </h1>
      <ImagesR />
    </div>
  );
}
