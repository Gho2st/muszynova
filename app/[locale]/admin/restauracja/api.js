// Wspólne helpery panelu restauracji

export async function api(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const details = data.details
      ? Object.values(data.details).flat().join(", ")
      : null;
    throw new Error(details || data.error || `Błąd ${res.status}`);
  }
  return data;
}

export function todayWarsaw() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Warsaw" }).format(
    new Date(),
  );
}

export function addDays(date, days) {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function formatTime(iso) {
  return new Date(iso).toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Warsaw",
  });
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("pl-PL", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Europe/Warsaw",
  });
}

export function formatDayLong(date) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const STATUS = {
  PENDING: { label: "Oczekuje", className: "bg-amber-100 text-amber-800" },
  CONFIRMED: { label: "Potwierdzona", className: "bg-green-100 text-green-800" },
  CANCELLED: { label: "Odwołana", className: "bg-neutral-200 text-neutral-600" },
  COMPLETED: { label: "Zakończona", className: "bg-blue-100 text-blue-800" },
  NO_SHOW: { label: "Nie przyszli", className: "bg-red-100 text-red-800" },
};

export const inputClass =
  "bg-white border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:border-[#C4966C] focus:outline-none";

export const buttonClass =
  "px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors disabled:opacity-50";
