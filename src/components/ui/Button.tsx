import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { classNames } from "@/utils/classNames";

const buttonStyles = cva(
  [
    "whitespace-nowrap cursor-pointer",
    "inline-flex items-center justify-center",
    "text-sm font-medium transition-colors duration-300",
    // "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-gray-900 hover:text-white border-2 border-gray-900",
        dark:
          "bg-red-700 text-white hover:bg-red-800 focus-visible:ring-red-300",
        outline:
          "border border-gray-900 text-dark-900 bg-white hover:bg-gray-900 hover:text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
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

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={classNames(buttonStyles({ variant, size, className }))}
      {...props}
    />
  );
};
