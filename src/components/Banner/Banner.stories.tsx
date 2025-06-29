import type { Meta, StoryObj } from "@storybook/react";
import Banner from "./Banner";

const meta: Meta<typeof Banner> = {
  title: "UI/Banner",
  component: Banner,
};
export default meta;

type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  render: (args) => <Banner {...args} />,
};

Default.args = {
  title: "Banner 1",
  description: "Banner 1 description",
};
