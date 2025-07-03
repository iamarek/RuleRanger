import { PropsWithChildren } from "react";
import Heading from "../Heading/Heading";
import Text from "../Text/Text";

type BannerProps = PropsWithChildren<{
  title: string;
  description?: string;
  offset?: boolean;
}>;

const Banner = ({
  children,
  title,
  description,
  offset = true,
}: BannerProps) => {
  return (
    <div
      className={`px-10 py-9 bg-cover bg-center min-h-[270px] mr-5 ${
        offset ? "-mb-[140px]" : ""
      }`}
      style={{ backgroundImage: "url(/mesh-gradient.jpg)" }}
    >
      <Heading variant="h1">{title}</Heading>
      {description && (
        <Text size="medium" className="text-gray-medium mt-1">
          {description}
        </Text>
      )}
      <div className={offset ? "" : "mt-8"}>{children}</div>
    </div>
  );
};

export default Banner;
