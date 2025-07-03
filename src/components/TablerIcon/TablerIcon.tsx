import React, { ReactElement } from "react";

export type TablerIconSize = "tiny" | "small" | "big";
export type TablerIconVariant = "light" | "dark" | "medium";

export type TablerIconProps = {
  size?: TablerIconSize;
  variant?: TablerIconVariant;
  icon: ReactElement;
  color?: string;
};

const sizeMap: Record<TablerIconSize, number> = {
  tiny: 14,
  small: 18,
  big: 24,
};

const colorMap: Record<TablerIconVariant, string> = {
  dark: "#717680",
  medium: "#A5A5A6",
  light: "#fff",
};

const TablerIcon: React.FC<TablerIconProps> = ({
  size = "big",
  variant = "medium",
  icon,
  color,
}) => {
  const iconProps = {
    width: sizeMap[size],
    height: sizeMap[size],
    color: color || colorMap[variant],
    strokeWidth: 1.5,
    "aria-hidden": true,
    focusable: false,
  };

  return React.cloneElement(icon, iconProps);
};

export default TablerIcon;
