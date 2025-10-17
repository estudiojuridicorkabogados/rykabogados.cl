import { env } from "../env";

import { getGoogleCalendarClient } from "./getGoogleCalendarClient";

interface EventDetails {
  title: string;
  notes?: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
}

export async function createGoogleCalendarEvent(eventDetails: EventDetails) {
  const calendar = await getGoogleCalendarClient();

  // @TODO Make sure dates are always for Chilean Timezone (convert the mthe right wasy)
  const eventData = {
    summary: eventDetails.title || "Next.js Booking",
    description: eventDetails.notes,
    start: {
      dateTime: eventDetails.startTime,
      timeZone: "America/Santiago",
    },
    end: {
      dateTime: eventDetails.endTime,
      timeZone: "America/Santiago",
    },
  };

  const result = await calendar.events.insert({
    calendarId: env.GOOGLE_TARGET_CALENDAR_ID,
    requestBody: eventData,
  });

  return {
    eventId: result.data.id,
    htmlLink: result.data.htmlLink,
  };
}
