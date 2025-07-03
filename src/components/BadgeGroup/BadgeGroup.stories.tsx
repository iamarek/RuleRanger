import type { Meta, StoryObj } from "@storybook/react";
import BadgeGroup from "./BadgeGroup";

const meta: Meta<typeof BadgeGroup> = {
  title: "UI/BadgeGroup",
  component: BadgeGroup,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary"],
    },
    showArrow: {
      control: "boolean",
    },
    onClick: {
      action: "clicked",
    },
  },
};
export default meta;

type Story = StoryObj<typeof BadgeGroup>;

export const Default: Story = {
  render: (args) => <BadgeGroup {...args} />,
};

Default.args = {
  variant: "default",
  showArrow: false,
  description: "New feature",
  label: "See documentation",
};

export const WithArrow: Story = {
  render: (args) => <BadgeGroup {...args} />,
};

WithArrow.args = {
  variant: "default",
  showArrow: true,
  description: "New feature",
  label: "See documentation",
  link: "/",
};

export const Primary: Story = {
  render: (args) => <BadgeGroup {...args} />,
};

Primary.args = {
  variant: "primary",
  showArrow: false,
  description: "New feature",
};
