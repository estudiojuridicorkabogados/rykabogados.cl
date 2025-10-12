import { motion, Variants } from "framer-motion";
import Link from "next/link";

import { containerVariants } from "@/lib/utils/animations";
import { URLS } from "@/lib/utils/constants";

interface InitialBotMessageProps {
  open: boolean;
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const InitialBotMessage: React.FC<InitialBotMessageProps> = ({
  open,
}) => {
  if (!open) {
    return null;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div>
        <div className="flex flex-col items-start gap-2">
          <motion.div className="chatbot-msg agent-msg" variants={itemVariants}>
            ¡Hola! 👋 Soy el asistente virtual de RK Abogados. ¿En qué puedo asistirte hoy?
          </motion.div>

          <motion.div className="chatbot-msg agent-msg" variants={itemVariants}>
            O
            {" "}
            <a
              href={URLS.whatsapp()}
              target="_blank"
              rel="noreferrer"
              className="text-black underline font-medium hover:text-primary/80 cursor-pointer"
            >
              hablamos para whatsapp 📲
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
