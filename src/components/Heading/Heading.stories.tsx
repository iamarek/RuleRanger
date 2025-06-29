import type { Meta, StoryObj } from "@storybook/react";
import Heading from "./Heading";

const meta: Meta<typeof Heading> = {
  title: "UI/Heading",
  component: Heading,
};
export default meta;

type Story = StoryObj<typeof Heading>;

export const H1: Story = {
  render: () => <Heading variant="h1">Heading 1</Heading>,
};

export const H2: Story = {
  render: () => <Heading variant="h2">Heading 2</Heading>,
};

export const H3: Story = {
  render: () => <Heading variant="h3">Heading 3</Heading>,
};

export const H4: Story = {
  render: () => <Heading variant="h4">Heading 4</Heading>,
};
