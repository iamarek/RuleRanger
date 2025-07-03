import { PropsWithChildren, ReactElement } from "react";
import TablerIcon from "../TablerIcon/TablerIcon";
import Text from "../Text/Text";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";

type BadgeGroupProps = {
  variant?: "default" | "primary";
  showArrow?: boolean;
  onClick?: () => void;
  description: string;
  label?: string;
  link?: string;
  disabled?: boolean;
  condensed?: boolean;
};

const PilContentWrapper = ({
  children,
  link,
  label,
  className,
  disabled,
}: PropsWithChildren<{
  link?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
}>): ReactElement => {
  return link && !disabled ? (
    <Link
      to={link}
      tabIndex={0}
      role="button"
      aria-label={label}
      className={className}
    >
      {children}
    </Link>
  ) : (
    <span
      className={`${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      aria-disabled={disabled}
    >
      {children}
    </span>
  );
};

const BadgeGroup = ({
  variant = "default",
  showArrow = false,
  description,
  label,
  link,
  disabled,
  condensed,
}: PropsWithChildren<BadgeGroupProps>): ReactElement => {
  const variantClassMap: Record<
    NonNullable<BadgeGroupProps["variant"]>,
    string
  > = {
    default: "bg-gray-50 text-gray-700 border border-gray-200",
    primary: "bg-blue-50 text-blue-700 border border-blue-200",
  };

  return (
    <div
      className={`flex gap-1 bg-gray-50 inline-flex items-center justify-between rounded-xl p-1 ${
        label ? "pl-3" : "px-3"
      } ${condensed ? "gap-2" : "gap-14"}`}
    >
      <Text
        size="small"
        color={disabled ? "text-gray-medium/60" : "text-gray-darkest"}
        span
      >
        {description}
      </Text>
      {label && (
        <PilContentWrapper
          className={`inline-flex items-center gap-2 px-3 py-[2px] rounded-full ${
            variantClassMap[variant]
          } ${link ? "cursor-pointer hover:bg-white transition-opacity" : ""}`}
          label={label}
          link={link}
          disabled={disabled}
        >
          <Text size="small" color="text-gray-darkest">
            {label}
          </Text>
          {showArrow && (
            <TablerIcon icon={<IconArrowRight />} size="tiny" variant="dark" />
          )}
        </PilContentWrapper>
      )}
    </div>
  );
};

export default BadgeGroup;
