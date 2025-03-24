import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Funkcja walidacji pól formularza :)
function validateFields(fields) {
  return Object.entries(fields).every(
    ([key, value]) => value && value.trim() !== ""
  );
}

// Funkcja tworząca HTML wiadomości e-mail
function createEmailTemplate({ text, fullName, email }) {
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
          Ta wiadomość została wysłana z formularza kontaktowego na stronie DomiWeb.
        </p>
      </div>
    </div>
  `;
}

// Funkcja weryfikująca token reCAPTCHA
async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY; // Secret Key reCAPTCHA
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
      }),
    }
  );

  const data = await response.json();
  return data.success;
}

export async function POST(request) {
  try {
    const { text, fullName, email, recaptchaToken } = await request.json();
    console.log("Otrzymane dane:", { text, fullName, email, recaptchaToken });

    // Sprawdzenie, czy wszystkie pola są wypełnione
    const fields = {
      text,
      fullName,
      email,
    };
    if (!validateFields(fields)) {
      console.log("Błąd walidacji pól:", fields); // Logowanie błędu walidacji
      return NextResponse.json(
        { message: "Uzupełnij wymagane pola" },
        { status: 400 }
      );
    }

    // Weryfikacja reCAPTCHA
    const recaptchaValid = await verifyRecaptcha(recaptchaToken);
    console.log("Weryfikacja reCAPTCHA:", recaptchaValid); // Sprawdzamy wynik weryfikacji
    if (!recaptchaValid) {
      console.error("Nieudana weryfikacja reCAPTCHA"); // Dodaj logowanie
      return NextResponse.json(
        { message: "Weryfikacja reCAPTCHA nie powiodła się." },
        { status: 400 }
      );
    }

    // Konfiguracja transporteru SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: "true",
      auth: {
        user: "biosite.praca@gmail.com",
        pass: process.env.NODEMAILER_PW,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: "domiweb.biuro@gmail.com",
      replyTo: email, // Adres e-mail klienta podany w formularzu
      subject: "Email ze strony DomiWeb od klienta",
      html: createEmailTemplate(fields),
    };

    // Wysyłka wiadomości e-mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Wiadomość wysłana prawidłowo" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error przy wysyłaniu wiadomości:", error);
    return NextResponse.json(
      { message: "Nieudana próba wysłania wiadomości", error: error.message },
      { status: 500 }
    );
  }
}
