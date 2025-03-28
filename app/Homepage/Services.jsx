import { PiWall } from "react-icons/pi";
import { GiThrowingBall } from "react-icons/gi";
import { MdOutlineSportsCricket } from "react-icons/md";
import { MdOutlinePedalBike } from "react-icons/md";
import { GiBowlingStrike } from "react-icons/gi";
import { GiKidSlide } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { FaTv } from "react-icons/fa";
import { IoIosFitness } from "react-icons/io";
import { IoFitness } from "react-icons/io5";
import { FaBusinessTime } from "react-icons/fa6";
import { TbMassage } from "react-icons/tb";
import Button from "../UI/Buttons/Button";

export default function Services({ t }) {
  return (
    <section className="bg-black px-6 xl:px-44 py-20">
      <h2 className="text-4xl xl:text-5xl font-extrabold text-white mb-24 text-center">
        {t("header")}
      </h2>
      <div className="grid xl:grid-cols-2 xl:p-10 gap-10">
        {/* card 1 */}
        <div className="bg-white p-6 xl:p-10">
          <h3 className="text-3xl xl:text-4xl font-bold text-center mb-16">
            {t("cards.1.header")}
          </h3>
          <ul className="my-10 text-xl xl:text-2xl font-medium">
            <li className="flex gap-3 items-center mt-5">
              <PiWall className="text-customGold text-4xl xl:text-6xl" />
              {t("cards.1.text1")}
            </li>
            <li className="flex gap-3 items-center mt-5">
              <GiThrowingBall className="text-customGold text-4xl xl:text-6xl" />
              {t("cards.1.text2")}
            </li>
            <li className="flex gap-3 items-center mt-5">
              <MdOutlineSportsCricket className="text-customGold text-4xl xl:text-6xl" />
              {t("cards.1.text3")}
            </li>
            <li className="flex gap-3 items-center mt-5">
              <MdOutlinePedalBike className="text-customGold text-4xl xl:text-6xl" />
              {t("cards.1.text4")}
            </li>
          </ul>
          <div className="flex items-center justify-center">
            <Button
              text={t("cards.button")}
              bgColor="bg-[#C4966C]"
              textColor="text-white"
              link="/park"
            />
          </div>
        </div>
        {/* card 2 */}
        <div className="bg-white p-6 xl:p-10">
          <h3 className="text-3xl xl:text-4xl font-bold text-center mb-16">
            {t("cards.2.header")}
          </h3>
          <ul className="my-10 text-xl xl:text-2xl font-medium">
            <li className="flex gap-3 items-center mt-5">
              <GiBowlingStrike className="text-customGold text-4xl xl:text-6xl" />
              {t("cards.2.text1")}
            </li>
            <li className="flex gap-3 items-center mt-5">
              <GiKidSlide className="text-customGold text-4xl xl:text-6xl" />
              {t("cards.2.text2")}
            </li>
            <li className="flex gap-3 items-center mt-5">
              <IoGameController className="text-customGold text-4xl xl:text-6xl" />
              {t("cards.2.text3")}
            </li>
            <li className="flex gap-3 items-center mt-5">
              <FaTv className="text-customGold text-4xl xl:text-6xl" />
              {t("cards.2.text4")}
            </li>
          </ul>
          <div className="flex items-center justify-center">
            <Button
              text={t("cards.button")}
              bgColor="bg-[#C4966C]"
              textColor="text-white"
              link="/park"
            />
          </div>
        </div>
        {/* card 3 */}
        <div className="bg-white p-6 xl:p-10">
          <h3 className="text-3xl xl:text-4xl font-bold text-center mb-16">
            {t("cards.3.header")}
          </h3>
          <ul className="my-10 text-xl xl:text-2xl font-medium">
            <li className="flex gap-3 items-center mt-5">
              <IoIosFitness className="text-customGold text-4xl xl:text-6xl" />
              {t("cards.3.text1")}
            </li>
            <li className="flex gap-3 items-center mt-5">
              <IoFitness className="text-customGold text-4xl xl:text-6xl" />
              {t("cards.3.text2")}
            </li>
          </ul>
          <div className="flex items-center justify-center">
            <Button
              text={t("cards.button")}
              bgColor="bg-[#C4966C]"
              textColor="text-white"
              link="/park"
            />
          </div>
        </div>
        {/* card 4 */}
        <div className="bg-white p-6 xl:p-10">
          <h3 className="text-3xl xl:text-4xl font-bold text-center mb-16">
            {t("cards.4.header")}
          </h3>
          <ul className="my-10 text-xl xl:text-2xl font-medium">
            <li className="flex gap-3 items-center mt-5">
              <FaBusinessTime className="text-customGold text-4xl xl:text-6xl" />
              {t("cards.4.text1")}
            </li>
            <li className="flex gap-3 items-center mt-5">
              <TbMassage className="text-customGold text-4xl xl:text-6xl" />
              {t("cards.4.text2")}
            </li>
          </ul>
          <div className="flex items-center justify-center">
            <Button
              text={t("cards.button")}
              bgColor="bg-[#C4966C]"
              textColor="text-white"
              link="/park"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
