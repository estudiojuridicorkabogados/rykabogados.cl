"use client";

import { useMemo } from "react";

import { WhatsappIcon } from "@/components/icons/Whatsapp";
import { Button } from "@/components/ui/Button";
import { useTracking } from "@/hooks/useTracking";
import { trackWhatsappConversion } from "@/lib/utils/analytics";
import { classNames } from "@/lib/utils/classNames";
import { URLS } from "@/lib/utils/constants";

interface WhatsappLinkProps {
  className?: string;
  text?: string;
  showIcon?: boolean;
  variant?: "button" | "link";
}

export const WhatsappLink: React.FC<WhatsappLinkProps> = ({
  className,
  text = "Hablemos por Whatsapp",
  showIcon = true,
  variant = "button",
}) => {
  const { buildWhatsAppUrl, logToSheet, fireConversion } = useTracking();

  // Extract phone and base text from existing WhatsApp URL
  const { phone, baseText } = useMemo(() => {
    try {
      const url = new URL(URLS.whatsapp());
      const phoneParam = url.searchParams.get("phone");
      const textParam = url.searchParams.get("text");
      return {
        phone: phoneParam?.replace(/\D/g, "") || undefined,
        baseText: textParam || undefined,
      };
    } catch {
      return { phone: undefined, baseText: undefined };
    }
  }, []);

  // Build WhatsApp URL with tracking
  const whatsappUrl = useMemo(() => {
    if (!phone || !baseText) {
      return URLS.whatsapp();
    }

    return buildWhatsAppUrl({ phone, baseText });
  }, [buildWhatsAppUrl, phone, baseText]);

  const handleClick = () => {
    // Log to Google Sheets
    logToSheet({
      landing: window.location.href,
      channel: "whatsapp",
      phone: phone || "56986395780",
    });

    // Fire conversion
    fireConversion();

    // Call existing conversion tracking for backward compatibility
    trackWhatsappConversion();
  };

  if (variant === "link") {
    return (
      <a
        href={whatsappUrl}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(
          "text-black underline font-medium hover:text-primary/80 cursor-pointer",
          className
        )}
      >
        {text}
      </a>
    );
  }

  return (
    <Button variant="whatsapp" asChild>
      <a
        href={whatsappUrl}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames("group flex items-center", className)}
      >
        {showIcon && (
          <WhatsappIcon className="mr-2 w-4 h-4 fill-current text-black group-hover:text-white transition-colors" />
        )}
        {text}
      </a>
    </Button>
  );
};
