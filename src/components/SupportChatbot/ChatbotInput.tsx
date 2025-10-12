"use client";

import React, { useState } from "react";
import { SendIcon } from "lucide-react";

interface ChatbotSupportInputProps {
  textareaRef: React.Ref<HTMLTextAreaElement>;
  onSubmit: (query: string) => void;
}

export const ChatbotInput: React.FC<ChatbotSupportInputProps> = ({
  textareaRef,
  onSubmit,
}) => {
  const [input, setInput] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.currentTarget.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const query = input.trim();
      if (!query) {
        return;
      }

      onSubmit(query);
      setInput("");
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    const query = input.trim();
    if (!query) {
      return;
    }

    onSubmit(query);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white px-2 py-4 absolute bottom-0 left-0 right-0"
    >
      <div className="flex items-start gap-2">
        <textarea
          ref={textareaRef}
          className=" transition-all flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary"
          value={input}
          rows={2}
          style={{ resize: 'none' }}
          placeholder="Escribe tu mensaje…"
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-primary h-9 w-9 rounded-full text-sm font-medium shadow-sm outline-none"
          aria-label="Enviar mensaje"
        >
          <SendIcon className="size-4 stroke-white" />
        </button>
      </div>
    </form>
  );
};
