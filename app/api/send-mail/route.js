import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { verifyRecaptcha } from "@/lib/recaptcha";

// Funkcja walidacji pól formularza :)
function validateFields(fields) {
  return Object.entries(fields).every(
    ([key, value]) => value && value.trim() !== "",
  );
}

// Escapowanie danych z formularza przed wstawieniem do HTML
function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Funkcja tworząca HTML wiadomości e-mail
function createEmailTemplate(fields) {
  const text = escapeHtml(fields.text).replace(/\n/g, "<br>");
  const fullName = escapeHtml(fields.fullName);
  const email = escapeHtml(fields.email);
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #3D5300; text-align: center;">Wiadomość ze strony <br> Muszynova</h2>
        
        <ul style="list-style-type: none; padding: 0; font-size: 16px; color: #333; line-height: 1.5;">
          <li><strong>Imię i Nazwisko</strong> ${fullName}</li>
          <li><strong>Wiadomość:</strong> ${text}</li>
          <li><strong>Email:</strong> <a href="mailto:${email}" style="color: #3D5300;">${email}</a></li>
        </ul>
        
        <hr style="border: 1px solid #ddd; margin: 20px 0;">
        
        <p style="font-size: 14px; color: #888; text-align: center;">
          Ta wiadomość została wysłana z formularza kontaktowego na stronie Muszynova.
        </p>
      </div>
    </div>
  `;
}

export async function POST(request) {
  try {
    const { text, fullName, email, recaptchaToken } = await request.json();

    // Sprawdzenie, czy wszystkie pola są wypełnione
    const fields = {
      text,
      fullName,
      email,
    };
    if (!validateFields(fields)) {
      return NextResponse.json(
        { message: "Uzupełnij wymagane pola" },
        { status: 400 },
      );
    }

    // Weryfikacja reCAPTCHA
    const recaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaValid) {
      console.error("Nieudana weryfikacja reCAPTCHA"); // Dodaj logowanie
      return NextResponse.json(
        { message: "Weryfikacja reCAPTCHA nie powiodła się." },
        { status: 400 },
      );
    }

    // Konfiguracja transporteru SMTP
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

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: "biuro@muszynova.pl",
      replyTo: email, // Adres e-mail klienta podany w formularzu
      subject: "Email ze strony Muszynova od klienta",
      html: createEmailTemplate(fields),
    };

    // Wysyłka wiadomości e-mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Wiadomość wysłana prawidłowo" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error przy wysyłaniu wiadomości:", error);
    return NextResponse.json(
      { message: "Nieudana próba wysłania wiadomości" },
      { status: 500 },
    );
  }
}
