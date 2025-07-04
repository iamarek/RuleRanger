import { FC } from "react";

const Header: FC<{ content?: React.ReactNode }> = ({ content }) => (
  <div
    tabIndex={0}
    aria-label="Header"
    className="flex items-center justify-end gap-4 h-full pr-5"
  >
    {content}
  </div>
);

export default Header;
