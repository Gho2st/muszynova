"use client";
import { useCallback, useEffect, useState } from "react";
import { api, buttonClass, formatDayLong, inputClass, todayWarsaw } from "./api";

// Kolejność od poniedziałku; weekday jak Date.getDay()
const DAYS = [
  [1, "Poniedziałek"],
  [2, "Wtorek"],
  [3, "Środa"],
  [4, "Czwartek"],
  [5, "Piątek"],
  [6, "Sobota"],
  [0, "Niedziela"],
];

function toForm(r) {
  const hours = Object.fromEntries(
    DAYS.map(([weekday]) => {
      const h = r.openingHours.find((x) => x.weekday === weekday);
      return [
        weekday,
        {
          open: Boolean(h?.openTime),
          openTime: h?.openTime ?? "12:00",
          closeTime: h?.closeTime ?? "21:00",
        },
      ];
    }),
  );
  return {
    name: r.name,
    address: r.address,
    phone: r.phone ?? "",
    email: r.email ?? "",
    defaultReservationDuration: String(r.defaultReservationDuration),
    slotDuration: String(r.slotDuration),
    minAdvanceMinutes: String(r.minAdvanceMinutes),
    maxAdvanceDays: String(r.maxAdvanceDays),
    hours,
  };
}

export default function SettingsTab() {
  const [restaurant, setRestaurant] = useState(null);
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [closed, setClosed] = useState({ date: "", reason: "" });
  const [closedError, setClosedError] = useState(null);

  const load = useCallback(async () => {
    try {
      const r = await api("/api/restaurant");
      setRestaurant(r);
      setForm(toForm(r));
    } catch (e) {
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (!form) return error ? <p className="text-red-600">{error}</p> : <p className="text-neutral-500">Ładowanie…</p>;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const setHour = (weekday, k, v) =>
    setForm({ ...form, hours: { ...form.hours, [weekday]: { ...form.hours[weekday], [k]: v } } });

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const r = await api("/api/restaurant", {
        method: "PATCH",
        body: JSON.stringify({
          name: form.name,
          address: form.address,
          phone: form.phone || undefined,
          email: form.email,
          defaultReservationDuration: Number(form.defaultReservationDuration),
          slotDuration: Number(form.slotDuration),
          minAdvanceMinutes: Number(form.minAdvanceMinutes),
          maxAdvanceDays: Number(form.maxAdvanceDays),
          openingHours: DAYS.map(([weekday]) => {
            const h = form.hours[weekday];
            return {
              weekday,
              openTime: h.open ? h.openTime : null,
              closeTime: h.open ? h.closeTime : null,
            };
          }),
        }),
      });
      setRestaurant(r);
      setForm(toForm(r));
      setMessage("Zapisano.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function addClosed(e) {
    e.preventDefault();
    setClosedError(null);
    try {
      await api("/api/restaurant/closed-days", {
        method: "POST",
        body: JSON.stringify({ date: closed.date, reason: closed.reason.trim() || undefined }),
      });
      setClosed({ date: "", reason: "" });
      load();
    } catch (err) {
      setClosedError(err.message);
    }
  }

  async function removeClosed(id) {
    setClosedError(null);
    try {
      await api(`/api/restaurant/closed-days/${id}`, { method: "DELETE" });
      load();
    } catch (err) {
      setClosedError(err.message);
    }
  }

  const field = (label, k, props = {}) => (
    <label className="text-sm text-neutral-600">
      {label}
      <input value={form[k]} onChange={set(k)} className={`${inputClass} block w-full mt-1`} {...props} />
    </label>
  );

  return (
    <div className="grid xl:grid-cols-2 gap-10">
      <form onSubmit={save} className="space-y-8">
        <section>
          <h2 className="font-semibold mb-4">Godziny otwarcia</h2>
          <ul className="space-y-2">
            {DAYS.map(([weekday, label]) => {
              const h = form.hours[weekday];
              return (
                <li key={weekday} className="flex flex-wrap items-center gap-3">
                  <label className="w-36 flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={h.open} onChange={(e) => setHour(weekday, "open", e.target.checked)} className="accent-[#C4966C]" />
                    {label}
                  </label>
                  {h.open ? (
                    <>
                      <input type="time" step="1800" value={h.openTime} onChange={(e) => setHour(weekday, "openTime", e.target.value)} className={inputClass} />
                      –
                      <input type="time" step="1800" value={h.closeTime} onChange={(e) => setHour(weekday, "closeTime", e.target.value)} className={inputClass} />
                    </>
                  ) : (
                    <span className="text-sm text-neutral-400">nieczynne</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="grid sm:grid-cols-2 gap-4">
          <h2 className="font-semibold sm:col-span-2">Rezerwacje</h2>
          {field("Czas rezerwacji (min)", "defaultReservationDuration", { type: "number", min: 30, max: 360, step: 15 })}
          {field("Co ile minut godziny (min)", "slotDuration", { type: "number", min: 15, max: 60, step: 15 })}
          {field("Najpóźniej przed wizytą (min)", "minAdvanceMinutes", { type: "number", min: 0 })}
          {field("Najdalej do przodu (dni)", "maxAdvanceDays", { type: "number", min: 1, max: 365 })}
        </section>

        <section className="grid sm:grid-cols-2 gap-4">
          <h2 className="font-semibold sm:col-span-2">Dane restauracji</h2>
          {field("Nazwa", "name", { required: true })}
          {field("Adres", "address", { required: true })}
          {field("Telefon", "phone")}
          {field("Email", "email", { type: "email" })}
        </section>

        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving} className={`${buttonClass} bg-[#C4966C] text-white px-6`}>
            {saving ? "Zapisywanie…" : "Zapisz ustawienia"}
          </button>
          {message && <span className="text-green-700 text-sm">{message}</span>}
          {error && <span className="text-red-600 text-sm">{error}</span>}
        </div>
      </form>

      <section>
        <h2 className="font-semibold mb-2">Dni zamknięte</h2>
        <p className="text-sm text-neutral-500 mb-4">
          Np. święta lub imprezy zamknięte — w te dni rezerwacja online jest niedostępna.
        </p>
        <form onSubmit={addClosed} className="flex flex-wrap items-end gap-3 mb-4">
          <input type="date" min={todayWarsaw()} value={closed.date} onChange={(e) => setClosed({ ...closed, date: e.target.value })} className={inputClass} required />
          <input placeholder="Powód (opcjonalnie)" value={closed.reason} onChange={(e) => setClosed({ ...closed, reason: e.target.value })} className={`${inputClass} flex-1 min-w-40`} />
          <button type="submit" className={`${buttonClass} bg-[#C4966C] text-white`}>Dodaj</button>
        </form>
        {closedError && <p className="text-sm text-red-600 mb-2">{closedError}</p>}
        {restaurant.closedDays.length === 0 ? (
          <p className="text-sm text-neutral-400">Brak zaplanowanych dni zamkniętych.</p>
        ) : (
          <ul className="space-y-2">
            {restaurant.closedDays.map((d) => (
              <li key={d.id} className="flex items-center gap-3 bg-white border border-neutral-200 rounded-lg px-4 py-2">
                <span className="capitalize text-sm flex-1">
                  {formatDayLong(d.date)}
                  {d.reason && <span className="text-neutral-500"> · {d.reason}</span>}
                </span>
                <button type="button" onClick={() => removeClosed(d.id)} className="text-sm text-red-700 hover:underline cursor-pointer">
                  Usuń
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
