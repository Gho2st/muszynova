"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  ArrowLeft,
  Save,
  Languages,
} from "lucide-react";
import RichEditor from "@/app/UI/Blog/RichEditor";

const LOCALES = [
  { code: "pl", label: "Polski", flag: "🇵🇱" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "sk", label: "Slovenčina", flag: "🇸🇰" },
  { code: "ua", label: "Українська", flag: "🇺🇦" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

function generateSlug(title) {
  const map = {
    ą: "a",
    ć: "c",
    ę: "e",
    ł: "l",
    ń: "n",
    ó: "o",
    ś: "s",
    ź: "z",
    ż: "z",
  };
  return title
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (c) => map[c] || c)
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const emptyTranslation = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  ctaTitle: "",
  ctaDescription: "",
  ctaPrimaryLabel: "",
  ctaSecondaryLabel: "",
};

// Puste tłumaczenia budowane z LOCALES — żeby nigdy nie rozjechały się
// z listą zakładek (każdy język z UI ma swój obiekt w formularzu).
function buildEmptyTranslations() {
  return Object.fromEntries(
    LOCALES.map(({ code }) => [code, { ...emptyTranslation }]),
  );
}

const emptyForm = {
  coverImage: "",
  status: "draft",
  publishedAt: "",
  ctaPrimaryUrl: "",
  ctaSecondaryUrl: "",
  translations: buildEmptyTranslations(),
};

// ====================== LISTA ======================
function BlogList({ onNew, onEdit }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await fetch("/api/blog");
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Usunąć wpis "${title}"?`)) return;
    const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Wpis usunięty");
      fetchPosts();
    } else toast.error("Błąd usuwania");
  };

  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.length - published;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">
            Zarządzanie
          </p>
          <h2 className="text-2xl font-medium text-gray-900">Blog</h2>
        </div>
        <button
          onClick={onNew}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-800 hover:bg-green-900 text-green-50 text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={15} />
          Nowy wpis
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Wszystkich", value: posts.length },
          { label: "Opublikowanych", value: published },
          { label: "Szkice", value: drafts },
        ].map((s) => (
          <div key={s.label} className="bg-gray-50 rounded-xl px-4 py-3">
            <p className="text-2xl font-medium text-gray-900">{s.value}</p>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 mt-0.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-100 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-sm mb-4">Brak wpisów. Dodaj pierwszy!</p>
          <button
            onClick={onNew}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-800 hover:bg-green-900 text-green-50 text-sm font-medium rounded-lg transition-colors"
          >
            <Plus size={15} /> Nowy wpis
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
          {posts.map((post) => {
            const pl = post.translations?.find((t) => t.locale === "pl");
            const plTitle = pl?.title || "(bez tytułu PL)";
            const plSlug = pl?.slug || "—";
            const translatedCount = post.translations?.length || 0;

            return (
              <div
                key={post.id}
                className="flex items-center justify-between px-5 py-4 gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {plTitle}
                    </span>
                    <span
                      className={`shrink-0 text-[11px] px-2 py-0.5 rounded-full font-medium ${
                        post.status === "published"
                          ? "bg-green-50 text-green-800"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {post.status === "published" ? "Opublikowany" : "Szkic"}
                    </span>
                    <span className="shrink-0 text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                      {translatedCount}/{LOCALES.length} języków
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString("pl-PL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    {" · "}
                    <span className="font-mono text-gray-300">
                      /blog/{plSlug}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {post.status === "published" && pl?.slug && (
                    <a
                      href={`/blog/${pl.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Eye size={15} />
                    </a>
                  )}

                  <button
                    onClick={() => onEdit(post)}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id, plTitle)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ====================== FORMULARZ ======================
function BlogForm({ post, onBack }) {
  const isEdit = !!post;
  const [activeLocale, setActiveLocale] = useState("pl");
  const [translating, setTranslating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [forceTranslate, setForceTranslate] = useState(false);

  // slugManual budowany z LOCALES — przy edycji wszystkie ręczne, przy nowym wpisie auto.
  const [slugManual, setSlugManual] = useState(() =>
    Object.fromEntries(LOCALES.map(({ code }) => [code, isEdit])),
  );

  const [form, setForm] = useState(() => {
    if (!isEdit) return emptyForm;

    const translations = {};
    LOCALES.forEach(({ code }) => {
      const t = post.translations?.find((tr) => tr.locale === code);
      translations[code] = t
        ? {
            slug: t.slug || "",
            title: t.title || "",
            excerpt: t.excerpt || "",
            content: t.content || "",
            ctaTitle: t.ctaTitle || "",
            ctaDescription: t.ctaDescription || "",
            ctaPrimaryLabel: t.ctaPrimaryLabel || "",
            ctaSecondaryLabel: t.ctaSecondaryLabel || "",
          }
        : { ...emptyTranslation };
    });

    return {
      coverImage: post.coverImage || "",
      status: post.status || "draft",
      ctaPrimaryUrl: post.ctaPrimaryUrl || "",
      ctaSecondaryUrl: post.ctaSecondaryUrl || "",
      publishedAt: post.publishedAt
        ? new Date(post.publishedAt).toISOString().split("T")[0]
        : "",
      translations,
    };
  });

  const setTranslationField = (locale, field, value) => {
    setForm((f) => ({
      ...f,
      translations: {
        ...f.translations,
        [locale]: { ...f.translations[locale], [field]: value },
      },
    }));
  };

  const handleTitleChange = (locale) => (e) => {
    const title = e.target.value;
    setForm((f) => ({
      ...f,
      translations: {
        ...f.translations,
        [locale]: {
          ...f.translations[locale],
          title,
          slug: slugManual[locale]
            ? f.translations[locale].slug
            : generateSlug(title),
        },
      },
    }));
  };

  const handleSlugChange = (locale) => (e) => {
    setSlugManual((m) => ({ ...m, [locale]: true }));
    setTranslationField(locale, "slug", e.target.value);
  };

  const handleTranslate = async () => {
    const { title, excerpt, content } = form.translations.pl;
    if (!title || !content)
      return toast.error("Najpierw wypełnij tytuł i treść po polsku");

    setTranslating(true);
    try {
      const res = await fetch("/api/blog/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: isEdit ? post.id : null,
          force: forceTranslate,
          title,
          excerpt,
          content,
          ctaTitle: form.translations.pl.ctaTitle,
          ctaDescription: form.translations.pl.ctaDescription,
          ctaPrimaryLabel: form.translations.pl.ctaPrimaryLabel,
          ctaSecondaryLabel: form.translations.pl.ctaSecondaryLabel,
        }),
      });

      const data = await res.json();

      // najpierw obsłuż błąd HTTP
      if (!res.ok) {
        toast.error(data.error || "Błąd tłumaczenia");
        return;
      }

      const translationResults = data.results ?? {};

      // zaktualizuj formularz
      setForm((f) => ({
        ...f,
        translations: {
          ...f.translations,
          ...Object.fromEntries(
            Object.entries(translationResults).map(([locale, t]) => [
              locale,
              {
                slug: t.slug || generateSlug(t.title || ""),
                title: t.title || "",
                excerpt: t.excerpt || "",
                content: t.content || "",
                ctaTitle: t.ctaTitle || "",
                ctaDescription: t.ctaDescription || "",
                ctaPrimaryLabel: t.ctaPrimaryLabel || "",
                ctaSecondaryLabel: t.ctaSecondaryLabel || "",
              },
            ]),
          ),
        },
      }));

      // toasty — jeden komunikat, bez duplikatów
      const skippedCount = Object.keys(data.skipped || {}).length;
      const errorCount = Object.keys(data.errors || {}).length;
      const translatedCount = Object.values(translationResults).filter(
        (t) => t._translatedFields?.length,
      ).length;

      if (translatedCount === 0 && skippedCount > 0 && errorCount === 0) {
        toast.info("Brak zmian do tłumaczenia — wszystkie języki aktualne");
      } else if (translatedCount > 0 && errorCount === 0) {
        toast.success(
          skippedCount > 0
            ? `Przetłumaczono ${translatedCount} języków, pominięto ${skippedCount} (bez zmian)`
            : `Przetłumaczono ${translatedCount} języków`,
        );
      } else if (translatedCount > 0 && errorCount > 0) {
        const failed = Object.keys(data.errors).join(", ").toUpperCase();
        toast.warn(
          `Przetłumaczono ${translatedCount} języków, błędy: ${failed}`,
        );
      } else if (errorCount > 0) {
        const failed = Object.keys(data.errors).join(", ").toUpperCase();
        toast.error(`Błąd tłumaczenia dla: ${failed}`);
      }
    } catch (err) {
      console.error("[translate] fetch error:", err);
      toast.error("Błąd połączenia z serwerem");
    } finally {
      setTranslating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pl = form.translations.pl;
    if (!pl.slug || !pl.title || !pl.content)
      return toast.error("Wypełnij slug, tytuł i treść po polsku");

    setSaving(true);
    const res = await fetch(isEdit ? `/api/blog/${post.id}` : "/api/blog", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success(isEdit ? "Wpis zaktualizowany" : "Wpis utworzony");
      onBack();
    } else {
      const err = await res.json();
      toast.error(err.error || "Błąd zapisu");
    }
    setSaving(false);
  };

  const fieldClass =
    "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors bg-white";
  const t = form.translations[activeLocale];
  const slugPrefix =
    activeLocale === "pl" ? "/blog/" : `/${activeLocale}/blog/`;

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={14} /> Blog
          </button>
          <span className="text-gray-300 text-sm">/</span>
          <span className="text-sm text-gray-500">
            {isEdit ? "Edytuj wpis" : "Nowy wpis"}
          </span>
        </div>
        <h2 className="text-2xl font-medium text-gray-900">
          {isEdit ? "Edytuj wpis" : "Nowy wpis"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
        {/* Ustawienia ogólne */}
        <div className="p-4 bg-gray-50 rounded-xl flex flex-col gap-4">
          <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium">
            Ustawienia ogólne
          </p>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1.5">
              URL zdjęcia głównego
            </label>
            <input
              type="text"
              value={form.coverImage}
              onChange={(e) =>
                setForm((f) => ({ ...f, coverImage: e.target.value }))
              }
              placeholder="https://..."
              className={fieldClass}
            />
            {form.coverImage && (
              <img
                src={form.coverImage}
                alt="Podgląd"
                className="mt-2 h-28 w-full object-cover rounded-xl border border-gray-100"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1.5">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({ ...f, status: e.target.value }))
                }
                className={fieldClass}
              >
                <option value="draft">Szkic</option>
                <option value="published">Opublikowany</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1.5">
                Data publikacji
              </label>
              <input
                type="date"
                value={form.publishedAt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, publishedAt: e.target.value }))
                }
                className={fieldClass}
              />
            </div>
          </div>
        </div>

        {/* Treść per język */}
        <div>
          <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
            <label className="block text-[11px] uppercase tracking-widest text-gray-400">
              Treść per język
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={forceTranslate}
                  onChange={(e) => setForceTranslate(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Wymuś pełne tłumaczenie
              </label>
              <button
                type="button"
                onClick={handleTranslate}
                disabled={translating}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 disabled:opacity-50 text-blue-700 text-xs font-medium rounded-lg transition-colors"
              >
                <Languages size={13} />
                {translating ? "Tłumaczę..." : "Przetłumacz AI"}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-4 border-b border-gray-100">
            {LOCALES.map(({ code, label, flag }) => {
              const hasContent = !!form.translations[code]?.title;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setActiveLocale(code)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-t-lg transition-colors border-b-2 -mb-px ${
                    activeLocale === code
                      ? "border-green-700 text-green-800 bg-green-50"
                      : "border-transparent text-gray-400 hover:text-gray-700"
                  }`}
                >
                  <span>{flag}</span>
                  <span>{label}</span>
                  {hasContent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Pola */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1.5">
                Tytuł *{" "}
                <span className="text-gray-300">
                  (slug generowany automatycznie)
                </span>
              </label>
              <input
                type="text"
                value={t.title}
                onChange={handleTitleChange(activeLocale)}
                placeholder="Tytuł wpisu..."
                className={fieldClass}
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1.5">
                Slug (URL) *
              </label>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-gray-400 transition-colors bg-white">
                <span className="px-3 py-2.5 text-xs text-gray-400 bg-gray-50 border-r border-gray-200 shrink-0">
                  {slugPrefix}
                </span>
                <input
                  type="text"
                  value={t.slug}
                  onChange={handleSlugChange(activeLocale)}
                  className="flex-1 px-3 py-2.5 text-sm text-gray-900 focus:outline-none bg-transparent"
                  required={activeLocale === "pl"}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1.5">
                Krótki opis (zajawka)
              </label>
              <textarea
                value={t.excerpt}
                onChange={(e) =>
                  setTranslationField(activeLocale, "excerpt", e.target.value)
                }
                placeholder="Wyświetlany na liście wpisów i w Google..."
                rows={2}
                className={`${fieldClass} resize-none`}
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1.5">
                Treść *
              </label>
              <RichEditor
                key={activeLocale}
                value={t.content}
                onChange={(html) =>
                  setTranslationField(activeLocale, "content", html)
                }
              />
            </div>
          </div>
        </div>

        {/* CTA - teksty per język */}
        <div className="mt-2 p-4 bg-gray-50 rounded-xl flex flex-col gap-3">
          <p className="text-[11px] uppercase tracking-widest text-gray-400 font-medium">
            Sekcja CTA (na końcu wpisu)
          </p>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1.5">
              Tytuł CTA
            </label>
            <input
              type="text"
              value={t.ctaTitle}
              onChange={(e) =>
                setTranslationField(activeLocale, "ctaTitle", e.target.value)
              }
              placeholder="np. Po zwiedzaniu czas na coś dobrego"
              className={fieldClass}
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1.5">
              Opis CTA
            </label>
            <textarea
              value={t.ctaDescription}
              onChange={(e) =>
                setTranslationField(
                  activeLocale,
                  "ctaDescription",
                  e.target.value,
                )
              }
              placeholder="Krótki tekst zachęcający..."
              rows={2}
              className={`${fieldClass} resize-none`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1.5">
                Tekst przycisku 1
              </label>
              <input
                type="text"
                value={t.ctaPrimaryLabel}
                onChange={(e) =>
                  setTranslationField(
                    activeLocale,
                    "ctaPrimaryLabel",
                    e.target.value,
                  )
                }
                placeholder="np. Zobacz park"
                className={fieldClass}
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1.5">
                Tekst przycisku 2
              </label>
              <input
                type="text"
                value={t.ctaSecondaryLabel}
                onChange={(e) =>
                  setTranslationField(
                    activeLocale,
                    "ctaSecondaryLabel",
                    e.target.value,
                  )
                }
                placeholder="np. Zarezerwuj stolik"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1.5">
                URL przycisku 1
              </label>
              <input
                type="text"
                value={form.ctaPrimaryUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, ctaPrimaryUrl: e.target.value }))
                }
                placeholder="/park lub https://..."
                className={fieldClass}
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1.5">
                URL przycisku 2
              </label>
              <input
                type="text"
                value={form.ctaSecondaryUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, ctaSecondaryUrl: e.target.value }))
                }
                placeholder="/restauracja lub https://..."
                className={fieldClass}
              />
            </div>
          </div>
        </div>

        {/* Przyciski */}
        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-800 hover:bg-green-900 disabled:bg-gray-200 disabled:text-gray-400 text-green-50 text-sm font-medium rounded-lg transition-colors"
          >
            <Save size={15} />
            {saving
              ? "Zapisywanie..."
              : isEdit
                ? "Zapisz zmiany"
                : "Utwórz wpis"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium rounded-lg transition-colors"
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
}

// ====================== GŁÓWNY ======================
export default function BlogAdmin() {
  const [view, setView] = useState("list");
  const [editPost, setEditPost] = useState(null);

  const handleEdit = (post) => {
    setEditPost(post);
    setView("edit");
  };
  const handleBack = () => {
    setEditPost(null);
    setView("list");
  };

  if (view === "new") return <BlogForm onBack={handleBack} />;
  if (view === "edit") return <BlogForm post={editPost} onBack={handleBack} />;
  return <BlogList onNew={() => setView("new")} onEdit={handleEdit} />;
}
