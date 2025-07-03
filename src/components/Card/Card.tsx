import { PropsWithChildren } from "react";

const Card = ({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) => (
  <div
    className={`shadow-card pt-5 pb-8 px-6 rounded-xl bg-white mb-6 ${className}`}
  >
    {children}
  </div>
);

export default Card;
