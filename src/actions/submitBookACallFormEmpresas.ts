"use server";

import { addMinutes } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

import { getGmailOAuth2Client } from "@/lib/google/gmail/getGmailOAuth2Client";
import { sendEmail } from "@/lib/google/gmail/sendEmail";
import { createGoogleCalendarEventEmpresas } from "@/lib/google/google-calendar/createGoogleCalendarEventEmpresas";
import { verifyCaptcha } from "@/lib/google/re-captcha/verifyCaptcha";
import { CAMILA_EMAIL, CONTACTO_EMAIL } from "@/lib/utils/constants";

import { FormData } from "../app/habla-con-nosotros/empresas/_components/ReservaFormEmpresas/types";

interface SubmitBookACallFormData extends Omit<FormData, "date"> {
  date: string;
}

export async function submitBookACallFormEmpresas(
  data: SubmitBookACallFormData,
  reCaptchaToken: string | null,
  sessionCode: string
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

    const notes =
      typeof data.mensaje === "string" ? data.mensaje : "";

    const santiagoStartTime = fromZonedTime(
      `${data.date} ${data.timeSlot}`,
      "America/Santiago"
    );

    const santiagoEndTime = addMinutes(santiagoStartTime, 30);

    const result = await createGoogleCalendarEventEmpresas(
      {
        title: "Asesoria Gratuita",
        name: data.name,
        tamanoEmpresa: data.tamanoEmpresa,
        phoneNumber: data.phoneNumber,
        motivoAsesoria: data.motivoAsesoria,
        notes,
        userEmail: data.email,
        startTime: santiagoStartTime.toISOString(),
        endTime: santiagoEndTime.toISOString(),
      },
      sessionCode
    );

    if (!result.htmlLink) {
      return {
        success: false,
        message: "No se pudo crear una cita",
      };
    }

    await dispatchNotificationEmails(
      {
        name: data.name,
        userEmail: data.email,
        phoneNumber: data.phoneNumber,
        notes,
        motivoAsesoria: data.motivoAsesoria,
        tamanoEmpresa: data.tamanoEmpresa,
        eventHtmlLink: result.htmlLink,
      },
      sessionCode
    );

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
  motivoAsesoria: string;
  tamanoEmpresa: string;
  eventHtmlLink: string;
}

async function dispatchNotificationEmails(
  args: NotificationEmailArgs,
  sessionCode: string
) {
  const gmailOAuth2Client = await getGmailOAuth2Client();

  await sendEmail({
    to: args.userEmail,
    subject: "Confirmación de tu solicitud - RK Abogados",
    from: CONTACTO_EMAIL,
    replyTo: CONTACTO_EMAIL,
    html: `
        <p>Hola ${args.name},</p>
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
        <p>Nueva solicitud de llamada de rkabogados.cl (Empresas)</p>
        <p><strong>Nombre:</strong> ${args.name}</p>
        <p><strong>Email:</strong> ${args.userEmail}</p>
        <p><strong>Teléfono:</strong> ${args.phoneNumber}</p>
        <p><strong>Motivo de la asesoría:</strong> ${args.motivoAsesoria}</p>
        <p><strong>Tamaño de la empresa:</strong> ${args.tamanoEmpresa}</p>
        <p><strong>Notas:</strong> ${args.notes}</p>
        <p><strong>Codigo:</strong> ${sessionCode}</p>
      `,
    from: CONTACTO_EMAIL,
    replyTo: CONTACTO_EMAIL,
    oauth2Client: gmailOAuth2Client,
  });
}
