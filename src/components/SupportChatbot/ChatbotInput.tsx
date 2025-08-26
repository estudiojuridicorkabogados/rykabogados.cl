"use client";

import { SendIcon } from "lucide-react";
import React, { useState } from "react";

interface ChatbotSupportInputProps {
  onSubmit: (query: string) => void;
}

export const ChatbotInput: React.FC<ChatbotSupportInputProps> = ({
  onSubmit,
}) => {
  const [input, setInput] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      className="border-t border-primary-dark px-2 py-4"
    >
      <div className="flex items-center gap-2">
        <input
          className="flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none text-gray-900 placeholder:text-gray-500 focus:ring-1 focus:ring-primary"
          value={input}
          placeholder="Escribe tu mensaje…"
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-primary h-9 w-9 rounded-full text-sm font-medium shadow-sm outline-none"
          aria-label="Enviar mensaje"
        >
          <SendIcon className="size-4 stroke-accent" />
        </button>
      </div>
    </form>
  );
};
