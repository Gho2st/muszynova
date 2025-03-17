import Link from "next/link";
import { FaShoppingBasket } from "react-icons/fa";

export default function SalesButton(props) {
  return (
    <div>
      <button>
        <Link
          className="text-black text-lg font-medium whitespace-nowrap flex justify-center items-center gap-2 bg-white p-4 clip-custom hover:clip-reverse transition-all duration-300 transform hover:scale-105"
          href="https://muszynova.oos.pl/customer/login"
        >
          <FaShoppingBasket className="text-[#C4966C]" />
          {props.text}
        </Link>
      </button>
    </div>
  );
}
