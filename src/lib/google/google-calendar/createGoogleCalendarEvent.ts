import { getGoogleCalendarClient } from "./getGoogleCalendarClient";

interface EventDetails {
  title: string;
  notes: string;
  userEmail: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
}

const NOTIFICATIONS_EMAIL = "notificaciones@ryoasociados.cl";
const CAMILA_EMAIL = "camila.retamales@ryoasociados.cl";

const BASE_ATTENDEES = [
  { email: NOTIFICATIONS_EMAIL },
  { email: CAMILA_EMAIL },
];

export async function createGoogleCalendarEvent(eventDetails: EventDetails) {
  const calendar = await getGoogleCalendarClient();

  // @TODO Make sure dates are always for Chilean Timezone (convert the mthe right wasy)
  const eventData = {
    summary: eventDetails.title,
    description: eventDetails.notes,
    organizer: {
      email: NOTIFICATIONS_EMAIL,
      displayName: "RK Abogados",
      self: true,
    },
    attendees: [
      ...BASE_ATTENDEES,
      {
        email: eventDetails.userEmail,
      },
    ],
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
    calendarId: NOTIFICATIONS_EMAIL,
    requestBody: eventData,
    sendUpdates: "all",
  });

  return {
    eventId: result.data.id,
    htmlLink: result.data.htmlLink,
  };
}
