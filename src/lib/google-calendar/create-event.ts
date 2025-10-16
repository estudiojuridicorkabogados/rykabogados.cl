import { getCalendarClient } from "./google-calendar";

// @TODO USE evn
const TARGET_CALENDAR_ID = "c_9e03919b83d6867c1a2c05a3aa4c3a39efa92861f695ca14a0825238bc555616@group.calendar.google.com";
// const TARGET_CALENDAR_ID = process.env.GCP_SERVICE_ACCOUNT_EMAIL || "";

interface EventDetails {
  title: string;
  location?: string;
  notes?: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  timeZone?: string; // e.g., "America/Los_Angeles"
}

export async function createEvent(eventDetails: EventDetails) {
  const calendar = await getCalendarClient();

  // 3. Prepare the event data
  const eventData = {
    summary: eventDetails.title || "Next.js Booking",
    location: eventDetails.location,
    description: eventDetails.notes,
    start: {
      dateTime: eventDetails.startTime,
      timeZone: eventDetails.timeZone || "UTC", // Ensure you send a timezone
    },
    end: {
      dateTime: eventDetails.endTime,
      timeZone: eventDetails.timeZone || "UTC",
    },
  };

   const result = await calendar.events.insert({
      calendarId: TARGET_CALENDAR_ID,
      requestBody: eventDetails,
    });

}
