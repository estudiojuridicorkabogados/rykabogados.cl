"use client";

import { useSyncExternalStore } from "react";

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
  greenButton?: boolean;
  outlinePrimary?: boolean;
}

const WhatsappLinkInternal: React.FC<WhatsappLinkProps> = ({
  className,
  text = "Hablemos por Whatsapp",
  showIcon = true,
  variant = "button",
  greenButton = false,
  outlinePrimary = false,
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
    <Button
      variant={
        outlinePrimary
          ? "outline-primary-glass"
          : greenButton
            ? "whatsapp-green"
            : "whatsapp"
      }
      asChild
    >
      <a
        href={whatsappUrl}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames("group flex items-center", className)}
      >
        {showIcon && (
          <WhatsappIcon
            className={classNames(
              "mr-2 w-4 h-4 fill-current text-white group-hover:text-white transition-colors",
              {
                "fill-primary group-hover:fill-white": outlinePrimary,
              }
            )}
          />
        )}
        {text}
      </a>
    </Button>
  );
};

const subscribe = () => () => {};

export const WhatsappLink: React.FC<WhatsappLinkProps> = (props) => {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return null;
  }

  return <WhatsappLinkInternal {...props} />;
};
