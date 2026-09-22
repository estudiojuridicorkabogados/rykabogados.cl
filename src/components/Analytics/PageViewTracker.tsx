"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import {
  pageTypeFromPathname,
  resetPageScope,
  RK_EVENTS,
  trackEvent,
} from "@/lib/utils/analytics";

/**
 * Sends `rk_page_view` on every navigation.
 *
 * The site never reloads between pages, so without this the whole journey is
 * one page view on the landing page. Analytics' own enhanced measurement does
 * count soft navigations, but it sends a bare URL: no sense of what kind of
 * page it was, where the visitor came from, or whether this was their entry
 * point. Those three labels are what make a path report readable, so we send
 * our own alongside rather than trying to bend Google's.
 *
 * It also owns the reset of the fire-once bookkeeping in analytics.ts — a form
 * that came into view on the previous page has not come into view on this one.
 */
export const PageViewTracker = () => {
  const pathname = usePathname();
  const reported = useRef<string | null>(null);

  useEffect(() => {
    // The guard is on the page already reported, not on a first-run flag.
    // Strict Mode mounts, unmounts and mounts again in development, which a
    // flag turns into two page views for one arrival — and the second one
    // claims the visitor navigated from the page they are standing on. There
    // is no such thing as navigating from a path to itself, so comparing
    // paths costs nothing and survives any remount.
    if (reported.current === pathname) {
      return;
    }

    const previous = reported.current;
    reported.current = pathname;

    // Runs before any signal on the new page: effects flush on commit, ahead
    // of the user events that produce everything else.
    resetPageScope();

    trackEvent(RK_EVENTS.PAGE_VIEW, {
      is_first_page: previous === null,
      ...(previous && {
        previous_page: previous,
        previous_page_type: pageTypeFromPathname(previous),
      }),
    });
  }, [pathname]);

  return null;
};
