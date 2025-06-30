import React from "react";
import Heading from "../Heading/Heading";
import Text from "../Text/Text";

export type RadioOption = {
  value: string;
  label: string;
  description?: string;
  labelSuffix?: string;
};

export type RadioGroupProps = {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  className?: string;
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  className = "",
}) => {
  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent, optionValue: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOptionClick(optionValue);
    }
  };

  return (
    <div
      className={`space-y-4 ${className}`}
      role="radiogroup"
      aria-label={name}
    >
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <div
            key={option.value}
            className={`
              relative flex items-start justify-between p-4 rounded-lg border cursor-pointer transition-all duration-200
              ${
                isSelected
                  ? "border-green-brand-dark bg-green-brand-light/20"
                  : "border-gray-lightest bg-white hover:border-green-brand-dark/50 hover:bg-green-brand-light/5"
              }
            `}
            onClick={() => handleOptionClick(option.value)}
            onKeyDown={(e) => handleKeyDown(e, option.value)}
            tabIndex={0}
            role="radio"
            aria-checked={isSelected}
            aria-label={option.label}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Heading variant="h3">{option.label}</Heading>
                {option.labelSuffix && (
                  <Text size="large" color="text-gray-medium">
                    ({option.labelSuffix})
                  </Text>
                )}
              </div>

              {option.description && (
                <div className="text-sm text-gray-normal mt-1">
                  {option.description}
                </div>
              )}
            </div>

            <div className="ml-4 flex-shrink-0">
              <div
                className={`
                  w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200
                  ${
                    isSelected
                      ? "border-green-brand-dark bg-green-brand-dark"
                      : "border-gray-light bg-white"
                  }
                `}
              >
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-green-brand-light"></div>
                )}
              </div>
            </div>

            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => handleOptionClick(option.value)}
              className="sr-only"
              aria-hidden="true"
            />
          </div>
        );
      })}
    </div>
  );
};

export default RadioGroup;
