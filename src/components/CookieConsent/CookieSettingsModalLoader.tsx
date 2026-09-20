"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { useCookieConsent } from "./useCookieConsent";

/**
 * The settings modal pulls in @headlessui/react and the animation library, and
 * it is only ever shown when someone clicks "Configurar" on the cookie banner.
 * Loading it on demand keeps both out of every page's initial bundle.
 * See docs/lcp-performance-plan.md.
 */
const CookieSettingsModal = dynamic(
  () => import("./CookieSettingsModal").then((m) => m.CookieSettingsModal),
  { ssr: false }
);

export const CookieSettingsModalLoader = () => {
  const { showModal } = useCookieConsent();
  // Stay mounted after the first open so the modal keeps its exit animation.
  // Derived during render rather than in an effect, so the modal mounts in the
  // same commit as the click instead of one render later.
  const [everOpened, setEverOpened] = useState(false);

  if (showModal && !everOpened) {
    setEverOpened(true);
  }

  if (!everOpened) return null;

  return <CookieSettingsModal />;
};
