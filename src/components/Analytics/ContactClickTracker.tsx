"use client";

import { useEffect } from "react";

import { RK_EVENTS, trackEvent, TrackLocation } from "@/lib/utils/analytics";

/**
 * Sends `rk_contact_click` when a phone number or email address is clicked.
 *
 * One delegated listener rather than a handler per link, because most of
 * these anchors live in server components — the footer, the contact page's
 * sidebar, a FAQ answer — and the team page renders one of each per lawyer.
 * Adding onClick to those would mean converting four server components to
 * client components and hand-tagging twenty-odd anchors, for a signal that is
 * fully described by the anchor's own href.
 *
 * Placement comes from the nearest `data-track-location` ancestor, which is a
 * plain HTML attribute and so costs a server component nothing. Where there is
 * none, `page_type` already says where the click happened, which for a link
 * that appears once on a page is the whole answer.
 *
 * Capture phase so the signal is recorded even if something downstream stops
 * propagation, and `tel:`/`mailto:` navigations hand the page to another
 * application rather than unloading it, so there is no race with teardown.
 */
export const ContactClickTracker = () => {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      const href = link?.getAttribute("href");

      if (!link || !href) return;

      const method = href.startsWith("tel:")
        ? "phone"
        : href.startsWith("mailto:")
          ? "email"
          : undefined;

      if (!method) return;

      const labelled = link.closest("[data-track-location]");
      const location = labelled?.getAttribute("data-track-location") ?? "";

      trackEvent(RK_EVENTS.CONTACT_CLICK, {
        contact_method: method,
        ...(location && { location: location as TrackLocation }),
      });
    };

    document.addEventListener("click", onClick, { capture: true });

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  return null;
};
