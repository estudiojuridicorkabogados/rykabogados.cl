"use server";

import { getGmailOAuth2Client } from "@/lib/google/gmail/getGmailOAuth2Client";
import { sendEmail } from "@/lib/google/gmail/sendEmail";
import { createGoogleCalendarEvent } from "@/lib/google/google-calendar/createGoogleCalendarEvent";
import { verifyCaptcha } from "@/lib/google/re-captcha/verifyCaptcha";
import { CAMILA_EMAIL, NOTIFICATIONS_EMAIL } from "@/lib/utils/constants";

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
        message: "Debe enviar una fecha",
      };
    }

    // @TODO Fix this shit
    const result = await createGoogleCalendarEvent({
      title: "Asesoria Gratuita",
      notes: "body.notes",
      userEmail: data.email,
      startTime: "body.startTime",
      endTime: "body.endTime",
    });

    if (!result.htmlLink) {
      return {
        success: false,
        message: "No se pudo crear una cita",
      };
    }

    await dispatchNotificationEmails({
      name: data.name,
      userEmail: data.email,
      phoneNumber: data.phoneNumber,
      notes: "data.notes", // @TODO
      eventHtmlLink: "",
    });

    return { success: true, message: "Reserva enviada exitosamente" };
  } catch (error) {
    console.error("Error submitting reservation:", error);
    return { success: false, message: "Error al enviar la reserva" };
  }
}

interface NotificationEmailArgs {
  name: string;
  userEmail: string;
  phoneNumber: string;
  notes: string;
  eventHtmlLink: string;
}

async function dispatchNotificationEmails(args: NotificationEmailArgs) {
  const gmailOAuth2Client = await getGmailOAuth2Client();

  await sendEmail({
    to: args.userEmail,
    subject: "Confirmación de tu solicitud - RK Abogados",
    from: NOTIFICATIONS_EMAIL,
    replyTo: NOTIFICATIONS_EMAIL,
    html: `
        <h2>Hola ${args.name},</h2>
        <p>Hemos recibido tu solicitud de llamada.</p>
        <p>Nos pondremos en contacto contigo para confirmar la cita o proponerte un horario alternativo si el horario seleccionado no estuviera disponible.</p>
        <br>
        <p>Saludos,<br><strong>RK Abogados</strong></p>
      `,
    oauth2Client: gmailOAuth2Client,
  });

  await sendEmail({
    to: NOTIFICATIONS_EMAIL,
    subject: "Nueva solicitud de llamada",
    html: `
        <h2>Nueva solicitud de llamada de rkabogados.cl</h2>
        <p><strong>Nombre:</strong> ${args.name}</p>
        <p><strong>Email:</strong> ${args.userEmail}</p>
        <p><strong>Teléfono:</strong> ${args.phoneNumber}</p>
        <p><strong>Notas:</strong> ${args.notes}</p>
      `,
    from: CAMILA_EMAIL,
    replyTo: CAMILA_EMAIL,
    oauth2Client: gmailOAuth2Client,
  });
}
