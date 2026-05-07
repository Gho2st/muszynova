"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ReservationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | "NO_SHOW";
type TableStatus = "AVAILABLE" | "OCCUPIED" | "RESERVED" | "MAINTENANCE";
type AdminTab = "reservations" | "tables";

type Reservation = {
  id: string;
  startTime: string;
  endTime: string;
  partySize: number;
  status: ReservationStatus;
  notes: string | null;
  customer: { name: string; email: string; phone: string | null };
  table: { number: number; location: string | null } | null;
};

type Table = {
  id: string;
  number: number;
  capacity: number;
  minCapacity: number;
  status: TableStatus;
  location: string | null;
  isActive: boolean;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<ReservationStatus, string> = {
  PENDING: "Oczekuje",
  CONFIRMED: "Potwierdzona",
  CANCELLED: "Anulowana",
  COMPLETED: "Zrealizowana",
  NO_SHOW: "Nie pojawił się",
};

const STATUS_STYLES: Record<ReservationStatus, string> = {
  PENDING: "bg-amber-900/30 text-amber-400 border border-amber-900/50",
  CONFIRMED: "bg-emerald-900/30 text-emerald-400 border border-emerald-900/50",
  CANCELLED: "bg-red-900/30 text-red-400 border border-red-900/50",
  COMPLETED: "bg-[#2a2418] text-[#6b5a2a] border border-[#3a3020]",
  NO_SHOW: "bg-zinc-900/30 text-zinc-500 border border-zinc-800",
};

const TABLE_STATUS_LABELS: Record<TableStatus, string> = {
  AVAILABLE: "Wolny",
  OCCUPIED: "Zajęty",
  RESERVED: "Zarezerwowany",
  MAINTENANCE: "Serwis",
};

const TABLE_STATUS_STYLES: Record<TableStatus, string> = {
  AVAILABLE: "bg-emerald-900/30 text-emerald-400 border border-emerald-900/50",
  OCCUPIED: "bg-red-900/30 text-red-400 border border-red-900/50",
  RESERVED: "bg-amber-900/30 text-amber-400 border border-amber-900/50",
  MAINTENANCE: "bg-zinc-900/30 text-zinc-500 border border-zinc-800",
};

const ALLOWED_TRANSITIONS: Record<ReservationStatus, ReservationStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["COMPLETED", "CANCELLED", "NO_SHOW"],
  CANCELLED: [],
  COMPLETED: [],
  NO_SHOW: [],
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

// ─── Table Form ──────────────────────────────────────────────────────────────

type TableFormData = {
  number: string;
  capacity: string;
  minCapacity: string;
  location: string;
};

const emptyForm: TableFormData = {
  number: "",
  capacity: "",
  minCapacity: "1",
  location: "",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>("reservations");

  // ── Reservations state ────────────────────────────────────────────────────
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | "ALL">(
    "ALL",
  );
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loadingRes, setLoadingRes] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [selected, setSelected] = useState<Reservation | null>(null);
  const [resError, setResError] = useState("");

  // ── Tables state ──────────────────────────────────────────────────────────
  const [tables, setTables] = useState<Table[]>([]);
  const [loadingTables, setLoadingTables] = useState(false);
  const [tableError, setTableError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const [form, setForm] = useState<TableFormData>(emptyForm);
  const [savingTable, setSavingTable] = useState(false);
  const [deletingTable, setDeletingTable] = useState<string | null>(null);

  // ── Fetch reservations ────────────────────────────────────────────────────

  const fetchReservations = useCallback(async () => {
    setLoadingRes(true);
    setResError("");
    try {
      const params = new URLSearchParams({ date });
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      const res = await fetch(`/api/reservations?${params}`);
      const data = await res.json();
      console.log("pierwsza rezerwacja startTime:", data[0]?.startTime);
      if (!res.ok) throw new Error(data.error);
      setReservations(data);
    } catch (e: unknown) {
      setResError(e instanceof Error ? e.message : "Błąd serwera");
    } finally {
      setLoadingRes(false);
    }
  }, [date, statusFilter]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  // ── Fetch tables ──────────────────────────────────────────────────────────

  const fetchTables = useCallback(async () => {
    setLoadingTables(true);
    setTableError("");
    try {
      const res = await fetch("/api/tables");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTables(data);
    } catch (e: unknown) {
      setTableError(e instanceof Error ? e.message : "Błąd serwera");
    } finally {
      setLoadingTables(false);
    }
  }, []);

  useEffect(() => {
    if (tab === "tables") fetchTables();
  }, [tab, fetchTables]);

  // ── Reservation actions ───────────────────────────────────────────────────

  async function changeStatus(id: string, status: ReservationStatus) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setReservations((prev) => prev.map((r) => (r.id === id ? data : r)));
      if (selected?.id === id) setSelected(data);
    } finally {
      setUpdating(null);
    }
  }

  // ── Table actions ─────────────────────────────────────────────────────────

  function openNewForm() {
    setEditingTable(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(table: Table) {
    setEditingTable(table);
    setForm({
      number: String(table.number),
      capacity: String(table.capacity),
      minCapacity: String(table.minCapacity),
      location: table.location ?? "",
    });
    setShowForm(true);
  }

  async function saveTable() {
    setSavingTable(true);
    setTableError("");
    try {
      const body = {
        number: Number(form.number),
        capacity: Number(form.capacity),
        minCapacity: Number(form.minCapacity),
        location: form.location || undefined,
      };

      const res = editingTable
        ? await fetch(`/api/tables/${editingTable.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
        : await fetch("/api/tables", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setShowForm(false);
      setEditingTable(null);
      fetchTables();
    } catch (e: unknown) {
      setTableError(e instanceof Error ? e.message : "Błąd serwera");
    } finally {
      setSavingTable(false);
    }
  }

  async function toggleActive(table: Table) {
    try {
      const res = await fetch(`/api/tables/${table.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !table.isActive }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTables((prev) => prev.map((t) => (t.id === table.id ? data : t)));
    } catch (e: unknown) {
      setTableError(e instanceof Error ? e.message : "Błąd serwera");
    }
  }

  async function deleteTable(id: string) {
    if (!confirm("Na pewno usunąć stolik? Tej operacji nie można cofnąć."))
      return;
    setDeletingTable(id);
    try {
      const res = await fetch(`/api/tables/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      setTables((prev) => prev.filter((t) => t.id !== id));
    } catch (e: unknown) {
      setTableError(e instanceof Error ? e.message : "Błąd serwera");
    } finally {
      setDeletingTable(null);
    }
  }

  const counts = {
    total: reservations.length,
    pending: reservations.filter((r) => r.status === "PENDING").length,
    confirmed: reservations.filter((r) => r.status === "CONFIRMED").length,
    covers: reservations
      .filter((r) => ["PENDING", "CONFIRMED"].includes(r.status))
      .reduce((sum, r) => sum + r.partySize, 0),
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#0a0906] text-[#f0e6cc] flex flex-col">
      {/* Top bar */}
      <header className="border-b border-[#2a2418] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[#c9a84c] text-xs tracking-widest">✦</span>
          <h1 className="font-serif text-xl font-light tracking-wide">
            Panel Administracyjny
          </h1>
          <span className="text-[#2a2418] text-xs">|</span>
          <span className="text-[#6b5a2a] text-xs tracking-widest uppercase">
            Muszynova
          </span>
        </div>
        <div className="flex items-center gap-4">
          {tab === "reservations" && (
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-[#15120d] border border-[#2a2418] text-[#f0e6cc] text-sm px-3 py-1.5 outline-none focus:border-[#c9a84c] transition-colors"
            />
          )}
          {/* Tab switcher */}
          <div className="flex border border-[#2a2418]">
            {(["reservations", "tables"] as AdminTab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 text-xs tracking-widest uppercase transition-colors border-r border-[#2a2418] last:border-r-0
                  ${tab === t ? "bg-[#c9a84c]/10 text-[#c9a84c]" : "text-[#4a4030] hover:text-[#8a7a5a]"}`}
              >
                {t === "reservations" ? "Rezerwacje" : "Stoliki"}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── RESERVATIONS TAB ───────────────────────────────────────────────── */}
      {tab === "reservations" && (
        <div className="flex flex-1 overflow-hidden">
          {/* Left panel */}
          <div className="w-96 border-r border-[#2a2418] flex flex-col">
            {/* Stats */}
            <div className="grid grid-cols-4 border-b border-[#2a2418]">
              {[
                { label: "Razem", value: counts.total },
                { label: "Oczekuje", value: counts.pending },
                { label: "Potw.", value: counts.confirmed },
                { label: "Osób", value: counts.covers },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center py-3 px-2 border-r border-[#2a2418] last:border-r-0"
                >
                  <span className="text-xl font-light text-[#c9a84c]">
                    {value}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-[#4a4030] mt-0.5">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Status filter */}
            <div className="flex border-b border-[#2a2418] overflow-x-auto">
              {(
                [
                  "ALL",
                  "PENDING",
                  "CONFIRMED",
                  "CANCELLED",
                  "COMPLETED",
                ] as const
              ).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-2.5 text-[10px] tracking-wider uppercase whitespace-nowrap border-r border-[#2a2418] last:border-r-0 transition-colors
                    ${statusFilter === s ? "bg-[#c9a84c]/10 text-[#c9a84c]" : "text-[#4a4030] hover:text-[#8a7a5a]"}`}
                >
                  {s === "ALL" ? "Wszystkie" : STATUS_LABELS[s]}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {loadingRes && (
                <div className="flex items-center justify-center h-32 text-[#4a4030] text-sm">
                  Ładowanie…
                </div>
              )}
              {!loadingRes && resError && (
                <div className="p-4 text-red-400 text-sm">{resError}</div>
              )}
              {!loadingRes && reservations.length === 0 && (
                <div className="flex flex-col items-center justify-center h-32 gap-2">
                  <span className="text-[#c9a84c] text-xl">✦</span>
                  <span className="text-[#4a4030] text-sm">
                    Brak rezerwacji
                  </span>
                </div>
              )}
              {reservations.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className={`w-full text-left px-4 py-3.5 border-b border-[#2a2418] transition-colors hover:bg-[#15120d]
                    ${selected?.id === r.id ? "bg-[#15120d] border-l-2 border-l-[#c9a84c]" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-sm text-[#f0e6cc] font-light">
                      {r.customer.name}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-sm ${STATUS_STYLES[r.status]}`}
                    >
                      {STATUS_LABELS[r.status]}
                    </span>
                  </div>
                  <div className="flex gap-3 text-xs text-[#6b5a2a]">
                    <span>{formatTime(r.startTime)}</span>
                    <span>·</span>
                    <span>{r.partySize} os.</span>
                    {r.table && (
                      <>
                        <span>·</span>
                        <span>Stolik {r.table.number}</span>
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right panel — detail */}
          <div className="flex-1 overflow-y-auto">
            {!selected ? (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <span className="text-[#c9a84c] text-2xl tracking-widest">
                  ✦
                </span>
                <p className="text-[#4a4030] text-sm">
                  Wybierz rezerwację z listy
                </p>
              </div>
            ) : (
              <div className="p-8 max-w-xl">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-serif text-2xl font-light mb-1">
                      {selected.customer.name}
                    </h2>
                    <span
                      className={`text-xs px-3 py-1 rounded-sm ${STATUS_STYLES[selected.status]}`}
                    >
                      {STATUS_LABELS[selected.status]}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-[#4a4030] hover:text-[#8a7a5a] transition-colors text-xl"
                  >
                    ×
                  </button>
                </div>

                <div className="flex flex-col divide-y divide-[#2a2418] mb-8">
                  {[
                    { label: "Data", value: formatDate(selected.startTime) },
                    {
                      label: "Godzina",
                      value: `${formatTime(selected.startTime)} — ${formatTime(selected.endTime)}`,
                    },
                    {
                      label: "Liczba osób",
                      value: `${selected.partySize} osób`,
                    },
                    {
                      label: "Stolik",
                      value: selected.table
                        ? `Nr ${selected.table.number}${selected.table.location ? ` · ${selected.table.location}` : ""}`
                        : "Nieprzypisany",
                    },
                    { label: "Email", value: selected.customer.email },
                    { label: "Telefon", value: selected.customer.phone ?? "—" },
                    ...(selected.notes
                      ? [{ label: "Uwagi", value: selected.notes }]
                      : []),
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between items-start py-3 gap-4"
                    >
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b5a2a] shrink-0">
                        {label}
                      </span>
                      <span className="text-sm text-[#f0e6cc] text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {ALLOWED_TRANSITIONS[selected.status].length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#6b5a2a] mb-1">
                      Zmień status
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {ALLOWED_TRANSITIONS[selected.status].map((status) => (
                        <button
                          key={status}
                          onClick={() => changeStatus(selected.id, status)}
                          disabled={updating === selected.id}
                          className={`px-4 py-2 text-xs tracking-[0.15em] uppercase border transition-colors disabled:opacity-40
                            ${
                              status === "CONFIRMED"
                                ? "border-emerald-800 text-emerald-400 hover:bg-emerald-900/20"
                                : status === "CANCELLED" || status === "NO_SHOW"
                                  ? "border-red-900 text-red-400 hover:bg-red-900/20"
                                  : "border-[#2a2418] text-[#8a7a5a] hover:border-[#c9a84c]/40 hover:text-[#c9a84c]"
                            }`}
                        >
                          {updating === selected.id
                            ? "…"
                            : STATUS_LABELS[status]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TABLES TAB ─────────────────────────────────────────────────────── */}
      {tab === "tables" && (
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto">
            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-light">Stoliki</h2>
              <button
                onClick={openNewForm}
                className="px-5 py-2 bg-[#c9a84c] text-[#0e0c09] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#d4b55a] transition-colors"
              >
                + Dodaj stolik
              </button>
            </div>

            {tableError && (
              <p className="text-red-400 text-sm mb-4">{tableError}</p>
            )}

            {/* Add/Edit form */}
            {showForm && (
              <div className="bg-[#15120d] border border-[#c9a84c]/30 p-6 mb-6 flex flex-col gap-4">
                <h3 className="font-serif text-lg font-light">
                  {editingTable
                    ? `Edytuj stolik nr ${editingTable.number}`
                    : "Nowy stolik"}
                </h3>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { key: "number", label: "Numer stolika", placeholder: "1" },
                    { key: "capacity", label: "Maks. osób", placeholder: "4" },
                    {
                      key: "minCapacity",
                      label: "Min. osób",
                      placeholder: "1",
                    },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key} className="flex flex-col gap-1.5">
                      <label className="text-[10px] tracking-[0.2em] uppercase text-[#8a7a5a]">
                        {label}
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder={placeholder}
                        value={form[key as keyof TableFormData]}
                        onChange={(e) =>
                          setForm({ ...form, [key]: e.target.value })
                        }
                        className="bg-[#0e0c09] border border-[#2a2418] text-[#f0e6cc] text-sm px-3 py-2 outline-none focus:border-[#c9a84c] transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] tracking-[0.2em] uppercase text-[#8a7a5a]">
                    Lokalizacja
                  </label>
                  <input
                    type="text"
                    placeholder="np. przy oknie, taras, główna sala…"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    className="bg-[#0e0c09] border border-[#2a2418] text-[#f0e6cc] text-sm px-3 py-2 outline-none focus:border-[#c9a84c] transition-colors"
                  />
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingTable(null);
                    }}
                    className="px-5 py-2 border border-[#2a2418] text-[#8a7a5a] text-xs tracking-[0.2em] uppercase hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors"
                  >
                    Anuluj
                  </button>
                  <button
                    onClick={saveTable}
                    disabled={savingTable || !form.number || !form.capacity}
                    className="px-5 py-2 bg-[#c9a84c] text-[#0e0c09] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#d4b55a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {savingTable
                      ? "Zapisuję…"
                      : editingTable
                        ? "Zapisz zmiany"
                        : "Dodaj stolik"}
                  </button>
                </div>
              </div>
            )}

            {/* Tables list */}
            {loadingTables && (
              <div className="flex items-center justify-center h-32 text-[#4a4030] text-sm">
                Ładowanie…
              </div>
            )}

            {!loadingTables && tables.length === 0 && (
              <div className="flex flex-col items-center justify-center h-32 gap-2">
                <span className="text-[#c9a84c] text-xl">✦</span>
                <span className="text-[#4a4030] text-sm">
                  Brak stolików — dodaj pierwszy
                </span>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className={`bg-[#15120d] border border-[#2a2418] px-5 py-4 flex items-center justify-between gap-4 transition-opacity
                    ${!table.isActive ? "opacity-40" : ""}`}
                >
                  <div className="flex items-center gap-5">
                    <div className="text-center">
                      <div className="text-2xl font-light text-[#c9a84c]">
                        {table.number}
                      </div>
                      <div className="text-[10px] tracking-widest uppercase text-[#4a4030]">
                        nr
                      </div>
                    </div>
                    <div className="w-px h-8 bg-[#2a2418]" />
                    <div className="flex flex-col gap-0.5">
                      <div className="text-sm text-[#f0e6cc]">
                        {table.minCapacity}–{table.capacity} osób
                      </div>
                      {table.location && (
                        <div className="text-xs text-[#6b5a2a]">
                          {table.location}
                        </div>
                      )}
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 ${TABLE_STATUS_STYLES[table.status]}`}
                    >
                      {TABLE_STATUS_LABELS[table.status]}
                    </span>
                    {!table.isActive && (
                      <span className="text-[10px] px-2 py-0.5 bg-zinc-900/30 text-zinc-600 border border-zinc-800">
                        Nieaktywny
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditForm(table)}
                      className="px-3 py-1.5 text-[10px] tracking-widest uppercase text-[#8a7a5a] border border-[#2a2418] hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors"
                    >
                      Edytuj
                    </button>
                    <button
                      onClick={() => toggleActive(table)}
                      className="px-3 py-1.5 text-[10px] tracking-widest uppercase text-[#8a7a5a] border border-[#2a2418] hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors"
                    >
                      {table.isActive ? "Wyłącz" : "Włącz"}
                    </button>
                    <button
                      onClick={() => deleteTable(table.id)}
                      disabled={deletingTable === table.id}
                      className="px-3 py-1.5 text-[10px] tracking-widest uppercase text-red-500/60 border border-red-900/30 hover:border-red-900 hover:text-red-400 transition-colors disabled:opacity-40"
                    >
                      {deletingTable === table.id ? "…" : "Usuń"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
