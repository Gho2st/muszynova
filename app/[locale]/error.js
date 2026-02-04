"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Button from "../UI/Buttons/Button";

export default function Error({ error, reset }) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="px-6 xl:px-20 py-32 text-center">
      <h1 className="text-4xl md:text-6xl mb-10">{t("title")}</h1>
      <p className="mb-10">{t("text")}</p>
      <div className="flex justify-center items-center">
        <Button link="/" text={t("button")} />
      </div>{" "}
    </section>
  );
}
