import { classNames } from "@/lib/utils/classNames";

export interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  defaultValue?: string;
  autoComplete?: string;
  error?: string;
  type?: string;
  required?: boolean;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  id,
  label,
  defaultValue,
  error,
  autoComplete,
  type = "text",
  required = false,
  ...props
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        defaultValue={defaultValue}
        placeholder={label}
        className={classNames([
          "peer block w-full bg-transparent text-white text-xs lg:text-base",
          "border-0 border-b border-white/60",
          "focus:border-white outline-none focus:ring-0",
          "placeholder-transparent caret-white",
          "pl-0 pt-4 pb-1",
          "transition-colors",
          error && "border-red-400"
        ])}
        {...props}
      />

      <label
        htmlFor={id}
        className={classNames([
          "pointer-events-none absolute left-0",
          "text-white/80 transition-all duration-200",
          "top-0 text-xs", // floated (default when not placeholder-shown or on focus)
          "peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm lg:peer-placeholder-shown:text-base peer-placeholder-shown:text-white/70", // when empty (placeholder shown) - sit on the baseline
          "font-bold peer-focus:top-0 peer-focus:text-xs peer-focus:text-white", // focus styles
        ])}
      >
        {label}
      </label>

      {error && (
        <div className="absolute bottom-[-18px] left-0">
          <p className="text-xs text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
};
