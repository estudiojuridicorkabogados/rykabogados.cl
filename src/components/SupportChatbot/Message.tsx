import { UIMessage } from "ai";

import { classNames } from "@/lib/utils/classNames";

interface MessageProps {
  message: UIMessage;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === "user";
  const text = message.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("")
    .trim();

  if (!text) return null;

  return (
    <div
      key={message.id}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={classNames(
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm",
          {
            "bg-primary text-white rounded-br-md": isUser,
            "bg-white text-gray-900 border border-gray-200 rounded-bl-md":
              !isUser,
          }
        )}
      >
        {text}
      </div>
    </div>
  );
};
