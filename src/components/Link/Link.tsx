import { PropsWithChildren, ReactNode } from "react";
import { NavLink } from "react-router-dom";

type LinkProps = {
  to: string;
  icon?: ReactNode;
  className?: string;
  tabIndex?: number;
  "aria-label"?: string;
  [key: string]: any;
};

const Link = ({
  to,
  icon,
  children,
  className = "",
  tabIndex,
  "aria-label": ariaLabel,
  ...rest
}: PropsWithChildren<LinkProps>) => {
  return (
    <NavLink
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${className}`}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      {...rest}
    >
      {icon && <span>{icon}</span>}
      {children}
    </NavLink>
  );
};

export default Link;
