// lib/mailer.ts
import nodemailer from "nodemailer";

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

type ReservationEmailData = {
  customerName: string;
  customerEmail: string;
  date: string; // np. "25.04.2026"
  time: string; // np. "19:30"
  partySize: number;
  tableNumber?: number;
  tableLocation?: string | null;
  notes?: string | null;
};

function formatConfirmationEmail(data: ReservationEmailData): string {
  return `
    <div style="font-family: Georgia, serif; padding: 40px 20px; background-color: #0e0c09;">
      <div style="max-width: 560px; margin: auto; background-color: #15120d; border: 1px solid #2a2418; padding: 40px;">
        
        <p style="color: #c9a84c; text-align: center; letter-spacing: 0.3em; font-size: 13px; margin: 0 0 16px;">✦ ✦ ✦</p>
        <h1 style="color: #f0e6cc; font-weight: 300; font-size: 28px; text-align: center; margin: 0 0 8px; letter-spacing: 0.04em;">
          Rezerwacja potwierdzona
        </h1>
        <p style="color: #6b5a2a; text-align: center; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 32px;">
          Restauracja Muszynova
        </p>
        
        <hr style="border: none; border-top: 1px solid #2a2418; margin: 0 0 32px;">

        <p style="color: #a09070; font-size: 15px; font-weight: 300; margin: 0 0 24px;">
          Drogi/a <strong style="color: #f0e6cc; font-weight: 400;">${data.customerName}</strong>,<br><br>
          z przyjemnością potwierdzamy Państwa rezerwację. Czekamy na Państwa wizytę.
        </p>

        <table style="width: 100%; border-collapse: collapse; margin: 0 0 32px;">
          ${[
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
          ]
            .map(
              ([label, value]) => `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #2a2418; color: #6b5a2a; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; width: 40%;">${label}</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #2a2418; color: #f0e6cc; font-size: 14px; font-weight: 300;">${value}</td>
            </tr>
          `,
            )
            .join("")}
        </table>

        <p style="color: #6b5a2a; font-size: 13px; font-weight: 300; margin: 0 0 8px;">
          W razie pytań lub konieczności zmiany rezerwacji prosimy o kontakt:
        </p>
        <p style="color: #c9a84c; font-size: 13px; margin: 0 0 32px;">
          biuro@muszynova.pl
        </p>

        <hr style="border: none; border-top: 1px solid #2a2418; margin: 0 0 24px;">
        
        <p style="color: #3a3020; font-size: 11px; text-align: center; margin: 0; letter-spacing: 0.1em;">
          Muszynova · Do zobaczenia
        </p>
      </div>
    </div>
  `;
}

export async function sendReservationConfirmation(
  data: ReservationEmailData,
): Promise<void> {
  await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: data.customerEmail,
    replyTo: "biuro@muszynova.pl",
    subject: `Potwierdzenie rezerwacji — ${data.date}, godz. ${data.time}`,
    html: formatConfirmationEmail(data),
  });
}
