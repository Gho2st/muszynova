"use client";

import { routing, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  function onSelectChange(event) {
    const nextLocale = event.target.value;
    router.replace({ pathname }, { locale: nextLocale });
  }

  return (
    <select
      id="locale-switcher"
      value={locale}
      onChange={onSelectChange}
      className="border p-1 xl:p-2 rounded bg-white text-black"
    >
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          {cur.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
