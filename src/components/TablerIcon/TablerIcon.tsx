import React, { ReactElement } from "react";

export type TablerIconSize = "tiny" | "small" | "big";
export type TablerIconVariant = "light" | "dark";

export type TablerIconProps = {
  size?: TablerIconSize;
  variant?: TablerIconVariant;
  icon: ReactElement;
};

const sizeMap: Record<TablerIconSize, number> = {
  tiny: 14,
  small: 18,
  big: 24,
};

const colorMap: Record<TablerIconVariant, string> = {
  light: "#A5A5A6",
  dark: "#fff",
};

const TablerIcon: React.FC<TablerIconProps> = ({
  size = "big",
  variant = "light",
  icon,
}) => {
  const iconProps = {
    width: sizeMap[size],
    height: sizeMap[size],
    color: colorMap[variant],
    strokeWidth: 1.5,
    "aria-hidden": true,
    focusable: false,
  };

  return React.cloneElement(icon, iconProps);
};

export default TablerIcon;
