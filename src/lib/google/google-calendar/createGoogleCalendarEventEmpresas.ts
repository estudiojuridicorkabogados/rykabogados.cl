import { google } from "googleapis";

import { CAMILA_EMAIL, CONTACTO_EMAIL } from "@/lib/utils/constants";

import { getCalendarOAuth2Client } from "./getCalendarOAuth2Client";

interface EventDetails {
  title: string;
  notes: string;
  name: string;
  phoneNumber: string;
  userEmail: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  motivoAsesoria: string;
  tamanoEmpresa: string;
  comoQuieresAvanzar: string;
}

export async function createGoogleCalendarEventEmpresas(
  eventDetails: EventDetails,
  sessionCode: string
) {
  const oauth2Client = await getCalendarOAuth2Client();

  const result = await google
    .calendar({ version: "v3", auth: oauth2Client })
    .events.insert({
      calendarId: CONTACTO_EMAIL,
      requestBody: createEventData(eventDetails, sessionCode),
      sendUpdates: "all",
    });

  return {
    eventId: result.data.id,
    htmlLink: result.data.htmlLink,
  };
}

function createEventData(eventDetails: EventDetails, sessionCode: string) {
  return {
    summary: eventDetails.title,
    attendees: [{ email: CAMILA_EMAIL }, { email: eventDetails.userEmail }],
    guestsCanModify: true,
    description: `
    Nombre: ${eventDetails.name}\n
    Correo: ${eventDetails.userEmail}\n
    Teléfono: ${eventDetails.phoneNumber}\n
    Motivo de la asesoría: ${eventDetails.motivoAsesoria}\n
    Tamaño de la empresa: ${eventDetails.tamanoEmpresa}\n
    Cómo quiere avanzar: ${eventDetails.comoQuieresAvanzar}\n
    Cuentanos un poco sobre tu caso: ${eventDetails.notes}\n
    Codigo: ${sessionCode}\n
    `,
    start: {
      dateTime: eventDetails.startTime,
      timeZone: "America/Santiago",
    },
    end: {
      dateTime: eventDetails.endTime,
      timeZone: "America/Santiago",
    },
  };
}
