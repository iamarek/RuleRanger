import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import RadioGroup, { RadioOption } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const projectOptions: RadioOption[] = [
  {
    value: "scan",
    label: "Scan all the files on your Mac",
    description: "You will have to grant access to some parts of your Mac",
    labelSuffix: "Recommended",
  },
  {
    value: "select",
    label: "Select directory, where all your projects live",
    description: "You will have to grant access to some parts of your Mac",
  },
];

const Template = (args: any) => {
  const [selectedValue, setSelectedValue] = useState(
    args.value || projectOptions[0].value
  );

  return (
    <div className="w-full">
      <RadioGroup
        {...args}
        value={selectedValue}
        onChange={setSelectedValue}
        options={projectOptions}
      />
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    name: "project-setup",
    value: "scan",
  },
};

export const WithSecondSelected: Story = {
  render: Template,
  args: {
    name: "project-setup",
    value: "select",
  },
};

const simpleOptions: RadioOption[] = [
  {
    value: "option1",
    label: "Option 1",
  },
  {
    value: "option2",
    label: "Option 2",
  },
  {
    value: "option3",
    label: "Option 3",
  },
];

const SimpleTemplate = (args: any) => {
  const [selectedValue, setSelectedValue] = useState(
    args.value || simpleOptions[0].value
  );

  return (
    <div className="w-80">
      <RadioGroup
        {...args}
        value={selectedValue}
        onChange={setSelectedValue}
        options={simpleOptions}
      />
    </div>
  );
};

export const WithoutDescriptions: Story = {
  render: SimpleTemplate,
  args: {
    name: "simple-options",
    value: "option1",
  },
};
