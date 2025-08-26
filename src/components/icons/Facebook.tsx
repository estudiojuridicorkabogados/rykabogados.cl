import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const FacebookIcon: React.FC<IconProps> = ({
  className = "fill-white",
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.31899 4.69436C17.4077 -8.95697 38.5295 10.09 26.3498 24.5575C13.3595 39.9869 -9.57089 19.1783 4.31899 4.69436ZM19.912 5.3153H15.5827C15.3508 5.3153 13.9288 6.10324 13.6757 6.33609C13.1674 6.80415 12.1905 8.79634 12.1905 9.42199V13.0583H8.91537V16.8121H12.1905V26.1968H16.0512L16.4026 25.844V16.8121L19.3404 16.5911L19.912 13.0583H16.4026V9.6572C16.4026 8.76342 19.2069 8.35886 19.912 8.60112V5.3153Z" />
    </svg>
  );
};
