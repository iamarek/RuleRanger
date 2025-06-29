import type { Meta, StoryObj } from "@storybook/react";
import TablerIcon, { TablerIconProps } from "./TablerIcon";
import { Icon123 } from "@tabler/icons-react";

const meta: Meta<typeof TablerIcon> = {
  title: "UI/TablerIcon",
  component: TablerIcon,
  argTypes: {
    size: {
      control: "select",
      options: ["small", "big"],
    },
    variant: {
      control: "select",
      options: ["light", "dark"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof TablerIcon>;

export const Default: Story = {
  args: {
    size: "big",
    variant: "light",
    icon: <Icon123 />,
  },
};

export const SmallLight: Story = {
  args: {
    size: "small",
    variant: "light",
    icon: <Icon123 />,
  },
};

export const SmallDark: Story = {
  args: {
    size: "small",
    variant: "dark",
    icon: <Icon123 />,
  },
};

export const BigLight: Story = {
  args: {
    size: "big",
    variant: "light",
    icon: <Icon123 />,
  },
};

export const BigDark: Story = {
  args: {
    size: "big",
    variant: "dark",
    icon: <Icon123 />,
  },
};
