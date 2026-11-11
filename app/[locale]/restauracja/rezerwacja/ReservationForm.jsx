"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "@/i18n/routing";

const RECAPTCHA_SITE_KEY = "6LetqpUqAAAAABRwX_slcBybtlkC7S4X4QZZEYUo";
const WEEKDAYS = [
  "niedziela",
  "poniedziałek",
  "wtorek",
  "środa",
  "czwartek",
  "piątek",
  "sobota",
];

// Dzisiejsza data w czasie polskim, "YYYY-MM-DD"
function todayWarsaw() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Warsaw" }).format(
    new Date(),
  );
}

function addDays(date, days) {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function formatDateLong(date) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

const inputClass =
  "w-full mt-2 bg-neutral-100 placeholder:text-neutral-500 p-3 rounded-lg border border-transparent focus:border-customGold focus:outline-none";

function Step({ number, title, children, disabled }) {
  return (
    <section
      className={`border-t border-neutral-200 py-8 ${disabled ? "opacity-40 pointer-events-none" : ""}`}
    >
      <h2 className="text-xl font-semibold mb-5 flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-customGold text-white text-sm flex items-center justify-center">
          {number}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function ReservationForm() {
  const [restaurant, setRestaurant] = useState(null);
  const [loadError, setLoadError] = useState(null);

  const [date, setDate] = useState(todayWarsaw());
  const [partySize, setPartySize] = useState(2);
  const [availability, setAvailability] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [slot, setSlot] = useState(null);
  const [tableId, setTableId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [done, setDone] = useState(null);
  const recaptchaRef = useRef(null);

  // Dane restauracji (godziny, max liczba osób)
  useEffect(() => {
    fetch("/api/restaurant")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setRestaurant)
      .catch(() =>
        setLoadError(
          "Rezerwacja online jest chwilowo niedostępna. Zadzwoń do nas: +48 509 445 000.",
        ),
      );
  }, []);

  // Wolne godziny po zmianie daty lub liczby osób
  useEffect(() => {
    if (!restaurant || !date) return;
    let cancelled = false;
    setLoadingSlots(true);
    setSlot(null);
    setTableId(null);

    fetch(`/api/availability?date=${date}&partySize=${partySize}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setAvailability(data);
      })
      .catch(() => {
        if (!cancelled) setAvailability({ closed: true, reason: "Błąd połączenia", slots: [] });
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });

    return () => {
      cancelled = true;
    };
  }, [restaurant, date, partySize]);

  const maxDate = restaurant ? addDays(todayWarsaw(), restaurant.maxAdvanceDays) : undefined;
  const maxPartySize = restaurant?.maxPartySize ?? 0;
  const selectedSlot = availability?.slots?.find((s) => s.time === slot);
  const anySlotFree = availability?.slots?.some((s) => s.available);

  // Stoliki pogrupowane po miejscu (sala, taras...)
  const tablesByLocation = useMemo(() => {
    const groups = {};
    for (const t of selectedSlot?.availableTables ?? []) {
      const key = t.location || "Sala";
      (groups[key] ??= []).push(t);
    }
    return Object.entries(groups);
  }, [selectedSlot]);

  const hoursSummary = useMemo(() => {
    if (!restaurant) return [];
    return restaurant.openingHours.map((h) => ({
      day: WEEKDAYS[h.weekday],
      hours: h.openTime ? `${h.openTime} – ${h.closeTime}` : "nieczynne",
    }));
  }, [restaurant]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  function validate() {
    const er = {};
    if (!form.name.trim()) er.name = "Podaj imię i nazwisko";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      er.email = "Podaj poprawny adres email";
    if (!/^\+?[\d\s-]{9,20}$/.test(form.phone.trim()))
      er.phone = "Podaj poprawny numer telefonu";
    if (!form.consent) er.consent = "Zgoda jest wymagana";
    setErrors(er);
    return Object.keys(er).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSending || !selectedSlot || !tableId) return;
    setSubmitError(null);
    if (!validate()) return;

    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) {
      setSubmitError("Potwierdź, że nie jesteś robotem.");
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startTime: selectedSlot.startTime,
          partySize,
          tableId,
          notes: form.notes.trim() || undefined,
          customerData: {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
          },
          recaptchaToken,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        const table = selectedSlot.availableTables.find((t) => t.id === tableId);
        setDone({ date, time: slot, partySize, table, email: form.email.trim() });
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (res.status === 409) {
        // Ktoś zajął stolik w międzyczasie — odśwież wolne godziny
        setSubmitError("Ten stolik został właśnie zajęty. Wybierz inny termin lub stolik.");
        setAvailability(null);
        const fresh = await fetch(
          `/api/availability?date=${date}&partySize=${partySize}`,
        ).then((r) => r.json());
        setAvailability(fresh);
        setTableId(null);
      } else {
        const fieldErrors = data.details
          ? Object.values(data.details).flat().join(", ")
          : null;
        setSubmitError(fieldErrors || data.error || "Nie udało się wysłać rezerwacji.");
      }
      recaptchaRef.current?.reset();
    } catch {
      setSubmitError("Błąd połączenia. Spróbuj ponownie.");
    } finally {
      setIsSending(false);
    }
  }

  if (done) {
    return (
      <div className="max-w-2xl">
        <span className="text-2xl font-semibold text-customGold">
          Dziękujemy! Prośba o rezerwację została wysłana.
        </span>
        <div className="mt-8 bg-neutral-100 rounded-2xl p-6 space-y-2">
          <p>
            <strong>Termin:</strong> {formatDateLong(done.date)}, godz. {done.time}
          </p>
          <p>
            <strong>Liczba osób:</strong> {done.partySize}
          </p>
          {done.table && (
            <p>
              <strong>Stolik:</strong> nr {done.table.number}
              {done.table.location ? ` · ${done.table.location}` : ""}
            </p>
          )}
        </div>
        <p className="font-light text-lg mt-6">
          Rezerwacja czeka na potwierdzenie przez restaurację. Potwierdzenie
          wyślemy na adres <strong>{done.email}</strong>.
        </p>
      </div>
    );
  }

  if (loadError) {
    return <p className="text-lg text-red-600">{loadError}</p>;
  }

  if (!restaurant) {
    return <p className="text-neutral-500">Ładowanie…</p>;
  }

  if (maxPartySize === 0) {
    return (
      <p className="text-lg">
        Rezerwacja online jest chwilowo niedostępna. Zadzwoń do nas: +48 509
        445 000.
      </p>
    );
  }

  return (
    <div className="grid xl:grid-cols-[1fr_320px] gap-12">
      <form onSubmit={handleSubmit} noValidate>
        {/* 1. Termin */}
        <Step number={1} title="Termin i liczba osób">
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="text-sm font-medium text-neutral-700">
              Data
              <input
                type="date"
                value={date}
                min={todayWarsaw()}
                max={maxDate}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="text-sm font-medium text-neutral-700">
              Liczba osób
              <select
                value={partySize}
                onChange={(e) => setPartySize(Number(e.target.value))}
                className={inputClass}
              >
                {Array.from({ length: maxPartySize }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "osoba" : n < 5 ? "osoby" : "osób"}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="text-sm text-neutral-500 mt-3">
            Większa grupa lub impreza okolicznościowa?{" "}
            <Link href="/kontakt" className="text-customGold underline">
              Skontaktuj się z nami
            </Link>
            .
          </p>
        </Step>

        {/* 2. Godzina */}
        <Step number={2} title="Godzina">
          {loadingSlots || !availability ? (
            <p className="text-neutral-500">Sprawdzam wolne terminy…</p>
          ) : availability.closed ? (
            <p className="text-neutral-700">{availability.reason}</p>
          ) : !anySlotFree ? (
            <p className="text-neutral-700">
              Brak wolnych stolików dla {partySize} os. w tym dniu. Wybierz inną
              datę albo zadzwoń: +48 509 445 000.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-3">
                {availability.slots.map((s) => (
                  <button
                    key={s.time}
                    type="button"
                    disabled={!s.available}
                    onClick={() => {
                      setSlot(s.time);
                      setTableId(null);
                    }}
                    className={`py-3 rounded-lg font-medium transition-colors ${
                      slot === s.time
                        ? "bg-customGold text-white"
                        : s.available
                          ? "bg-neutral-100 hover:bg-neutral-200 cursor-pointer"
                          : "bg-neutral-50 text-neutral-300 line-through cursor-not-allowed"
                    }`}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
              <p className="text-sm text-neutral-500 mt-3">
                Stolik rezerwujemy na {availability.reservationDuration} minut.
              </p>
            </>
          )}
        </Step>

        {/* 3. Stolik */}
        <Step number={3} title="Stolik" disabled={!selectedSlot}>
          {!selectedSlot ? (
            <p className="text-neutral-500">Najpierw wybierz godzinę.</p>
          ) : (
            <div className="space-y-6">
              {tablesByLocation.map(([location, tables]) => (
                <div key={location}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                    {location}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {tables.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTableId(t.id)}
                        className={`p-4 rounded-xl text-left border-2 transition-colors cursor-pointer ${
                          tableId === t.id
                            ? "border-customGold bg-customGold/10"
                            : "border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        <span className="block font-semibold">Stolik {t.number}</span>
                        <span className="text-sm text-neutral-500">
                          do {t.capacity} os.
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Step>

        {/* 4. Dane */}
        <Step number={4} title="Twoje dane" disabled={!tableId}>
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="text-sm font-medium text-neutral-700">
              * Imię i nazwisko
              <input
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                className={`${inputClass} ${errors.name ? "!border-red-500" : ""}`}
              />
              {errors.name && <span className="text-red-600 text-xs">{errors.name}</span>}
            </label>
            <label className="text-sm font-medium text-neutral-700">
              * Telefon
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                className={`${inputClass} ${errors.phone ? "!border-red-500" : ""}`}
              />
              {errors.phone && <span className="text-red-600 text-xs">{errors.phone}</span>}
            </label>
            <label className="text-sm font-medium text-neutral-700 sm:col-span-2">
              * Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className={`${inputClass} ${errors.email ? "!border-red-500" : ""}`}
              />
              {errors.email && <span className="text-red-600 text-xs">{errors.email}</span>}
            </label>
            <label className="text-sm font-medium text-neutral-700 sm:col-span-2">
              Uwagi (np. krzesełko dla dziecka, alergie)
              <textarea
                name="notes"
                maxLength={500}
                value={form.notes}
                onChange={handleChange}
                className={`${inputClass} h-28`}
              />
            </label>
          </div>

          <label className="flex items-start gap-3 mt-5 text-sm text-neutral-700">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              className="mt-1 accent-[#C4966C]"
            />
            <span>
              * Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
              realizacji rezerwacji.
              {errors.consent && (
                <span className="block text-red-600 text-xs">{errors.consent}</span>
              )}
            </span>
          </label>

          <div className="mt-6">
            <ReCAPTCHA className="mb-4" ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} />
            {submitError && <p className="text-red-600 mb-4">{submitError}</p>}
            <button
              type="submit"
              disabled={isSending}
              className="bg-customGold text-lg text-white cursor-pointer font-medium whitespace-nowrap flex justify-center items-center gap-2 p-4 clip-custom hover:clip-reverse transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-60"
            >
              {isSending ? "Wysyłanie…" : "Wyślij prośbę o rezerwację"}
            </button>
          </div>
        </Step>
      </form>

      {/* Podsumowanie i godziny */}
      <aside className="xl:sticky xl:top-32 h-fit space-y-6">
        <div className="bg-neutral-100 rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Twoja rezerwacja</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">Data</dt>
              <dd className="text-right">{date ? formatDateLong(date) : "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">Godzina</dt>
              <dd>{slot ?? "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">Osoby</dt>
              <dd>{partySize}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">Stolik</dt>
              <dd>
                {selectedSlot?.availableTables.find((t) => t.id === tableId)?.number ?? "—"}
              </dd>
            </div>
          </dl>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="font-semibold mb-4">Godziny otwarcia</h3>
          <ul className="space-y-1 text-sm">
            {hoursSummary.map((h) => (
              <li key={h.day} className="flex justify-between">
                <span className="capitalize text-neutral-500">{h.day}</span>
                <span>{h.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
