"use client";

import { useSyncExternalStore } from "react";

import { WhatsappIcon } from "@/components/icons/Whatsapp";
import { Button } from "@/components/ui/Button";
import { useTracking } from "@/hooks/useTracking";
import { TrackLocation, trackWhatsappConversion } from "@/lib/utils/analytics";
import { classNames } from "@/lib/utils/classNames";

interface WhatsappLinkProps {
  /**
   * Where on the page this link sits. Required, and deliberately so: the
   * component is used in ten places and every one of them produced the same
   * indistinguishable conversion, so a tap won from a chatbot conversation
   * read exactly like one in the footer. A required prop is the only thing
   * that stops an eleventh being added untagged.
   */
  location: TrackLocation;
  className?: string;
  text?: string;
  showIcon?: boolean;
  variant?: "button" | "link" | "free-text";
  greenButton?: boolean;
  outlinePrimary?: boolean;
}

const WhatsappLinkInternal: React.FC<WhatsappLinkProps> = ({
  location,
  className,
  text = "Hablemos por Whatsapp",
  showIcon = true,
  variant = "button",
  greenButton = false,
  outlinePrimary = false,
}) => {
  const { whatsappUrl, logToSheet } = useTracking();

  const handleClick = () => {
    // The Sheet row stays as it is: the Apps Script behind it reads a fixed
    // set of parameters, and `location` belongs in the funnel rather than in
    // the case log.
    logToSheet({
      landing: window.location.href,
      channel: "whatsapp",
    });

    trackWhatsappConversion(location);
  };

  if (variant === "free-text") {
    return (
      <a
        href={whatsappUrl}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(
          "text-black hover:underline font-medium hover:text-primary/80 cursor-pointer flex items-center gap-2 text-sm lg:text-base"
        )}
      >
        <WhatsappIcon className="h-4 w-4 fill-current text-green-700 transition-colors group-hover:text-white" />
        {text}
      </a>
    );
  }

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
