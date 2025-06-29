import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { Icon123, IconDoorEnter } from "@tabler/icons-react";
import TablerIcon from "../TablerIcon/TablerIcon";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
    size: {
      control: "select",
      options: ["big", "regular"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => <Button {...args}>Button default</Button>,
};

Default.args = {
  variant: "primary",
  size: "regular",
};

export const Regular: Story = {
  render: () => (
    <Button variant="primary" size="regular">
      Button regular
    </Button>
  ),
};

export const Big: Story = {
  render: () => (
    <Button variant="primary" size="big">
      Button big
    </Button>
  ),
};

export const IconLeft: Story = {
  render: (args) => <Button {...args}>Button regular</Button>,
};

IconLeft.args = {
  variant: "primary",
  size: "regular",
  iconLeft: <Icon123 />,
};

export const IconRight: Story = {
  render: (args) => <Button {...args}>Button big</Button>,
};

IconRight.args = {
  variant: "primary",
  size: "big",
  iconRight: <IconDoorEnter />,
};

export const Secondary: Story = {
  render: (args) => <Button {...args}>Button secondary</Button>,
};

Secondary.args = {
  variant: "secondary",
  size: "regular",
};
