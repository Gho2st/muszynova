// lib/mailer.ts
import nodemailer from "nodemailer";
import { formatDatePL, formatTimePL } from "./time";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "biosite.praca@gmail.com",
    pass: process.env.NODEMAILER_PW,
  },
});

const RESTAURANT_EMAIL = "biuro@muszynova.pl";

type ReservationEmailData = {
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  date: string; // np. "25.04.2026"
  time: string; // np. "19:30"
  partySize: number;
  tableNumber?: number;
  tableLocation?: string | null;
  notes?: string | null;
  cancellationReason?: string | null;
};

type ReservationWithRelations = {
  startTime: Date;
  partySize: number;
  notes: string | null;
  cancellationReason?: string | null;
  customer: { name: string; email: string; phone: string | null };
  table: { number: number; location: string | null } | null;
};

export function reservationEmailData(
  r: ReservationWithRelations,
): ReservationEmailData {
  return {
    customerName: r.customer.name,
    customerEmail: r.customer.email,
    customerPhone: r.customer.phone,
    date: formatDatePL(r.startTime),
    time: formatTimePL(r.startTime),
    partySize: r.partySize,
    tableNumber: r.table?.number,
    tableLocation: r.table?.location,
    notes: r.notes,
    cancellationReason: r.cancellationReason,
  };
}

// Dane od gościa trafiają do HTML maila — escapujemy je
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function detailsRows(data: ReservationEmailData, withContact = false) {
  return [
    ...(withContact
      ? [
          ["Gość", data.customerName],
          ["Email", data.customerEmail],
          ...(data.customerPhone ? [["Telefon", data.customerPhone]] : []),
        ]
      : []),
    ["Data", data.date],
    ["Godzina", data.time],
    ["Liczba osób", `${data.partySize}`],
    ...(data.tableNumber
      ? [
          [
            "Stolik",
            `Nr ${data.tableNumber}${data.tableLocation ? ` · ${data.tableLocation}` : ""}`,
          ],
        ]
      : []),
    ...(data.notes ? [["Uwagi", data.notes]] : []),
    ...(data.cancellationReason ? [["Powód", data.cancellationReason]] : []),
  ];
}

function layout({
  title,
  intro,
  rows,
  footer = true,
}: {
  title: string;
  intro: string;
  rows: string[][];
  footer?: boolean;
}): string {
  return `
    <div style="font-family: Georgia, serif; padding: 40px 20px; background-color: #0e0c09;">
      <div style="max-width: 560px; margin: auto; background-color: #15120d; border: 1px solid #2a2418; padding: 40px;">

        <p style="color: #c9a84c; text-align: center; letter-spacing: 0.3em; font-size: 13px; margin: 0 0 16px;">✦ ✦ ✦</p>
        <h1 style="color: #f0e6cc; font-weight: 300; font-size: 28px; text-align: center; margin: 0 0 8px; letter-spacing: 0.04em;">
          ${title}
        </h1>
        <p style="color: #6b5a2a; text-align: center; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 32px;">
          Restauracja Muszynova
        </p>

        <hr style="border: none; border-top: 1px solid #2a2418; margin: 0 0 32px;">

        <p style="color: #a09070; font-size: 15px; font-weight: 300; margin: 0 0 24px;">
          ${intro}
        </p>

        <table style="width: 100%; border-collapse: collapse; margin: 0 0 32px;">
          ${rows
            .map(
              ([label, value]) => `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #2a2418; color: #6b5a2a; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; width: 40%;">${label}</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #2a2418; color: #f0e6cc; font-size: 14px; font-weight: 300;">${escapeHtml(value)}</td>
            </tr>
          `,
            )
            .join("")}
        </table>

        ${
          footer
            ? `<p style="color: #6b5a2a; font-size: 13px; font-weight: 300; margin: 0 0 8px;">
          W razie pytań lub konieczności zmiany rezerwacji prosimy o kontakt:
        </p>
        <p style="color: #c9a84c; font-size: 13px; margin: 0 0 32px;">
          ${RESTAURANT_EMAIL} · +48 509 445 000
        </p>`
            : ""
        }

        <hr style="border: none; border-top: 1px solid #2a2418; margin: 0 0 24px;">

        <p style="color: #3a3020; font-size: 11px; text-align: center; margin: 0; letter-spacing: 0.1em;">
          Muszynova · Do zobaczenia
        </p>
      </div>
    </div>
  `;
}

function greeting(name: string) {
  return `Drogi/a <strong style="color: #f0e6cc; font-weight: 400;">${escapeHtml(name)}</strong>,<br><br>`;
}

// Gość wysłał prośbę o rezerwację
export async function sendReservationReceived(
  data: ReservationEmailData,
): Promise<void> {
  await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: data.customerEmail,
    replyTo: RESTAURANT_EMAIL,
    subject: `Otrzymaliśmy prośbę o rezerwację — ${data.date}, godz. ${data.time}`,
    html: layout({
      title: "Prośba o rezerwację",
      intro: `${greeting(data.customerName)}dziękujemy za prośbę o rezerwację. Potwierdzimy ją wkrótce osobnym mailem.`,
      rows: detailsRows(data),
    }),
  });
}

// Powiadomienie dla restauracji o nowej prośbie
export async function sendNewReservationNotification(
  data: ReservationEmailData,
  adminUrl: string,
): Promise<void> {
  await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: RESTAURANT_EMAIL,
    replyTo: data.customerEmail,
    subject: `Nowa rezerwacja do zatwierdzenia — ${data.date}, godz. ${data.time}, ${data.partySize} os.`,
    html: layout({
      title: "Nowa rezerwacja",
      intro: `Nowa prośba o rezerwację czeka na zatwierdzenie w <a href="${adminUrl}" style="color: #c9a84c;">panelu admina</a>.`,
      rows: detailsRows(data, true),
      footer: false,
    }),
  });
}

export async function sendReservationConfirmation(
  data: ReservationEmailData,
): Promise<void> {
  await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: data.customerEmail,
    replyTo: RESTAURANT_EMAIL,
    subject: `Potwierdzenie rezerwacji — ${data.date}, godz. ${data.time}`,
    html: layout({
      title: "Rezerwacja potwierdzona",
      intro: `${greeting(data.customerName)}z przyjemnością potwierdzamy Państwa rezerwację. Czekamy na Państwa wizytę.`,
      rows: detailsRows(data),
    }),
  });
}

export async function sendReservationCancelled(
  data: ReservationEmailData,
): Promise<void> {
  await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: data.customerEmail,
    replyTo: RESTAURANT_EMAIL,
    subject: `Rezerwacja odwołana — ${data.date}, godz. ${data.time}`,
    html: layout({
      title: "Rezerwacja odwołana",
      intro: `${greeting(data.customerName)}niestety nie możemy przyjąć Państwa rezerwacji w tym terminie. Zapraszamy do wyboru innego terminu lub kontaktu telefonicznego.`,
      rows: detailsRows(data),
    }),
  });
}
