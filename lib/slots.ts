// lib/slots.ts
import { ApiError } from "./api-error";

/**
 * Sprawdza czy dana godzina jest poprawnym slotem dla restauracji.
 * Np. slotDuration=30 oznacza tylko :00 i :30 są dozwolone.
 */
export function validateSlot(date: Date, slotDuration: number): void {
  const minutes = date.getUTCMinutes();
  if (minutes % slotDuration !== 0) {
    throw new ApiError(
      `Rezerwacja musi zaczynać się o pełnym slocie co ${slotDuration} minut (np. 18:00, 18:30)`,
      400,
    );
  }
}

/**
 * Sprawdza czy godzina rezerwacji mieści się w godzinach otwarcia.
 * openingTime / closingTime w formacie "HH:MM"
 */
export function validateOpeningHours(
  startTime: Date,
  endTime: Date,
  openingTime: string | null,
  closingTime: string | null,
): void {
  if (!openingTime || !closingTime) return;

  const [openH, openM] = openingTime.split(":").map(Number);
  const [closeH, closeM] = closingTime.split(":").map(Number);

  const startMinutes = startTime.getUTCHours() * 60 + startTime.getUTCMinutes();
  const endMinutes = endTime.getUTCHours() * 60 + endTime.getUTCMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (startMinutes < openMinutes || endMinutes > closeMinutes) {
    throw new ApiError(
      `Rezerwacja musi mieścić się w godzinach otwarcia (${openingTime}–${closingTime})`,
      400,
    );
  }
}

/**
 * Oblicza endTime na podstawie startTime i durationMinutes.
 */
export function calcEndTime(startTime: Date, durationMinutes: number): Date {
  return new Date(startTime.getTime() + durationMinutes * 60 * 1000);
}

/**
 * Generuje listę slotów na dany dzień dla restauracji.
 * Zwraca tablicę stringów "HH:MM".
 */
export function generateDaySlots(
  openingTime: string,
  closingTime: string,
  slotDuration: number,
  reservationDuration: number,
): string[] {
  const [openH, openM] = openingTime.split(":").map(Number);
  const [closeH, closeM] = closingTime.split(":").map(Number);

  const openMinutes = openH * 60 + openM;
  // Ostatni slot musi się skończyć przed zamknięciem
  const closeMinutes = closeH * 60 + closeM - reservationDuration;

  const slots: string[] = [];
  for (let m = openMinutes; m <= closeMinutes; m += slotDuration) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
  }
  return slots;
}
