"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Form() {
  const [formData, setFormData] = useState({
    text: "",
    fullName: "",
    email: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);
  const [errorFields, setErrorFields] = useState([]);
  const recaptchaRef = useRef(null); // Ref dla reCAPTCHA
  const t = useTranslations("contact");

  // Funkcja walidacji pól formularza
  function validateForm(data) {
    const errors = [];
    if (!data.fullName.trim()) errors.push("fullName");
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.push("email");
    if (!data.text.trim()) errors.push("text");

    setErrorFields(errors);
    return errors.length === 0;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const sendMail = async (e) => {
    e.preventDefault();
    if (isSending) return;

    if (!validateForm(formData)) {
      setFormError(t("form.error"));
      return;
    }

    // Pobranie tokena reCAPTCHA
    const recaptchaToken = recaptchaRef.current.getValue();
    if (!recaptchaToken) {
      setFormError(t("form.error2"));
      return;
    }

    // console.log("Wysyłanie danych:", { ...formData, recaptchaToken }); // Dodaj logowanie danych

    setIsSending(true);
    setFormError(null);

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({
          text: "",
          fullName: "",
          email: "",
        });
        recaptchaRef.current.reset(); // Zresetuj CAPTCHA po wysłaniu
      } else {
        const errorData = await response.json();
        setFormError(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setFormError("Niespodziewany błąd.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {formSubmitted ? (
        <div className="mt-10 lg:mt-20 ">
          <span className="text-2xl font-semibold text-customGold">
            {t("form.message1")}
          </span>
          <p className="font-light text-lg mt-6 ">{t("form.message2")}</p>
        </div>
      ) : (
        <form className="mt-10" onSubmit={sendMail}>
          <div>
            <label
              htmlFor="fullName"
              className="text-sm text-neutral-900  font-medium"
            >
              * {t("form.label1")}
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              onChange={handleChange}
              value={formData.fullName}
              placeholder={t("form.placeholder1")}
              style={{
                border: errorFields.includes("fullName")
                  ? "1px solid red"
                  : "0",
              }}
              className="w-full mt-3 mb-5 bg-neutral-100 placeholder:text-neutral-500 p-3 rounded-lg border border-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm text-neutral-700  font-medium"
            >
              * {t("form.label2")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              value={formData.email}
              placeholder={t("form.placeholder2")}
              style={{
                border: errorFields.includes("email") ? "1px solid red" : "0",
              }}
              className="w-full mt-3 mb-5 bg-neutral-100 placeholder:text-neutral-500 p-3 rounded-lg border border-gray-400"
            />
          </div>
          <div>
            <label
              htmlFor="text"
              className="text-sm text-neutral-700  font-medium"
            >
              * {t("form.label3")}
            </label>
            <textarea
              id="text"
              name="text"
              value={formData.text}
              placeholder={t("form.placeholder3")}
              onChange={handleChange}
              style={{
                border: errorFields.includes("text") ? "1px solid red" : "0",
              }}
              className="w-full bg-neutral-100 h-40 mt-3 placeholder:text-neutral-500 p-3 rounded-lg border border-gray-400"
            />
          </div>
          {formError && <p style={{ color: "red" }}>{formError}</p>}
          <div className="mt-4">
            <ReCAPTCHA
              className="mb-4"
              ref={recaptchaRef}
              sitekey="6LetqpUqAAAAABRwX_slcBybtlkC7S4X4QZZEYUo" // Wstaw swój Site Key
            />
            <button
              type="submit"
              disabled={isSending}
              className="bg-customGold text-lg text-white cursor-pointer font-medium whitespace-nowrap flex justify-center items-center gap-2 p-4 clip-custom hover:clip-reverse 
            transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              {isSending ? t("form.sending") : t("form.button")}
            </button>
          </div>
        </form>
      )}
    </>
  );
}
