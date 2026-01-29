// app/[locale]/restauracja/MenuButtons.js
"use client";

import { useLocale, useTranslations } from "next-intl";
import MenuButton from "@/app/UI/Buttons/MenuButton";

export default function MenuButtons({ className = "" }) {
  const t = useTranslations("restaurantpage");
  const locale = useLocale();

  let menuItems = [];

  if (locale === "pl") {
    menuItems = [
      { text: t("button"), link: "/menu.pdf" },
      { text: t("button4"), link: "/menu-dzieciece.pdf" },
      { text: t("button2"), link: "/karta-alkoholi.pdf" },
    ];
  } else if (locale === "en") {
    menuItems = [{ text: t("button"), link: "/menu-eng.pdf" }];
  } else if (locale === "sk") {
    menuItems = [{ text: t("button"), link: "/menu-sk.pdf" }];
  } else {
    menuItems = [{ text: t("button"), link: "/menu-eng.pdf" }];
  }

  return (
    <div
      className={`flex flex-col gap-10 justify-center items-center ${className}`}
    >
      {menuItems.map((item, index) => (
        <MenuButton key={index} text={item.text} link={item.link} />
      ))}
    </div>
  );
}
