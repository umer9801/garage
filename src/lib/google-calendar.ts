// Simple approach - using direct calendar link without API
// No external dependencies needed - uses Google Calendar public URLs
// This avoids complex OAuth setup while still providing calendar integration

export interface CalendarEvent {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location?: string;
}

export function generateCalendarEventUrl(event: CalendarEvent): string {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d{3}/g, "");
  };

  const params = new URLSearchParams({
    text: event.title,
    dates: `${formatDate(event.startDate)}/${formatDate(event.endDate)}`,
    details: event.description,
    location: event.location || "Sleek Automotive Garage",
  });

  return `https://calendar.google.com/calendar/r/eventedit?${params.toString()}`;
}

export function getEmbedCalendarUrl(calendarId: string = "uq4sYJqA9JE8FM8h9"): string {
  return `https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=Europe/London&mode=MONTH`;
}

export function getCalendarShareUrl(calendarId: string = "uq4sYJqA9JE8FM8h9"): string {
  return `https://calendar.app.google/${calendarId}`;
}
