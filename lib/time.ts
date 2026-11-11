// lib/time.ts
// Godziny restauracji są w czasie polskim, a w bazie trzymamy prawdziwe UTC.

export const TIME_ZONE = "Europe/Warsaw";

const partsFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function getParts(date: Date) {
  const p = Object.fromEntries(
    partsFormatter.formatToParts(date).map((x) => [x.type, x.value]),
  );
  return {
    year: Number(p.year),
    month: Number(p.month),
    day: Number(p.day),
    hour: Number(p.hour),
    minute: Number(p.minute),
    second: Number(p.second),
  };
}

// Różnica (w ms) między czasem polskim a UTC w danej chwili
function offsetMs(date: Date): number {
  const p = getParts(date);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return asUtc - Math.floor(date.getTime() / 1000) * 1000;
}

/**
 * "2026-04-25" + "19:30" (czas polski) → Date (UTC)
 */
export function localToUtc(date: string, time: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, h, min);
  // Dwa przebiegi, żeby trafić z offsetem przy zmianie czasu
  let result = guess - offsetMs(new Date(guess));
  result = guess - offsetMs(new Date(result));
  return new Date(result);
}

/**
 * Date (UTC) → { date: "YYYY-MM-DD", time: "HH:MM", weekday } w czasie polskim
 */
export function utcToLocal(date: Date) {
  const p = getParts(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  const localDate = `${p.year}-${pad(p.month)}-${pad(p.day)}`;
  return {
    date: localDate,
    time: `${pad(p.hour)}:${pad(p.minute)}`,
    minutes: p.hour * 60 + p.minute,
    weekday: weekdayOf(localDate),
  };
}

export function todayLocal(): string {
  return utcToLocal(new Date()).date;
}

// 0 = niedziela ... 6 = sobota
export function weekdayOf(date: string): number {
  return new Date(`${date}T12:00:00Z`).getUTCDay();
}

export function addDays(date: string, days: number): string {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function formatDatePL(date: Date): string {
  return date.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: TIME_ZONE,
  });
}

export function formatTimePL(date: Date): string {
  return date.toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  });
}
