"use client";

import { usePathname } from "next/navigation";

/**
 * The only reason the footer needed to be a Client Component was this one path
 * check. Keeping it here, with the footer passed in as `children`, lets the
 * footer's markup stay server-rendered — a Client Component's `children` are
 * not client code. See docs/lcp-performance-plan.md.
 */
export const FooterGate: React.FC<React.PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

  if (pathname === "/contacto") {
    return null;
  }

  return <>{children}</>;
};
