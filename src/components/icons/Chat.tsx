import React from "react";

interface IconProps {
  className?: string;
}

export const ChatIcon: React.FC<IconProps> = ({
  className = "h-5 w-5 fill-white",
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-4.5A4 4 0 0 1 4 15V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z" />
    </svg>
  );
};
