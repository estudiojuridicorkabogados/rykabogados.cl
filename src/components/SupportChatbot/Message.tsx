import ReactMarkdown from "react-markdown";
import { UIMessage } from "ai";

import { classNames } from "@/lib/utils/classNames";

interface MessageProps {
  message?: UIMessage;
  loading?: boolean;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message?.role === "user";
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
