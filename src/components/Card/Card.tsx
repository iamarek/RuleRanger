import { PropsWithChildren } from "react";

const Card = ({ children }: PropsWithChildren) => (
  <div className="shadow-card py-5 px-6 rounded-xl bg-white">{children}</div>
);

export default Card;
