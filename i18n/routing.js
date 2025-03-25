import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["pl", "en"],

  // Used when no locale matches
  defaultLocale: "pl",
  pathnames: {
    "/kontakt": {
      pl: "/kontakt",
      en: "/contact",
    },
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
