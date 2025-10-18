"use server";

import { format } from "date-fns";

import { sendEmail } from "@/lib/gmail/sendEmail";
import { verifyCaptcha } from "@/lib/re-captcha/verifyCaptcha";

import { FormData } from "../app/habla-con-nosotros/_components/ReservaForm/types";

export async function submitBookACallForm(
  data: FormData,
  reCaptchaToken: string | null
) {
  try {
    console.log("Server action received:", data);

    if (!reCaptchaToken) {
      return { success: false, message: "ReCAPTCHA no enviado" };
    }

    const isValidCaptcha = await verifyCaptcha(reCaptchaToken);

    if (!isValidCaptcha) {
      return {
        success: false,
        message: "Por favor, completa el CAPTCHA.",
      };
    }

    if (data.date) {
      return {
        success: false,
        message: "Must send a date",
      };
    }

    await Promise.all([sendReceiptEmailToClient(data), notifyOffice(data)]);

    // @TODO Add event to calendar once ready

    return { success: true, message: "Reserva enviada exitosamente" };
  } catch (error) {
    console.error("Error submitting reservation:", error);
    return { success: false, message: "Error al enviar la reserva" };
  }
}

async function sendReceiptEmailToClient(data: FormData) {
  if (!data.date) {
    return;
  }

  const formattedDate = format(data.date, "dd/MM/yyyy");

  await sendEmail({
    to: data.email,
    subject: "Confirmación de tu solicitud - RK Abogados",
    replyTo: "info@rkabogados.cl", // Replies go to your office email
    html: `
        <h2>Hola ${data.name},</h2>
        <p>Hemos recibido tu solicitud de llamada para el <strong>${formattedDate}</strong> a las <strong>${data.timeSlot}</strong>.</p>
        <p>Nos pondremos en contacto contigo para confirmar la cita o proponerte un horario alternativo si el horario seleccionado no estuviera disponible.</p>
        <br>
        <p>Saludos,<br><strong>RK Abogados</strong></p>
      `,
  });
}

async function notifyOffice(data: FormData) {
  if (!data.date) {
    return;
  }

  const formattedDate = format(data.date, "dd/MM/yyyy");

  await sendEmail({
    to: "camila.retamales@rykabogados.cl",
    subject: "Nueva solicitud de llamada",
    html: `
        <h2>Nueva solicitud de llamada de rkabogados.cl</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Teléfono:</strong> ${data.phoneNumber}</p>
        <p><strong>Fecha:</strong> ${formattedDate}</p>
        <p><strong>Horario:</strong> ${data.timeSlot}</p>
      `,
  });
}
