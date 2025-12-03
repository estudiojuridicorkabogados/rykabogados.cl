import ReactMarkdown from "react-markdown";
import { UIMessage } from "ai";

import { WhatsappLink } from "@/components/WhatsappLink/WhatsappLink";
import { classNames } from "@/lib/utils/classNames";

interface MessageProps {
  message?: UIMessage;
  loading?: boolean;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message?.role === "user";

  // Check for WhatsApp tool invocation
  const whatsappToolInvocation = message?.parts.find(
    ({ type }) => type === "tool-provideWhatsappContact"
  );

  // If there's a WhatsApp tool invocation, render the link
  if (whatsappToolInvocation) {
    return (
      <div className="flex justify-start">
        <div className="chatbot-msg agent-msg">
          Si quieres hablar por WhatsApp, puedes usar este número{" "}
          <WhatsappLink variant="link" text="+56 9 8639 5780 📲" />
        </div>
      </div>
    );
  }

  const text = message?.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("")
    .trim();

  if (!text) {
    return null;
  }

  return (
    <div
      className={classNames("flex", {
        "justify-end": isUser,
        "justify-start": !isUser,
      })}
    >
      <div
        className={classNames("chatbot-msg", {
          "user-msg": isUser,
          "agent-msg": !isUser,
        })}
      >
        <ReactMarkdown
          components={{
            h1: ({ ...props }) => <h1 className="font-sans" {...props} />,
            h2: ({ ...props }) => <h2 className="font-sans" {...props} />,
            h3: ({ ...props }) => <h3 className="font-sans" {...props} />,
            h4: ({ ...props }) => <h4 className="font-sans" {...props} />,
            h5: ({ ...props }) => <h5 className="font-sans" {...props} />,
            h6: ({ ...props }) => <h6 className="font-sans" {...props} />,
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};
