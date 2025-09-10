import { useEffect, useState } from "react";

import { classNames } from "@/lib/utils/classNames";

interface InitialBotMessageProps {
  open: boolean;
}

export const InitialBotMessage: React.FC<InitialBotMessageProps> = ({
  open,
}) => {
  const [showInitialMessage, setShowInitialMessage] = useState(false);

  useEffect(() => {
    if (!open) {
      setShowInitialMessage(false);
      return;
    }

    const t = setTimeout(() => setShowInitialMessage(true), 200);

    return () => clearTimeout(t);
  }, [open]);

  return (
    <div
      className={classNames([
        "transform transition-all duration-300 ease-out",
        "pointer-events-none",
        {
          "opacity-0 translate-y-2": !showInitialMessage,
          "opacity-100 translate-y-0": showInitialMessage,
        },
      ])}
      aria-hidden={!showInitialMessage}
    >
      <div className="flex justify-start">
        <div className="chatbot-msg agent-msg">
          ¡Hola! Soy el asistente virtual de Ryk Abogados. Estoy aquí para
          ayudarte con consultas legales y brindarte información sobre nuestros
          servicios. ¿En qué puedo asistirte hoy?
        </div>
      </div>
    </div>
  );
};
