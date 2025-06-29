import React, { PropsWithChildren } from "react";

export type HeadingProps = {
  variant: "h1" | "h2" | "h3" | "h4";
  className?: string;
};

const variantClasses: Record<HeadingProps["variant"], string> = {
  h1: "text-3xl font-semibold text-gray-dark",
  h2: "text-lg font-medium text-gray-dark",
  h3: "text-md font-semibold text-gray-dark",
  h4: "text-sm font-medium text-gray-dark",
};

const Heading: React.FC<PropsWithChildren<HeadingProps>> = ({
  variant,
  children,
  className,
}) => {
  const Tag = variant;
  return (
    <Tag
      className={`${variantClasses[variant]} ${className}`}
      tabIndex={0}
      aria-label={variant}
    >
      {children}
    </Tag>
  );
};

export default Heading;
