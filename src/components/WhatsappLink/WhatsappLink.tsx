"use client";

import { Suspense } from "react";

import { WhatsappIcon } from "@/components/icons/Whatsapp";
import { Button } from "@/components/ui/Button";
import { useTracking } from "@/hooks/useTracking";
import { trackWhatsappConversion } from "@/lib/utils/analytics";
import { classNames } from "@/lib/utils/classNames";

interface WhatsappLinkProps {
  className?: string;
  text?: string;
  showIcon?: boolean;
  variant?: "button" | "link";
}

const WhatsappLinkInternal: React.FC<WhatsappLinkProps> = ({
  className,
  text = "Hablemos por Whatsapp",
  showIcon = true,
  variant = "button",
}) => {
  const { whatsappUrl, logToSheet, fireConversion } = useTracking();

  const handleClick = () => {
    // Log to Google Sheets
    logToSheet({
      landing: window.location.href,
      channel: "whatsapp",
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
          <WhatsappIcon className="mr-2 w-4 h-4 fill-current text-white group-hover:text-white transition-colors" />
        )}
        {text}
      </a>
    </Button>
  );
};

export const WhatsappLink: React.FC<WhatsappLinkProps> = (props) => {
  return (
    <Suspense>
      <WhatsappLinkInternal {...props} />
    </Suspense>
  );
};
