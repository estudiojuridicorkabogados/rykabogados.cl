import { formatInTimeZone } from "date-fns-tz";

const SITE_TIME_ZONE = "America/Santiago";

/**
 * date-fns' format() resolves whatever timezone the runtime happens to be
 * in, which differs between the server (Vercel, typically UTC) and each
 * visitor's browser. For evening-published posts that difference can shift
 * the formatted calendar day, causing a hydration mismatch between the
 * server-rendered date text and what the client recomputes. Pin every
 * user-facing date to the firm's own timezone instead of the runtime's.
 */
export function formatSantiago(
  date: Date | string | number,
  formatStr: string,
  options?: Parameters<typeof formatInTimeZone>[3]
) {
  return formatInTimeZone(date, SITE_TIME_ZONE, formatStr, options);
}
