interface LongArrowRightProps {
  className?: string;
}

export const LongArrowRight: React.FC<LongArrowRightProps> = ({
  className = "stroke-current",
}) => (
  <svg
    width="58"
    height="10"
    viewBox="0 0 58 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M0 4.95214H57M57 4.95214L53.7347 1M57 4.95214L53.7347 9"
    />
  </svg>
);
