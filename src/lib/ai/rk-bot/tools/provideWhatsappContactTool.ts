import { tool } from "ai";
import { z } from "zod";

export const provideWhatsappContactTool = tool({
  description: `Provide the WhatsApp contact number for the user to chat with us.`,
  inputSchema: z.object({}),
  execute: async () => {
    return {
      whatsappNumber: "+56 9 8639 5780",
    };
  },
});
