import React from "react";
import TablerIcon from "../TablerIcon/TablerIcon";
import { IconCheck } from "@tabler/icons-react";

interface CheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  "aria-label"?: string;
  parentHover?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  disabled = false,
  id,
  "aria-label": ariaLabel,
  parentHover = false,
}) => {
  const handleClick = (): void => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      id={id}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        inline-flex items-center justify-center
        w-6 h-6
        border
        rounded-lg 
        cursor-pointer
        transition-all duration-200
        ${
          checked
            ? "border-green-brand-dark bg-green-brand-lightest group-hover:border-green-brand-dark"
            : "border-gray-300 bg-white group-hover:border-gray-400 group-hover:bg-gray-50 group-hover:shadow-md/05"
        }
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:border-green-brand-dark"
        }
        focus:outline-none focus:ring-2 focus:ring-green-brand-light focus:ring-offset-2
      `}
    >
      {checked && (
        <TablerIcon
          size="small"
          variant="light"
          color="#297F47"
          icon={<IconCheck />}
        />
      )}
    </div>
  );
};
