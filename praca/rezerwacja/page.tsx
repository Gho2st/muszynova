"use client";

import { useState } from "react";

type AvailableTable = {
  id: string;
  number: number;
  capacity: number;
  location: string | null;
};

type Slot = {
  time: string;
  startTime: string;
  available: boolean;
  availableTables: AvailableTable[];
};

type Step = "datetime" | "details" | "confirm" | "success";

export default function ReservationPage() {
  const [step, setStep] = useState<Step>("datetime");
  const [date, setDate] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [selectedTableId, setSelectedTableId] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const today = new Date().toISOString().split("T")[0];

  async function fetchSlots() {
    if (!date) return;
    setLoadingSlots(true);
    setError("");
    setSlots([]);
    setSelectedSlot(null);
    try {
      const res = await fetch(
        `/api/availability?date=${date}&partySize=${partySize}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd pobierania slotów");
      setSlots(data.slots);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Błąd serwera");
    } finally {
      setLoadingSlots(false);
    }
  }

  function selectSlot(slot: Slot) {
    setSelectedSlot(slot);
    setSelectedTableId(slot.availableTables[0]?.id ?? "");
  }

  async function submitReservation() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startTime: selectedSlot!.startTime,
          partySize,
          tableId: selectedTableId || undefined,
          customerData: {
            name: form.name,
            email: form.email,
            phone: form.phone || undefined,
          },
          notes: form.notes || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd rezerwacji");
      setStep("success");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Błąd serwera");
    } finally {
      setSubmitting(false);
    }
  }

  const partySizeLabel =
    partySize === 1
      ? "1 osoba"
      : partySize < 5
        ? `${partySize} osoby`
        : `${partySize} osób`;

  const STEPS: Step[] = ["datetime", "details", "confirm"];
  const STEP_LABELS: Record<Step, string> = {
    datetime: "Termin",
    details: "Dane",
    confirm: "Potwierdź",
    success: "",
  };

  return (
    <main className="min-h-screen bg-[#0e0c09] text-[#f0e6cc] flex items-start justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        {/* Header */}
        <header className="text-center mb-10">
          <p className="text-[#c9a84c] tracking-[0.35em] text-xs mb-4">✦ ✦ ✦</p>
          <h1 className="font-serif text-5xl font-light tracking-wide mb-2">
            Rezerwacja
          </h1>
          <p className="text-[#6b5a2a] text-xs tracking-[0.25em] uppercase mb-5">
            Restauracja Muszynova
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent mx-auto" />
        </header>

        {/* Step indicator */}
        {step !== "success" && (
          <div className="flex items-center justify-center mb-8">
            {STEPS.map((s, i) => {
              const currentIdx = STEPS.indexOf(step);
              const isDone = currentIdx > i;
              const isActive = step === s;
              return (
                <div key={s} className="flex items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs transition-all
                      ${isActive ? "border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/10" : ""}
                      ${isDone ? "border-[#6b5a2a] text-[#6b5a2a]" : ""}
                      ${!isActive && !isDone ? "border-[#2a2418] text-[#4a4030]" : ""}
                    `}
                    >
                      {isDone ? "✓" : i + 1}
                    </div>
                    <span className="text-[10px] tracking-widest uppercase text-[#4a4030]">
                      {STEP_LABELS[s]}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className="w-14 h-px bg-[#2a2418] mx-1 mb-5" />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── STEP 1 ─────────────────────────────────────────────────────── */}
        {step === "datetime" && (
          <div className="bg-[#15120d] border border-[#2a2418] p-8 flex flex-col gap-6">
            <h2 className="font-serif text-2xl font-light">Wybierz termin</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#8a7a5a]">
                  Data
                </label>
                <input
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-[#0e0c09] border border-[#2a2418] text-[#f0e6cc] text-sm px-3 py-2.5 outline-none focus:border-[#c9a84c] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#8a7a5a]">
                  Liczba osób
                </label>
                <div className="flex items-center border border-[#2a2418] bg-[#0e0c09] h-[42px]">
                  <button
                    onClick={() => setPartySize((p) => Math.max(1, p - 1))}
                    className="w-10 text-[#8a7a5a] hover:text-[#c9a84c] transition-colors text-xl"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center text-sm">
                    {partySize}
                  </span>
                  <button
                    onClick={() => setPartySize((p) => Math.min(20, p + 1))}
                    className="w-10 text-[#8a7a5a] hover:text-[#c9a84c] transition-colors text-xl"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={fetchSlots}
              disabled={!date || loadingSlots}
              className="w-full py-3 bg-[#c9a84c] text-[#0e0c09] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#d4b55a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loadingSlots ? "Sprawdzam…" : "Sprawdź dostępność"}
            </button>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            {slots.length > 0 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#2a2418]" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b5a2a]">
                    Godziny
                  </span>
                  <div className="h-px flex-1 bg-[#2a2418]" />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => selectSlot(slot)}
                      className={`py-2.5 text-sm border transition-all
                        ${
                          !slot.available
                            ? "border-[#1e1a12] text-[#3a3020] cursor-not-allowed line-through"
                            : selectedSlot?.time === slot.time
                              ? "border-[#c9a84c] text-[#c9a84c] bg-[#c9a84c]/10"
                              : "border-[#2a2418] text-[#a09070] hover:border-[#c9a84c]/50 hover:text-[#c9a84c]"
                        }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>

                {selectedSlot && selectedSlot.availableTables.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-[0.2em] uppercase text-[#8a7a5a]">
                      Wybierz stolik
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedSlot.availableTables.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setSelectedTableId(t.id)}
                          className={`text-left p-3 border transition-all
                            ${
                              selectedTableId === t.id
                                ? "border-[#c9a84c] bg-[#c9a84c]/10"
                                : "border-[#2a2418] hover:border-[#c9a84c]/40"
                            }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span
                              className={`text-xs font-medium ${selectedTableId === t.id ? "text-[#c9a84c]" : "text-[#f0e6cc]"}`}
                            >
                              Stolik {t.number}
                            </span>
                            <span className="text-[10px] text-[#6b5a2a]">
                              do {t.capacity} os.
                            </span>
                          </div>
                          {t.location ? (
                            <div className="text-[11px] text-[#6b5a2a]">
                              {t.location}
                            </div>
                          ) : (
                            <div className="text-[11px] text-[#3a3020]">
                              bez opisu
                            </div>
                          )}
                          {selectedTableId === t.id && (
                            <div className="mt-1.5 text-[10px] text-[#c9a84c] tracking-widest">
                              ✦ wybrany
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSlot && (
                  <button
                    onClick={() => setStep("details")}
                    className="w-full py-3 bg-[#c9a84c] text-[#0e0c09] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#d4b55a] transition-colors"
                  >
                    Dalej →
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2 ─────────────────────────────────────────────────────── */}
        {step === "details" && (
          <div className="bg-[#15120d] border border-[#2a2418] p-8 flex flex-col gap-5">
            <h2 className="font-serif text-2xl font-light">Twoje dane</h2>

            <div className="flex gap-4 text-xs text-[#6b5a2a] border-b border-[#2a2418] pb-4">
              <span>{date}</span>
              <span className="text-[#2a2418]">|</span>
              <span>{selectedSlot?.time}</span>
              <span className="text-[#2a2418]">|</span>
              <span>{partySizeLabel}</span>
            </div>

            {[
              {
                key: "name",
                label: "Imię i nazwisko",
                placeholder: "Jan Kowalski",
                type: "text",
                required: true,
              },
              {
                key: "email",
                label: "Email",
                placeholder: "jan@example.com",
                type: "email",
                required: true,
              },
              {
                key: "phone",
                label: "Telefon",
                placeholder: "+48 123 456 789",
                type: "tel",
                required: false,
              },
            ].map(({ key, label, placeholder, type, required }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label className="text-[10px] tracking-[0.2em] uppercase text-[#8a7a5a]">
                  {label}{" "}
                  {required && <span className="text-[#c9a84c]">*</span>}
                </label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="bg-[#0e0c09] border border-[#2a2418] text-[#f0e6cc] placeholder-[#3a3020] text-sm px-3 py-2.5 outline-none focus:border-[#c9a84c] transition-colors"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] tracking-[0.2em] uppercase text-[#8a7a5a]">
                Uwagi
              </label>
              <textarea
                placeholder="Alergie, okazja specjalna, życzenia…"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                className="bg-[#0e0c09] border border-[#2a2418] text-[#f0e6cc] placeholder-[#3a3020] text-sm px-3 py-2.5 outline-none focus:border-[#c9a84c] transition-colors resize-none"
              />
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setStep("datetime")}
                className="flex-1 py-3 border border-[#2a2418] text-[#8a7a5a] text-xs tracking-[0.2em] uppercase hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors"
              >
                ← Wróć
              </button>
              <button
                onClick={() => setStep("confirm")}
                disabled={!form.name || !form.email}
                className="flex-1 py-3 bg-[#c9a84c] text-[#0e0c09] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#d4b55a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Dalej →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ─────────────────────────────────────────────────────── */}
        {step === "confirm" && (
          <div className="bg-[#15120d] border border-[#2a2418] p-8 flex flex-col gap-6">
            <h2 className="font-serif text-2xl font-light">Potwierdzenie</h2>

            <div className="flex flex-col divide-y divide-[#2a2418]">
              {[
                { label: "Data", value: date },
                { label: "Godzina", value: selectedSlot?.time },
                { label: "Liczba osób", value: partySizeLabel },
                { label: "Imię i nazwisko", value: form.name },
                { label: "Email", value: form.email },
                ...(form.phone
                  ? [{ label: "Telefon", value: form.phone }]
                  : []),
                ...(form.notes ? [{ label: "Uwagi", value: form.notes }] : []),
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-3"
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b5a2a]">
                    {label}
                  </span>
                  <span className="text-sm text-[#f0e6cc]">{value}</span>
                </div>
              ))}
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={() => setStep("details")}
                className="flex-1 py-3 border border-[#2a2418] text-[#8a7a5a] text-xs tracking-[0.2em] uppercase hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors"
              >
                ← Wróć
              </button>
              <button
                onClick={submitReservation}
                disabled={submitting}
                className="flex-1 py-3 bg-[#c9a84c] text-[#0e0c09] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#d4b55a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? "Rezerwuję…" : "Zarezerwuj"}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Success ──────────────────────────────────────────────── */}
        {step === "success" && (
          <div className="bg-[#15120d] border border-[#c9a84c]/30 p-10 flex flex-col items-center gap-5 text-center">
            <div className="text-[#c9a84c] text-3xl tracking-widest">✦</div>
            <h2 className="font-serif text-3xl font-light">
              Dziękujemy za zgłoszenie
            </h2>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
            <p className="text-sm text-[#8a7a5a] leading-relaxed">
              Twoja prośba o rezerwację została przyjęta.
              <br />
              Po weryfikacji przez nasz zespół otrzymasz potwierdzenie na adres
              <br />
              <span className="text-[#c9a84c]">{form.email}</span>
            </p>
            <div className="flex items-center gap-2 text-xs text-[#6b5a2a] border border-[#2a2418] px-4 py-2.5 w-full justify-center">
              <span className="text-[#c9a84c]">✦</span>
              <span>Zazwyczaj potwierdzamy w ciągu kilku godzin</span>
            </div>
            <p className="text-sm text-[#4a4030]">
              Termin: <span className="text-[#a09070]">{date}</span> o{" "}
              <span className="text-[#a09070]">{selectedSlot?.time}</span>
            </p>
            <button
              onClick={() => {
                setStep("datetime");
                setDate("");
                setSlots([]);
                setSelectedSlot(null);
                setForm({ name: "", email: "", phone: "", notes: "" });
              }}
              className="mt-2 px-8 py-3 border border-[#2a2418] text-[#8a7a5a] text-xs tracking-[0.2em] uppercase hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors"
            >
              Nowa rezerwacja
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
