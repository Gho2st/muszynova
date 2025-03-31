##Muszynova - Wielojęzyczna Strona Parku Rozrywki
Muszynova to nowoczesna, wielojęzyczna strona internetowa dla parku rozrywki, zbudowana przy użyciu Next.js i next-intl. Projekt został zoptymalizowany pod kątem SEO, dostępności (accessibility) i wydajności, z wykorzystaniem narzędzi takich jak Lighthouse. Strona obsługuje 5 języków: polski (pl), angielski (en), słowacki (sk), niemiecki (de) oraz ukraiński (ua).

##Funkcjonalności
Wielojęzyczność: Obsługa 5 języków z dynamicznym routingiem i tłumaczeniem ścieżek (np. /o-nas → /en/about-us).
SEO: Wygenerowana sitemapa (sitemap.xml) z tagami hreflang i x-default dla wielojęzycznych stron, zgodna z wytycznymi Google.
Dostępność (Accessibility): Poprawione atrybuty alt dla obrazów, zgodność z WCAG (np. brak zbędnych słów w alt jak "Zdjęcie").
Optymalizacja wydajności: Leniwe ładowanie obrazów (loading="lazy"), cache'owanie API, optymalizacja Lighthouse (wyniki 90+ w kategoriach Performance, Accessibility, SEO).
Galeria zdjęć: Dynamiczne ładowanie zdjęć z folderów (/public/galeria/park, /public/galeria/restauracja) z użyciem LightGallery.
Responsywność: Strona dostosowana do urządzeń mobilnych i desktopowych.
Dynamiczne tłumaczenia: Komunikaty (np. "Ładowanie...", "Błąd") tłumaczone za pomocą next-intl.

##Użyte technologie
Next.js 14 (App Router) - Framework React do budowania aplikacji SSR/SSG.
next-intl - Biblioteka do obsługi wielojęzyczności i tłumaczeń.
Lighthouse - Narzędzie do audytu wydajności, SEO, dostępności i najlepszych praktyk.
LightGallery - Biblioteka do tworzenia galerii zdjęć z podglądem lightbox.
Tailwind CSS - Framework CSS do stylizacji.
ESLint - Narzędzie do lintingu kodu JavaScript.
Prettier - Narzędzie do formatowania kodu.
