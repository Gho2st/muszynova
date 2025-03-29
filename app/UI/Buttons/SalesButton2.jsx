import { Link } from "@/i18n/routing";
import { FaShoppingBasket } from "react-icons/fa";

export default function SalesButton2(props) {
  return (
    <div>
      <button>
        <Link
          className="text-white text-lg font-medium whitespace-nowrap flex justify-center items-center gap-2 bg-[#C4966C] p-4 clip-custom hover:clip-reverse transition-all duration-300 transform hover:scale-105"
          href="https://muszynova.oos.pl/customer/login"
        >
          <FaShoppingBasket className="text-white" />
          {props.text}
        </Link>
      </button>
    </div>
  );
}
