import { PropsWithChildren, ReactElement, ReactNode } from "react";
import TablerIcon from "../TablerIcon/TablerIcon";

type ButtonTypes = {
  variant: "primary" | "secondary";
  size: "big" | "regular";
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  onClick?: () => void;
};

const Button = ({
  variant,
  size,
  iconLeft,
  iconRight,
  children,
  onClick,
}: PropsWithChildren<ButtonTypes>) => {
  const sizeClassMap: Record<ButtonTypes["size"], string> = {
    big: "px-5 py-3 text-base font-medium",
    regular: "px-4 py-2 text-sm font-medium",
  };

  const variantClassMap: Record<ButtonTypes["variant"], string> = {
    primary: "button-shadow bg-gray-darkest text-white rounded-lg",
    secondary:
      "button-shadow-light bg-white text-gray-darkest rounded-lg border border-gray-light",
  };

  return (
    <button
      className={` flex items-center gap-2 ${sizeClassMap[size]} ${variantClassMap[variant]}`}
      tabIndex={0}
      aria-label="button"
      onClick={onClick}
    >
      {iconLeft && (
        <TablerIcon
          icon={iconLeft}
          size="small"
          variant={variant === "primary" ? "dark" : "light"}
        />
      )}
      {children}
      {iconRight && (
        <TablerIcon
          icon={iconRight}
          size="small"
          variant={variant === "primary" ? "dark" : "light"}
        />
      )}
    </button>
  );
};

export default Button;
