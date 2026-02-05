import { google } from "googleapis";

import { CAMILA_EMAIL, CONTACTO_EMAIL } from "@/lib/utils/constants";

import { getOAuth2Client } from "../getOauth2Client";

interface EventDetails {
  title: string;
  notes: string;
  name: string;
  userEmail: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  antiguedadLaboral: string;
  causalDespido: string;
}

export async function createGoogleCalendarEvent(
  eventDetails: EventDetails,
  sessionCode: string
) {
  const oauth2Client = await getOAuth2Client({
    delegatedUserEmail: CONTACTO_EMAIL,
    scope: "https://www.googleapis.com/auth/calendar",
  });

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
    Anos de antigüedad laboral: ${eventDetails.antiguedadLaboral}\n
    Causal de despido: ${eventDetails.causalDespido}\n
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
