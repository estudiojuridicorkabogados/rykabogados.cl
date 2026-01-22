"use client";

import { useEffect } from "react";

import { useTracking } from "@/hooks/useTracking";

/**
 * Component that decorates dynamically added WhatsApp links with tracking
 * Uses MutationObserver to watch for new links added to the DOM
 */
export function WhatsappLinkDecorator() {
  const { buildWhatsAppUrl, logToSheet, fireConversion, shortCode, gclid } =
    useTracking();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const isWhatsAppLink = (a: HTMLAnchorElement): boolean => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      return href.includes("wa.me/") || href.includes("api.whatsapp.com/send");
    };

    const strengthenLink = (a: HTMLAnchorElement) => {
      // Skip if already processed
      if ((a as unknown as { __bound: boolean }).__bound) {
        return;
      }

      const href = a.getAttribute("href") || "";
      const phone =
        href.match(/wa\.me\/(\d+)/)?.[1] ||
        (() => {
          try {
            const url = new URL(href, window.location.origin);
            return url.searchParams.get("phone")?.replace(/\D/g, "") || "";
          } catch {
            return "";
          }
        })() ||
        "56986395780";

      const baseText = (() => {
        try {
          const url = new URL(href, window.location.origin);
          return url.searchParams.get("text") || "";
        } catch {
          return "";
        }
      })();

      const waURL = buildWhatsAppUrl({ phone, baseText });

      a.setAttribute("href", waURL);
      (a as unknown as { __bound: boolean }).__bound = true;

      a.addEventListener(
        "click",
        (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          ev.stopImmediatePropagation();

          fireConversion();
          logToSheet({
            landing: window.location.href,
            channel: "whatsapp",
            phone,
          });

          window.open(waURL, "_blank");
        },
        true
      );
    };

    const decorateAll = (root: Document | Element = document) => {
      root.querySelectorAll("a[href]").forEach((a) => {
        if (isWhatsAppLink(a as HTMLAnchorElement)) {
          strengthenLink(a as HTMLAnchorElement);
        }
      });
    };

    // Decorate existing links on mount
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        decorateAll();
      });
    } else {
      decorateAll();
    }

    // Watch for dynamically added links
    const observer = new MutationObserver(() => {
      decorateAll();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [buildWhatsAppUrl, logToSheet, fireConversion, shortCode, gclid]);

  return null;
}
