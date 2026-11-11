// lib/slots.ts
import { ApiError } from "./api-error";
import { addDays, todayLocal, utcToLocal, weekdayOf } from "./time";

type OpeningHoursRow = {
  weekday: number;
  openTime: string | null;
  closeTime: string | null;
};

type RestaurantWithHours = {
  slotDuration: number;
  defaultReservationDuration: number;
  minAdvanceMinutes: number;
  maxAdvanceDays: number;
  openingHours: OpeningHoursRow[];
  closedDays: { date: string; reason?: string | null }[];
};

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * Godziny otwarcia w danym dniu ("YYYY-MM-DD", czas lokalny)
 * albo null, jeśli restauracja jest wtedy nieczynna.
 */
export function getDayHours(
  restaurant: RestaurantWithHours,
  date: string,
): { openTime: string; closeTime: string } | null {
  if (restaurant.closedDays.some((d) => d.date === date)) return null;

  const row = restaurant.openingHours.find((h) => h.weekday === weekdayOf(date));
  if (!row?.openTime || !row?.closeTime) return null;

  return { openTime: row.openTime, closeTime: row.closeTime };
}

/**
 * Lista slotów "HH:MM" na dany dzień. Ostatni slot kończy się przed zamknięciem.
 */
export function generateDaySlots(
  openingTime: string,
  closingTime: string,
  slotDuration: number,
  reservationDuration: number,
): string[] {
  const openMinutes = timeToMinutes(openingTime);
  const lastStart = timeToMinutes(closingTime) - reservationDuration;

  const slots: string[] = [];
  for (let m = openMinutes; m <= lastStart; m += slotDuration) {
    slots.push(minutesToTime(m));
  }
  return slots;
}

/**
 * Sprawdza, czy rezerwacja od startTime mieści się w godzinach otwarcia,
 * zaczyna się o pełnym slocie i (dla gości) w dozwolonym wyprzedzeniu.
 */
export function validateReservationTime(
  restaurant: RestaurantWithHours,
  startTime: Date,
  { skipAdvanceCheck = false } = {},
): void {
  const local = utcToLocal(startTime);

  if (startTime < new Date()) {
    throw new ApiError("Nie można rezerwować w przeszłości", 400);
  }

  if (!skipAdvanceCheck) {
    const minStart = Date.now() + restaurant.minAdvanceMinutes * 60 * 1000;
    if (startTime.getTime() < minStart) {
      throw new ApiError(
        `Rezerwacji trzeba dokonać co najmniej ${restaurant.minAdvanceMinutes} minut wcześniej`,
        400,
      );
    }
    if (local.date > addDays(todayLocal(), restaurant.maxAdvanceDays)) {
      throw new ApiError(
        `Można rezerwować najwyżej ${restaurant.maxAdvanceDays} dni do przodu`,
        400,
      );
    }
  }

  const hours = getDayHours(restaurant, local.date);
  if (!hours) {
    throw new ApiError("W tym dniu restauracja jest nieczynna", 400);
  }

  const slots = generateDaySlots(
    hours.openTime,
    hours.closeTime,
    restaurant.slotDuration,
    restaurant.defaultReservationDuration,
  );
  if (!slots.includes(local.time)) {
    throw new ApiError(
      `Wybierz godzinę między ${slots[0] ?? hours.openTime} a ${slots.at(-1) ?? hours.openTime} (co ${restaurant.slotDuration} min)`,
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
