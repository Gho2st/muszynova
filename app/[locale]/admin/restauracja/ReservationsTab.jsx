"use client";
import { useCallback, useEffect, useState } from "react";
import {
  api,
  addDays,
  buttonClass,
  formatDate,
  formatDayLong,
  formatTime,
  inputClass,
  STATUS,
  todayWarsaw,
} from "./api";

// Akcje dostępne dla danego statusu (zgodne z przejściami w API)
const ACTIONS = {
  PENDING: [
    { status: "CONFIRMED", label: "Zatwierdź", className: "bg-green-600 hover:bg-green-700 text-white" },
    { status: "CANCELLED", label: "Odrzuć", className: "bg-neutral-200 hover:bg-neutral-300" },
  ],
  CONFIRMED: [
    { status: "COMPLETED", label: "Zakończona", className: "bg-blue-600 hover:bg-blue-700 text-white" },
    { status: "NO_SHOW", label: "Nie przyszli", className: "bg-neutral-200 hover:bg-neutral-300" },
    { status: "CANCELLED", label: "Odwołaj", className: "bg-neutral-200 hover:bg-neutral-300" },
  ],
};

function ReservationRow({ r, tables, onChanged, showDate }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  async function update(body) {
    setBusy(true);
    setError(null);
    try {
      await api(`/api/reservations/${r.id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      onChanged();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  function changeStatus(status) {
    if (status === "CANCELLED") {
      const reason = window.prompt(
        "Powód odwołania (trafi do maila do gościa, można zostawić puste):",
      );
      if (reason === null) return;
      update({ status, ...(reason.trim() ? { cancellationReason: reason.trim() } : {}) });
      return;
    }
    update({ status });
  }

  const status = STATUS[r.status];
  const canEditTable = r.status === "PENDING" || r.status === "CONFIRMED";

  return (
    <li className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center gap-4">
      <div className="lg:w-32 shrink-0">
        {showDate && <div className="text-xs text-neutral-500">{formatDate(r.startTime)}</div>}
        <div className="text-lg font-semibold">
          {formatTime(r.startTime)}–{formatTime(r.endTime)}
        </div>
        <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${status.className}`}>
          {status.label}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-medium">
          {r.customer.name} · {r.partySize} os.
        </div>
        <div className="text-sm text-neutral-600 break-words">
          {r.customer.phone && (
            <a href={`tel:${r.customer.phone}`} className="hover:underline">
              {r.customer.phone}
            </a>
          )}
          {r.customer.phone && " · "}
          <a href={`mailto:${r.customer.email}`} className="hover:underline">
            {r.customer.email}
          </a>
        </div>
        {r.notes && <div className="text-sm text-neutral-700 mt-1 italic">„{r.notes}”</div>}
        {r.cancellationReason && (
          <div className="text-sm text-neutral-500 mt-1">Powód: {r.cancellationReason}</div>
        )}
        {error && <div className="text-sm text-red-600 mt-1">{error}</div>}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {canEditTable ? (
          <select
            value={r.table?.id ?? ""}
            disabled={busy}
            onChange={(e) => e.target.value && update({ tableId: e.target.value })}
            className={inputClass}
            aria-label="Stolik"
          >
            {!r.table && <option value="">Bez stolika</option>}
            {tables.map((t) => (
              <option key={t.id} value={t.id} disabled={t.capacity < r.partySize}>
                Stolik {t.number} ({t.capacity} os.{t.location ? `, ${t.location}` : ""})
              </option>
            ))}
          </select>
        ) : (
          r.table && <span className="text-sm text-neutral-600">Stolik {r.table.number}</span>
        )}
        {(ACTIONS[r.status] ?? []).map((a) => (
          <button
            key={a.status}
            type="button"
            disabled={busy}
            onClick={() => changeStatus(a.status)}
            className={`${buttonClass} ${a.className}`}
          >
            {a.label}
          </button>
        ))}
      </div>
    </li>
  );
}

export default function ReservationsTab() {
  const [date, setDate] = useState(todayWarsaw());
  const [pending, setPending] = useState([]);
  const [day, setDay] = useState([]);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const [p, d, t] = await Promise.all([
        api("/api/reservations?status=PENDING&upcoming=1"),
        api(`/api/reservations?date=${date}`),
        api("/api/tables"),
      ]);
      setPending(p);
      setDay(d);
      setTables(t.filter((x) => x.isActive));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    load();
  }, [load]);

  const activeDay = day.filter((r) => r.status !== "CANCELLED");
  const guests = activeDay.reduce((sum, r) => sum + r.partySize, 0);

  return (
    <div className="space-y-10">
      {error && <p className="text-red-600">{error}</p>}

      <section>
        <h2 className="text-xl font-semibold mb-4">
          Do zatwierdzenia{" "}
          {pending.length > 0 && (
            <span className="ml-1 text-sm bg-amber-500 text-white rounded-full px-2 py-0.5">
              {pending.length}
            </span>
          )}
        </h2>
        {loading ? (
          <p className="text-neutral-500">Ładowanie…</p>
        ) : pending.length === 0 ? (
          <p className="text-neutral-500">Brak oczekujących rezerwacji.</p>
        ) : (
          <ul className="space-y-3">
            {pending.map((r) => (
              <ReservationRow key={r.id} r={r} tables={tables} onChanged={load} showDate />
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <h2 className="text-xl font-semibold mr-auto capitalize">{formatDayLong(date)}</h2>
          <button type="button" onClick={() => setDate(addDays(date, -1))} className={`${buttonClass} bg-neutral-100 hover:bg-neutral-200`}>
            ←
          </button>
          <button type="button" onClick={() => setDate(todayWarsaw())} className={`${buttonClass} bg-neutral-100 hover:bg-neutral-200`}>
            Dziś
          </button>
          <button type="button" onClick={() => setDate(addDays(date, 1))} className={`${buttonClass} bg-neutral-100 hover:bg-neutral-200`}>
            →
          </button>
          <input type="date" value={date} onChange={(e) => e.target.value && setDate(e.target.value)} className={inputClass} />
        </div>
        <p className="text-sm text-neutral-500 mb-4">
          {activeDay.length} rezerwacji · {guests} gości
        </p>
        {loading ? (
          <p className="text-neutral-500">Ładowanie…</p>
        ) : day.length === 0 ? (
          <p className="text-neutral-500">Brak rezerwacji w tym dniu.</p>
        ) : (
          <ul className="space-y-3">
            {day.map((r) => (
              <ReservationRow key={r.id} r={r} tables={tables} onChanged={load} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
