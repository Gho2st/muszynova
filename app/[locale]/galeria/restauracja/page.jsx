import ImagesR from "./Images";

export const metadata = {
  title: "Galeria Restauracji - Muszynova",
  alternates: {
    canonical: "https://muszynova.pl/galeria/restauracja",
  },
  description:
    "Odkryj galerię zdjęć restauracji Muszynova. Zobacz wyjątkowe wnętrza pełne elegancji, apetyczne dania przygotowane z pasją oraz niepowtarzalną atmosferę, która zachwyca gości i sprawia, że każda wizyta staje się niezapomniana!",
};

export default function GalleryRestaurant() {
  return (
    <div className="px-6 xl:px-24 py-16 xl:py-20 ">
      <h1 className="text-4xl xl:text-5xl font-bold text-customGold text-center mb-16 xl:mb-20">
        Galeria Restauracji
      </h1>
      <ImagesR />
    </div>
  );
}
