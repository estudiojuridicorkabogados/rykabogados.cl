"use client";

import { forwardRef, useEffect, useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { classNames } from "@/lib/utils/classNames";

interface SelectInputProps {
  label: string;
  options: { id: string | number; label: string }[];
  error?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string; // for uncontrolled usage
  onChange?: (value: string) => void;
  onBlur?: () => void;
  name?: string;
}

export const SelectInput = forwardRef<HTMLButtonElement, SelectInputProps>(
  (
    {
      label,
      options,
      error,
      defaultValue,
      placeholder = "Selecciona una opción",
      value,
      onChange,
      name,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string | undefined>(
      value ?? defaultValue
    );

    useEffect(() => {
      if (value !== undefined) setInternalValue(value);
    }, [value]);

    const handleChange = (v: string) => {
      setInternalValue(v);
      onChange?.(v);
    };

    // Find the selected option based on the current value
    const selectedOption = options.find((option) => option.id === value);

    return (
      <div className="w-full">
        <Listbox value={internalValue} onChange={handleChange}>
          {name ? (
            <input type="hidden" name={name} value={internalValue ?? ""} />
          ) : null}

          <div className="w-full">
            <Label className="font-bold text-white/80 text-base pt-2">
              {label}
            </Label>
            <div className="relative mt-2">
              <ListboxButton
                ref={ref}
                className={classNames([
                  "grid w-full cursor-default grid-cols-1 py-1.5 pr-2 pl-3 text-left text-white text-base",
                  "bg-transparent border-0 border-b border-white/60",
                  "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/80",
                  error &&
                    "border-red-400 focus:ring-red-400/20 focus:border-red-400",
                ])}
              >
                <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                  <span className="block truncate text-white/80">
                    {selectedOption ? selectedOption.label : placeholder}
                  </span>
                </span>
                <ChevronsUpDownIcon
                  aria-hidden="true"
                  className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                />
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base outline-0 -outline-offset-1 outline-white/10 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0"
              >
                {options.map((option) => (
                  <ListboxOption
                    key={option.id}
                    value={option.id}
                    className="cursor-pointer group relative py-2 pr-9 pl-3 text-white/80 select-none data-focus:outline-hidden hover:bg-accent hover:text-primary"
                  >
                    <div className="flex items-center">
                      <span className="block font-normal group-data-selected:font-semibold">
                        {option.label}
                      </span>
                    </div>

                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 group-not-data-selected:hidden group-data-focus:text-white">
                      <CheckIcon
                        aria-hidden="true"
                        className="size-5 stroke-accent"
                      />
                    </span>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>

            {error && (
              <div className="absolute bottom-[-18px] left-0">
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}
          </div>
        </Listbox>
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";
