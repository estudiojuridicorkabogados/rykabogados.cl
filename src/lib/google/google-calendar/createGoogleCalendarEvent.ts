import { google } from "googleapis";

import { CAMILA_EMAIL, NOTIFICATIONS_EMAIL } from "@/lib/utils/constants";

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

export async function createGoogleCalendarEvent(eventDetails: EventDetails) {
  const oauth2Client = await getOAuth2Client({
    delegatedUserEmail: NOTIFICATIONS_EMAIL,
    scope: "https://www.googleapis.com/auth/calendar",
  });

  const result = await google
    .calendar({ version: "v3", auth: oauth2Client })
    .events.insert({
      calendarId: NOTIFICATIONS_EMAIL,
      requestBody: createEventData(eventDetails),
      sendUpdates: "all",
    });

  return {
    eventId: result.data.id,
    htmlLink: result.data.htmlLink,
  };
}

function createEventData(eventDetails: EventDetails) {
  return {
    summary: eventDetails.title,
    attendees: [{ email: CAMILA_EMAIL }, { email: eventDetails.userEmail }],
    description: `
    <p>Nombre: ${eventDetails.name}</p>
    <p>Correo: ${eventDetails.userEmail}</p>
    <p>Anos de antigüedad laboral: ${eventDetails.antiguedadLaboral}</p>
    <p>Causal de despido: ${eventDetails.causalDespido}</p>
    <p>Cuentanos un poco sobre tu caso: ${eventDetails.notes}</p>
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
