import Header from "@/app/UI/Header";
import { Link } from "@/i18n/routing";
import RestaurantAdmin from "./RestaurantAdmin";

export const metadata = {
  title: "Rezerwacje restauracji | Admin",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <Header text="Restauracja" />
      <div className="px-[6%] py-12">
        <Link
          href="/admin"
          className="inline-block mb-8 text-sm text-gray-500 hover:text-gray-800"
        >
          ← Panel admina
        </Link>
        <RestaurantAdmin />
      </div>
    </>
  );
}
