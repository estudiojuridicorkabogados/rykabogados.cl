"use client";

import { useEffect, useSyncExternalStore } from "react";

import { getSessionCode } from "@/lib/utils/tracking";

/**
 * The Caso code for this visit, shared by every component that asks for it.
 *
 * It lives in sessionStorage, which the server has no way to see, and these
 * pages are prerendered — so the code cannot be resolved while rendering
 * without baking a throwaway server-generated one into the HTML of every
 * WhatsApp link. Rendering starts empty, matching what the server produced,
 * and the code arrives immediately after mount.
 *
 * Held in a module variable rather than read through on every call because
 * React compares snapshots by identity and keeps re-rendering until one stops
 * changing: getSessionCode's fallback for blocked storage returns a fresh
 * random code each time it is called, so reading it straight through would
 * spin. Caching also means every WhatsApp link and form on the page quotes the
 * same code, which is the entire point of it.
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
  const code = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (sessionCode) {
      return;
    }

    sessionCode = getSessionCode();

    for (const listener of listeners) {
      listener();
    }
  }, []);

  return code;
}
