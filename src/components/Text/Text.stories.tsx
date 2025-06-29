import type { Meta, StoryObj } from "@storybook/react";
import Text from "./Text";

const meta: Meta<typeof Text> = {
  title: "UI/Text",
  component: Text,
  argTypes: {
    size: {
      options: ["tiny", "small", "regular", "medium"],
      control: {
        type: "select",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Text>;

export const Paragraph: Story = {
  render: (args) => <Text {...args}>Paragraph</Text>,
};

export const Span: Story = {
  render: (args) => (
    <Text {...args} span>
      Span
    </Text>
  ),
};
