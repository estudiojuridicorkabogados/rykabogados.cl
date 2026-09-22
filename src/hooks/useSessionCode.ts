"use client";

import { useEffect, useSyncExternalStore } from "react";

import { useCookieConsent } from "@/components/CookieConsent/useCookieConsent";
import { getSessionCode } from "@/lib/utils/tracking";

/**
 * The Caso code for this visit, shared by every component that asks for it.
 *
 * It lives in the ninety-day `rk_caso` cookie, which the server has no way to
 * see, and these pages are prerendered — so the code cannot be resolved while
 * rendering without baking a throwaway server-generated one into the HTML of
 * every WhatsApp link. Rendering starts empty, matching what the server
 * produced, and the code arrives after mount.
 *
 * Held in a module variable rather than read through on every call because
 * React compares snapshots by identity and keeps re-rendering until one stops
 * changing: getSessionCode's fallback for blocked storage returns a fresh
 * random code each time it is called, so reading it straight through would
 * spin. Caching also means every WhatsApp link and form on the page quotes the
 * same code, which is the entire point of it.
 *
 * Since phase 3 a *new* code needs advertising consent. A visitor who has not
 * answered the banner, or who declined, gets an empty string and their
 * WhatsApp message carries no reference — so the effect re-runs when the
 * choice changes rather than only on mount, and someone who accepts halfway
 * through a visit gets a code from that moment on.
 *
 * The consent check itself lives in getSessionCode, not here, and the order
 * matters: it reads the cookie first and asks about consent only before
 * minting. A visitor who consented, was issued a code, quoted it on WhatsApp
 * and later withdrew keeps that reference — rk_caso is exempt from
 * clearAttributionCookies for exactly this — and an early return on the
 * context flag here would have hidden the cookie the withdrawal preserved.
 */
let sessionCode = "";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return sessionCode;
}

function getServerSnapshot() {
  return "";
}

export function useSessionCode(): string {
  const { hasAdvertisingConsent } = useCookieConsent();
  const code = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (sessionCode) {
      return;
    }

    // Returns the stored code if there is one, "" without consent, and mints
    // only with it. Re-run on the flag so an acceptance mid-visit mints then.
    const minted = getSessionCode();
    if (!minted) {
      return;
    }

    sessionCode = minted;

    for (const listener of listeners) {
      listener();
    }
  }, [hasAdvertisingConsent]);

  return code;
}
