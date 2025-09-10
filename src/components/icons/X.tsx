import React from "react";

interface IconProps {
  className?: string;
}

export const XIcon: React.FC<IconProps> = ({
  className = "fill-white size-5",
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  );
};
