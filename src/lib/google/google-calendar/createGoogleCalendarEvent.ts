import { google } from "googleapis";

import { CAMILA_EMAIL, NOTIFICATIONS_EMAIL } from "@/lib/utils/constants";

import { getOAuth2Client } from "../getOauth2Client";

interface EventDetails {
  title: string;
  notes: string;
  userEmail: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
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
    description: eventDetails.notes,
    attendees: [{ email: CAMILA_EMAIL }, { email: eventDetails.userEmail }],
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
