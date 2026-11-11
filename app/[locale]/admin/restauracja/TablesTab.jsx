"use client";
import { useCallback, useEffect, useState } from "react";
import { api, buttonClass, inputClass } from "./api";

const EMPTY = { number: "", capacity: "", minCapacity: "1", location: "" };

function toBody(f) {
  return {
    number: Number(f.number),
    capacity: Number(f.capacity),
    minCapacity: Number(f.minCapacity || 1),
    location: f.location.trim() || undefined,
  };
}

function TableFields({ value, onChange, locations }) {
  const set = (k) => (e) => onChange({ ...value, [k]: e.target.value });
  return (
    <>
      <label className="text-xs text-neutral-500">
        Nr
        <input type="number" min="1" value={value.number} onChange={set("number")} className={`${inputClass} block w-20`} required />
      </label>
      <label className="text-xs text-neutral-500">
        Miejsc
        <input type="number" min="1" max="50" value={value.capacity} onChange={set("capacity")} className={`${inputClass} block w-20`} required />
      </label>
      <label className="text-xs text-neutral-500">
        Min. osób
        <input type="number" min="1" value={value.minCapacity} onChange={set("minCapacity")} className={`${inputClass} block w-20`} />
      </label>
      <label className="text-xs text-neutral-500">
        Miejsce (np. Sala, Taras)
        <input list="table-locations" value={value.location} onChange={set("location")} className={`${inputClass} block w-48`} />
        <datalist id="table-locations">
          {locations.map((l) => (
            <option key={l} value={l} />
          ))}
        </datalist>
      </label>
    </>
  );
}

function TableRow({ table, locations, onChanged }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);

  async function run(fn) {
    setError(null);
    try {
      await fn();
      setEditing(false);
      onChanged();
    } catch (e) {
      setError(e.message);
    }
  }

  const save = (e) => {
    e.preventDefault();
    run(() => api(`/api/tables/${table.id}`, { method: "PATCH", body: JSON.stringify(toBody(form)) }));
  };

  const toggleActive = () =>
    run(() => api(`/api/tables/${table.id}`, { method: "PATCH", body: JSON.stringify({ isActive: !table.isActive }) }));

  const remove = () => {
    if (!window.confirm(`Usunąć stolik nr ${table.number}?`)) return;
    run(() => api(`/api/tables/${table.id}`, { method: "DELETE" }));
  };

  if (editing) {
    return (
      <li className="bg-white border border-neutral-200 rounded-xl p-4">
        <form onSubmit={save} className="flex flex-wrap items-end gap-3">
          <TableFields value={form} onChange={setForm} locations={locations} />
          <button type="submit" className={`${buttonClass} bg-[#C4966C] text-white`}>Zapisz</button>
          <button type="button" onClick={() => setEditing(false)} className={`${buttonClass} bg-neutral-100`}>Anuluj</button>
        </form>
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </li>
    );
  }

  return (
    <li className={`bg-white border border-neutral-200 rounded-xl p-4 flex flex-wrap items-center gap-4 ${table.isActive ? "" : "opacity-60"}`}>
      <div className="font-semibold w-24">Stolik {table.number}</div>
      <div className="text-sm text-neutral-600 flex-1">
        {table.minCapacity > 1 ? `${table.minCapacity}–` : "do "}
        {table.capacity} os.{table.location ? ` · ${table.location}` : ""}
        {!table.isActive && " · wyłączony z rezerwacji"}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setForm({
              number: String(table.number),
              capacity: String(table.capacity),
              minCapacity: String(table.minCapacity),
              location: table.location ?? "",
            });
            setEditing(true);
          }}
          className={`${buttonClass} bg-neutral-100 hover:bg-neutral-200`}
        >
          Edytuj
        </button>
        <button type="button" onClick={toggleActive} className={`${buttonClass} bg-neutral-100 hover:bg-neutral-200`}>
          {table.isActive ? "Wyłącz" : "Włącz"}
        </button>
        <button type="button" onClick={remove} className={`${buttonClass} bg-neutral-100 hover:bg-red-100 text-red-700`}>
          Usuń
        </button>
      </div>
      {error && <p className="text-sm text-red-600 w-full">{error}</p>}
    </li>
  );
}

export default function TablesTab() {
  const [tables, setTables] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setTables(await api("/api/tables"));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const locations = [...new Set(tables.map((t) => t.location).filter(Boolean))];

  async function add(e) {
    e.preventDefault();
    setError(null);
    try {
      await api("/api/tables", { method: "POST", body: JSON.stringify(toBody(form)) });
      setForm({ ...EMPTY, location: form.location });
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="space-y-8">
      <section className="bg-neutral-50 rounded-xl p-5">
        <h2 className="font-semibold mb-4">Dodaj stolik</h2>
        <form onSubmit={add} className="flex flex-wrap items-end gap-3">
          <TableFields value={form} onChange={setForm} locations={locations} />
          <button type="submit" className={`${buttonClass} bg-[#C4966C] text-white`}>Dodaj</button>
        </form>
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </section>

      <section>
        <h2 className="font-semibold mb-4">Stoliki ({tables.length})</h2>
        {loading ? (
          <p className="text-neutral-500">Ładowanie…</p>
        ) : tables.length === 0 ? (
          <p className="text-neutral-500">Brak stolików. Dodaj pierwszy — bez stolików rezerwacja online jest wyłączona.</p>
        ) : (
          <ul className="space-y-2">
            {tables.map((t) => (
              <TableRow key={t.id} table={t} locations={locations} onChanged={load} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
