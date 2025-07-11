import type { Meta, StoryObj } from "@storybook/react";
import Link from "./Link";

const meta: Meta<typeof Link> = {
  title: "UI/Link",
  component: Link,
};
export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  render: () => <Link to="">Link 1</Link>,
};
