import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    onChange: {
      action: "changed",
      description: "Callback function when checkbox state changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const CheckboxWrapper = ({ checked: initialChecked, ...args }: any) => {
  const [checked, setChecked] = useState(initialChecked);

  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
};

export const Default: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    checked: false,
    disabled: false,
    "aria-label": "Default checkbox",
  },
};

export const Checked: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    checked: true,
    disabled: false,
    "aria-label": "Checked checkbox",
  },
};

export const Disabled: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    checked: false,
    disabled: true,
    "aria-label": "Disabled checkbox",
  },
};

export const DisabledChecked: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    checked: true,
    disabled: true,
    "aria-label": "Disabled checked checkbox",
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={checked}
            onChange={setChecked}
            id="interactive-checkbox"
            aria-label="Interactive checkbox"
          />
          <label
            htmlFor="interactive-checkbox"
            className="text-sm font-medium cursor-pointer"
          >
            {checked ? "Checked" : "Unchecked"}
          </label>
        </div>
        <p className="text-sm text-gray-600">
          Click the checkbox or label to toggle state
        </p>
      </div>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [options, setOptions] = useState({
      option1: false,
      option2: true,
      option3: false,
    });

    const handleChange = (key: keyof typeof options) => (checked: boolean) => {
      setOptions((prev) => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="flex flex-col space-y-3">
        <h3 className="text-lg font-semibold">Select options:</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={options.option1}
            onChange={handleChange("option1")}
            id="option1"
            aria-label="Option 1"
          />
          <label htmlFor="option1" className="text-sm cursor-pointer">
            Option 1
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={options.option2}
            onChange={handleChange("option2")}
            id="option2"
            aria-label="Option 2"
          />
          <label htmlFor="option2" className="text-sm cursor-pointer">
            Option 2 (initially checked)
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={options.option3}
            onChange={handleChange("option3")}
            id="option3"
            aria-label="Option 3"
          />
          <label htmlFor="option3" className="text-sm cursor-pointer">
            Option 3
          </label>
        </div>
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-sm">
            Selected:{" "}
            {Object.entries(options)
              .filter(([, checked]) => checked)
              .map(([key]) => key)
              .join(", ") || "None"}
          </p>
        </div>
      </div>
    );
  },
};
