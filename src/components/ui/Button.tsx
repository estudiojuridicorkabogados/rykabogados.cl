"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";

import { classNames } from "@/lib/utils/classNames";

const buttonStyles = cva(
  [
    "whitespace-nowrap cursor-pointer uppercase",
    "inline-flex items-center justify-center",
    "text-sm font-medium transition-all duration-300",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-gray-900 hover:text-white border border-gray-900",
        dark: "bg-gray-900 text-white hover:bg-white hover:text-gray-900 border border-gray-900",
        outline:
          "border border-gray-900 text-dark-900 bg-transparent hover:bg-gray-900 hover:text-white",
        "outline-primary":
          "border border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
        "outline-primary-glass":
          "border border-primary text-primary bg-white/30 hover:bg-primary hover:text-white",
        ["white-outline-on-primary"]:
          "border border-white/70 text-white bg-transparent hover:bg-white hover:text-primary",
        "reserva-form-link":
          "bg-white text-black hover:bg-accent border border-white hover:border-primary",
        whatsapp:
          "bg-transparent text-white hover:bg-green-700 hover:text-white border border-white/70 hover:border-green-700",
        "whatsapp-green":
          "bg-green-700 text-white hover:bg-green-800 hover:text-white border border-green-700 hover:border-green-800",
      },
      size: {
        default: "h-10 px-8 py-2 text-xs",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonStyles>;

export interface ButtonProps
  extends
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
    >,
    ButtonVariantProps {
  asChild?: boolean;
  animateOnClick?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  animateOnClick = false,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";

  if (Comp === "button" && animateOnClick) {
    return (
      <motion.button
        className={classNames(buttonStyles({ variant, size, className }))}
        initial={false}
        whileTap={{ scale: 0.95 }}
        {...props}
      />
    );
  }

  return (
    <Comp
      className={classNames(buttonStyles({ variant, size, className }))}
      {...props}
    />
  );
};
