import { PropsWithChildren } from "react";

export type TextSize = "tiny" | "small" | "medium" | "regular" | "large";

type TextProps = {
  span?: boolean;
  size?: TextSize;
  className?: string;
  color?: string;
};

const sizeClassMap: Record<TextSize, string> = {
  tiny: "text-[11px]",
  small: "text-xs",
  regular: "text-sm",
  medium: "text-base",
  large: "text-md",
};

const Text = ({
  children,
  span,
  size = "regular",
  color = "text-gray-medium",
  className,
}: PropsWithChildren<TextProps>) => {
  const textClassName = `${sizeClassMap[size]} ${color}`;
  if (span) {
    return <span className={`${textClassName} ${className}`}>{children}</span>;
  }
  return <p className={`${textClassName} ${className}`}>{children}</p>;
};

export default Text;
