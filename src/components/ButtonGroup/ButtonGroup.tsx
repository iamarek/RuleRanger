import React, { ReactElement } from "react";
import clsx from "clsx";

export type ButtonGroupVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonGroupSize = "sm" | "md" | "lg";
export type ButtonGroupColor =
  | "gray"
  | "brand"
  | "error"
  | "warning"
  | "success";

export interface ButtonGroupItem {
  id: string;
  text: string;
  icon?: ReactElement;
  disabled?: boolean;
  selected?: boolean;
}

export interface ButtonGroupProps {
  items: ButtonGroupItem[];
  variant?: ButtonGroupVariant;
  size?: ButtonGroupSize;
  color?: ButtonGroupColor;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  className?: string;
  onItemClick?: (itemId: string) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  items,
  variant = "outline",
  size = "md",
  color = "gray",
  orientation = "horizontal",
  disabled = false,
  className,
  onItemClick,
}) => {
  const baseClasses = clsx(
    "inline-flex",
    orientation === "horizontal" ? "flex-row" : "flex-col",
    className
  );

  const getVariantClasses = (
    variant: ButtonGroupVariant,
    color: ButtonGroupColor,
    isSelected: boolean,
    isDisabled: boolean
  ): string => {
    if (isDisabled) {
      return "bg-gray-50 text-gray-400 cursor-not-allowed";
    }

    const colorMap = {
      gray: {
        primary: isSelected
          ? "bg-gray-900 text-white"
          : "bg-gray-900 text-white hover:bg-gray-800",
        secondary: isSelected
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-100 text-gray-900 hover:bg-gray-200",
        outline: isSelected
          ? "bg-gray-50 text-gray-900 border-gray-300"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
        ghost: isSelected
          ? "bg-gray-100 text-gray-900"
          : "text-gray-700 hover:bg-gray-100",
      },
      brand: {
        primary: isSelected
          ? "bg-blue-600 text-white"
          : "bg-blue-600 text-white hover:bg-blue-700",
        secondary: isSelected
          ? "bg-blue-50 text-blue-700"
          : "bg-blue-50 text-blue-700 hover:bg-blue-100",
        outline: isSelected
          ? "bg-blue-50 text-blue-700 border-blue-300"
          : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50",
        ghost: isSelected
          ? "bg-blue-50 text-blue-700"
          : "text-blue-600 hover:bg-blue-50",
      },
      error: {
        primary: isSelected
          ? "bg-red-600 text-white"
          : "bg-red-600 text-white hover:bg-red-700",
        secondary: isSelected
          ? "bg-red-50 text-red-700"
          : "bg-red-50 text-red-700 hover:bg-red-100",
        outline: isSelected
          ? "bg-red-50 text-red-700 border-red-300"
          : "bg-white text-red-600 border-red-300 hover:bg-red-50",
        ghost: isSelected
          ? "bg-red-50 text-red-700"
          : "text-red-600 hover:bg-red-50",
      },
      warning: {
        primary: isSelected
          ? "bg-yellow-500 text-white"
          : "bg-yellow-500 text-white hover:bg-yellow-600",
        secondary: isSelected
          ? "bg-yellow-50 text-yellow-800"
          : "bg-yellow-50 text-yellow-800 hover:bg-yellow-100",
        outline: isSelected
          ? "bg-yellow-50 text-yellow-800 border-yellow-300"
          : "bg-white text-yellow-600 border-yellow-300 hover:bg-yellow-50",
        ghost: isSelected
          ? "bg-yellow-50 text-yellow-800"
          : "text-yellow-600 hover:bg-yellow-50",
      },
      success: {
        primary: isSelected
          ? "bg-green-600 text-white"
          : "bg-green-600 text-white hover:bg-green-700",
        secondary: isSelected
          ? "bg-green-50 text-green-700"
          : "bg-green-50 text-green-700 hover:bg-green-100",
        outline: isSelected
          ? "bg-green-50 text-green-700 border-green-300"
          : "bg-white text-green-600 border-green-300 hover:bg-green-50",
        ghost: isSelected
          ? "bg-green-50 text-green-700"
          : "text-green-600 hover:bg-green-50",
      },
    };

    return colorMap[color][variant];
  };

  const getSizeClasses = (size: ButtonGroupSize): string => {
    const sizeMap = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-4 py-2.5 text-base",
    };
    return sizeMap[size];
  };

  const getBorderClasses = (
    index: number,
    total: number,
    orientation: "horizontal" | "vertical"
  ): string => {
    if (variant === "ghost") return "";

    const baseBorder = variant === "outline" ? "border" : "";

    if (orientation === "horizontal") {
      if (total === 1) return `${baseBorder} rounded-lg`;
      if (index === 0) return `${baseBorder} rounded-l-lg border-r-0`;
      if (index === total - 1) return `${baseBorder} rounded-r-lg`;
      return `${baseBorder} border-r-0`;
    } else {
      if (total === 1) return `${baseBorder} rounded-lg`;
      if (index === 0) return `${baseBorder} rounded-t-lg border-b-0`;
      if (index === total - 1) return `${baseBorder} rounded-b-lg`;
      return `${baseBorder} border-b-0`;
    }
  };

  const handleItemClick = (itemId: string, itemDisabled?: boolean): void => {
    if (disabled || itemDisabled) return;
    onItemClick?.(itemId);
  };

  return (
    <div className={baseClasses} role="group">
      {items.map((item, index) => {
        const isDisabled = disabled || item.disabled;
        const buttonClasses = clsx(
          "inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
          getSizeClasses(size),
          getVariantClasses(variant, color, !!item.selected, !!isDisabled),
          getBorderClasses(index, items.length, orientation),
          isDisabled ? "cursor-not-allowed" : "cursor-pointer"
        );

        return (
          <button
            key={item.id}
            type="button"
            className={buttonClasses}
            onClick={() => handleItemClick(item.id, item.disabled)}
            disabled={isDisabled}
            aria-pressed={item.selected}
            tabIndex={isDisabled ? -1 : 0}
          >
            {item.icon && (
              <span className={item.text ? "mr-2" : ""}>
                {React.cloneElement(item.icon, {
                  size: size === "sm" ? 16 : size === "md" ? 18 : 20,
                })}
              </span>
            )}
            {item.text}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
