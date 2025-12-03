"use client";

import { WhatsappIcon } from "@/components/icons/Whatsapp";
import { Button } from "@/components/ui/Button";
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
  if (variant === "link") {
    return (
      <a
        href={URLS.whatsapp()}
        onClick={trackWhatsappConversion}
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
        href={URLS.whatsapp()}
        onClick={trackWhatsappConversion}
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
