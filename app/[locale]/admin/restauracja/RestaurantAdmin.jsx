"use client";
import { useState } from "react";
import ReservationsTab from "./ReservationsTab";
import TablesTab from "./TablesTab";
import SettingsTab from "./SettingsTab";

const TABS = [
  ["reservations", "Rezerwacje"],
  ["tables", "Stoliki"],
  ["settings", "Ustawienia"],
];

export default function RestaurantAdmin() {
  const [tab, setTab] = useState("reservations");

  return (
    <>
      <nav className="flex gap-2 border-b border-neutral-200 mb-8">
        {TABS.map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`px-4 py-3 -mb-px border-b-2 font-medium cursor-pointer ${
              tab === key
                ? "border-[#C4966C] text-neutral-900"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
      {tab === "reservations" && <ReservationsTab />}
      {tab === "tables" && <TablesTab />}
      {tab === "settings" && <SettingsTab />}
    </>
  );
}
