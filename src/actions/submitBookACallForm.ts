"use server";
import { addMinutes } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

import { getGmailOAuth2Client } from "@/lib/google/gmail/getGmailOAuth2Client";
import { sendEmail } from "@/lib/google/gmail/sendEmail";
import { createGoogleCalendarEvent } from "@/lib/google/google-calendar/createGoogleCalendarEvent";
import { verifyCaptcha } from "@/lib/google/re-captcha/verifyCaptcha";
import { CAMILA_EMAIL, NOTIFICATIONS_EMAIL } from "@/lib/utils/constants";

import { FormData } from "../app/habla-con-nosotros/_components/ReservaForm/types";

interface SubmitBookACallFormData extends Omit<FormData, "date"> {
  date: string;
}

export async function submitBookACallForm(
  data: SubmitBookACallFormData,
  reCaptchaToken: string | null
) {
  try {
    if (!reCaptchaToken) {
      console.error("ReCAPTCHA no enviado");
      return { success: false, message: "ReCAPTCHA no enviado" };
    }

    const isValidCaptcha = await verifyCaptcha(reCaptchaToken);

    if (!isValidCaptcha) {
      console.error("ReCAPTCHA no enviado");

      return {
        success: false,
        message: "Por favor, completa el CAPTCHA.",
      };
    }

    if (!data.date) {
      return {
        success: false,
        message: "Debe enviar una fecha",
      };
    }

    const santiagoStartTime = fromZonedTime(
      `${data.date} ${data.timeSlot}`,
      "America/Santiago"
    );

    const santiagoEndTime = addMinutes(santiagoStartTime, 30);

    const result = await createGoogleCalendarEvent({
      title: "Asesoria Gratuita",
      name: data.name,
      antiguedadLaboral: data.antiguedadLaboral,
      causalDespido: data.causalDespido,
      notes: data.mensaje,
      userEmail: data.email,
      startTime: santiagoStartTime.toISOString(),
      endTime: santiagoEndTime.toISOString(),
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
      notes: data.mensaje,
      causalDespido: data.causalDespido,
      antiguedadLaboral: data.antiguedadLaboral,
      eventHtmlLink: result.htmlLink,
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
  causalDespido: string;
  antiguedadLaboral: string;
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
    to: CAMILA_EMAIL,
    subject: "Nueva solicitud de llamada",
    html: `
        <h2>Nueva solicitud de llamada de rkabogados.cl</h2>
        <p><strong>Nombre:</strong> ${args.name}</p>
        <p><strong>Email:</strong> ${args.userEmail}</p>
        <p><strong>Teléfono:</strong> ${args.phoneNumber}</p>
        <p><strong>Causal de despido:</strong> ${args.causalDespido}</p>
        <p><strong>Antigüedad laboral:</strong> ${args.antiguedadLaboral}</p>
        <p><strong>Notas:</strong> ${args.notes}</p>
      `,
    from: NOTIFICATIONS_EMAIL,
    replyTo: NOTIFICATIONS_EMAIL,
    oauth2Client: gmailOAuth2Client,
  });
}
