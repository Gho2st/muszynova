// lib/validators.ts
import { z } from "zod";

// ====================== RESTAURANT ======================

export const createRestaurantSchema = z.object({
  name: z.string().min(1, "Nazwa jest wymagana").max(100),
  address: z.string().min(1, "Adres jest wymagany"),
  phone: z.string().optional(),
  email: z.string().email("Nieprawidłowy email").optional().or(z.literal("")),
  openingTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Format HH:MM")
    .optional(),
  closingTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Format HH:MM")
    .optional(),
  defaultReservationDuration: z.number().int().min(30).max(360).default(90),
  slotDuration: z.number().int().min(15).max(60).default(30),
});

export const updateRestaurantSchema = createRestaurantSchema.partial();

// ====================== TABLE ======================

export const createTableSchema = z.object({
  number: z.number().int().positive("Numer stolika musi być dodatni"),
  capacity: z.number().int().min(1).max(50),
  minCapacity: z.number().int().min(1).default(1),
  location: z.string().optional(),
});

export const updateTableSchema = createTableSchema.partial().extend({
  status: z
    .enum(["AVAILABLE", "OCCUPIED", "RESERVED", "MAINTENANCE"])
    .optional(),
  isActive: z.boolean().optional(),
});

// ====================== CUSTOMER ======================

export const createCustomerSchema = z.object({
  name: z.string().min(1, "Imię i nazwisko jest wymagane").max(100),
  email: z.string().email("Nieprawidłowy email"),
  phone: z.string().optional(),
});

export const updateCustomerSchema = createCustomerSchema.partial();

// ====================== RESERVATION ======================

export const createReservationSchema = z
  .object({
    // restaurantId NIE jest tu — pochodzi z env i jest wstrzykiwane w route
    // Klient może już istnieć (customerId) albo podajemy dane nowego
    customerId: z.string().cuid().optional(),
    customerData: z
      .object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
      })
      .optional(),
    tableId: z.string().cuid("Nieprawidłowe ID stolika").optional(),
    // ISO string, np. "2026-04-25T19:30:00.000Z"
    startTime: z.string().datetime("Nieprawidłowy format daty"),
    partySize: z.number().int().min(1, "Minimum 1 osoba").max(50),
    notes: z.string().max(500).optional(),
  })
  .refine((data) => data.customerId || data.customerData, {
    message: "Wymagane customerId lub customerData",
    path: ["customerId"],
  });

export const updateReservationSchema = z.object({
  status: z
    .enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"])
    .optional(),
  notes: z.string().max(500).optional(),
  tableId: z.string().cuid().optional(),
  cancellationReason: z.string().max(300).optional(),
});

// ====================== AVAILABILITY QUERY ======================

export const availabilityQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format YYYY-MM-DD"),
  partySize: z.coerce.number().int().min(1),
  tableId: z.string().cuid().optional(),
});
