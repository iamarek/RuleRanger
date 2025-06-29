import { PropsWithChildren } from "react";

export type TextSize = "tiny" | "small" | "medium" | "regular";

type TextProps = {
  span?: boolean;
  size?: TextSize;
  className?: string;
};

const sizeClassMap: Record<TextSize, string> = {
  tiny: "text-[11px]",
  small: "text-xs",
  regular: "text-sm",
  medium: "text-base",
};

const Text = ({
  children,
  span,
  size = "regular",
  className,
}: PropsWithChildren<TextProps>) => {
  const textClassName = `${sizeClassMap[size]} text-gray-medium`;
  if (span) {
    return <span className={`${textClassName} ${className}`}>{children}</span>;
  }
  return <p className={`${textClassName} ${className}`}>{children}</p>;
};

export default Text;
