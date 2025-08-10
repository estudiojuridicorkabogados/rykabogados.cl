"use client";

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
      className="border-t border-gray-200 px-2 py-4 bg-[red]"
    >
      <div className="flex items-center gap-2">
        <input
          className="flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none text-gray-900 placeholder:text-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          value={input}
          placeholder="Type your message…"
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </form>
  );
};
