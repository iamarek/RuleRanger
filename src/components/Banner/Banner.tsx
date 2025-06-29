import { PropsWithChildren } from "react";
import Heading from "../Heading/Heading";
import Text from "../Text/Text";

type BannerProps = PropsWithChildren<{
  title: string;
  description?: string;
}>;

const Banner = ({ children, title, description }: BannerProps) => {
  return (
    <div
      className="px-10 py-9 bg-cover bg-center min-h-[270px] mr-5 -mb-[110px]"
      style={{ backgroundImage: "url(/mesh-gradient.jpg)" }}
    >
      <Heading variant="h1">{title}</Heading>
      {description && (
        <Text size="medium" className="text-gray-medium mt-1">
          {description}
        </Text>
      )}
      {children}
    </div>
  );
};

export default Banner;
