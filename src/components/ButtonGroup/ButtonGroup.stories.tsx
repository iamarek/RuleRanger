import type { Meta, StoryObj } from "@storybook/react";
import ButtonGroup from "./ButtonGroup";
import {
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconBold,
  IconItalic,
  IconUnderline,
  IconList,
  IconLayoutGrid,
  IconMap,
  IconDownload,
  IconShare,
  IconCopy,
  IconEye,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";

const meta: Meta<typeof ButtonGroup> = {
  title: "UI/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    color: {
      control: "select",
      options: ["gray", "brand", "error", "warning", "success"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: "1", text: "Button 1" },
      { id: "2", text: "Button 2" },
      { id: "3", text: "Button 3" },
    ],
    variant: "outline",
    size: "md",
    color: "gray",
    orientation: "horizontal",
    disabled: false,
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { id: "left", text: "Left", icon: <IconAlignLeft /> },
      { id: "center", text: "Center", icon: <IconAlignCenter /> },
      { id: "right", text: "Right", icon: <IconAlignRight /> },
    ],
    variant: "outline",
    size: "md",
    color: "gray",
  },
};

export const IconOnly: Story = {
  args: {
    items: [
      { id: "bold", text: "", icon: <IconBold /> },
      { id: "italic", text: "", icon: <IconItalic /> },
      { id: "underline", text: "", icon: <IconUnderline /> },
    ],
    variant: "outline",
    size: "md",
    color: "gray",
  },
};

export const TextFormatting: Story = {
  args: {
    items: [
      { id: "bold", text: "Bold", icon: <IconBold /> },
      { id: "italic", text: "Italic", icon: <IconItalic /> },
      { id: "underline", text: "Underline", icon: <IconUnderline /> },
    ],
    variant: "outline",
    size: "md",
    color: "gray",
  },
};

export const ViewModes: Story = {
  args: {
    items: [
      { id: "list", text: "List", icon: <IconList /> },
      { id: "grid", text: "Grid", icon: <IconLayoutGrid /> },
      { id: "map", text: "Map", icon: <IconMap /> },
    ],
    variant: "outline",
    size: "md",
    color: "gray",
  },
};

export const Actions: Story = {
  args: {
    items: [
      { id: "download", text: "Download", icon: <IconDownload /> },
      { id: "share", text: "Share", icon: <IconShare /> },
      { id: "copy", text: "Copy", icon: <IconCopy /> },
    ],
    variant: "secondary",
    size: "md",
    color: "brand",
  },
};

export const CrudActions: Story = {
  args: {
    items: [
      { id: "view", text: "View", icon: <IconEye /> },
      { id: "edit", text: "Edit", icon: <IconEdit /> },
      { id: "delete", text: "Delete", icon: <IconTrash /> },
    ],
    variant: "outline",
    size: "sm",
    color: "gray",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Primary</h3>
        <ButtonGroup
          items={[
            { id: "1", text: "Button 1" },
            { id: "2", text: "Button 2" },
            { id: "3", text: "Button 3" },
          ]}
          variant="primary"
          color="brand"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Secondary</h3>
        <ButtonGroup
          items={[
            { id: "1", text: "Button 1" },
            { id: "2", text: "Button 2" },
            { id: "3", text: "Button 3" },
          ]}
          variant="secondary"
          color="brand"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Outline</h3>
        <ButtonGroup
          items={[
            { id: "1", text: "Button 1" },
            { id: "2", text: "Button 2" },
            { id: "3", text: "Button 3" },
          ]}
          variant="outline"
          color="gray"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Ghost</h3>
        <ButtonGroup
          items={[
            { id: "1", text: "Button 1" },
            { id: "2", text: "Button 2" },
            { id: "3", text: "Button 3" },
          ]}
          variant="ghost"
          color="gray"
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Small</h3>
        <ButtonGroup
          items={[
            { id: "1", text: "Button 1" },
            { id: "2", text: "Button 2" },
            { id: "3", text: "Button 3" },
          ]}
          size="sm"
          variant="outline"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Medium</h3>
        <ButtonGroup
          items={[
            { id: "1", text: "Button 1" },
            { id: "2", text: "Button 2" },
            { id: "3", text: "Button 3" },
          ]}
          size="md"
          variant="outline"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Large</h3>
        <ButtonGroup
          items={[
            { id: "1", text: "Button 1" },
            { id: "2", text: "Button 2" },
            { id: "3", text: "Button 3" },
          ]}
          size="lg"
          variant="outline"
        />
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Gray</h3>
        <ButtonGroup
          items={[
            { id: "1", text: "Button 1" },
            { id: "2", text: "Button 2", selected: true },
            { id: "3", text: "Button 3" },
          ]}
          variant="outline"
          color="gray"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Brand</h3>
        <ButtonGroup
          items={[
            { id: "1", text: "Button 1" },
            { id: "2", text: "Button 2", selected: true },
            { id: "3", text: "Button 3" },
          ]}
          variant="outline"
          color="brand"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Success</h3>
        <ButtonGroup
          items={[
            { id: "1", text: "Button 1" },
            { id: "2", text: "Button 2", selected: true },
            { id: "3", text: "Button 3" },
          ]}
          variant="outline"
          color="success"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Warning</h3>
        <ButtonGroup
          items={[
            { id: "1", text: "Button 1" },
            { id: "2", text: "Button 2", selected: true },
            { id: "3", text: "Button 3" },
          ]}
          variant="outline"
          color="warning"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Error</h3>
        <ButtonGroup
          items={[
            { id: "1", text: "Button 1" },
            { id: "2", text: "Button 2", selected: true },
            { id: "3", text: "Button 3" },
          ]}
          variant="outline"
          color="error"
        />
      </div>
    </div>
  ),
};

export const WithSelection: Story = {
  args: {
    items: [
      { id: "1", text: "Option 1", selected: false },
      { id: "2", text: "Option 2", selected: true },
      { id: "3", text: "Option 3", selected: false },
    ],
    variant: "outline",
    size: "md",
    color: "brand",
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { id: "1", text: "Available" },
      { id: "2", text: "Disabled", disabled: true },
      { id: "3", text: "Available" },
    ],
    variant: "outline",
    size: "md",
    color: "gray",
  },
};

export const DisabledGroup: Story = {
  args: {
    items: [
      { id: "1", text: "Button 1" },
      { id: "2", text: "Button 2" },
      { id: "3", text: "Button 3" },
    ],
    variant: "outline",
    size: "md",
    color: "gray",
    disabled: true,
  },
};

export const Vertical: Story = {
  args: {
    items: [
      { id: "1", text: "Top Option", icon: <IconAlignLeft /> },
      { id: "2", text: "Middle Option", icon: <IconAlignCenter /> },
      { id: "3", text: "Bottom Option", icon: <IconAlignRight /> },
    ],
    variant: "outline",
    size: "md",
    color: "gray",
    orientation: "vertical",
  },
};

export const Interactive: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState("center");

    const items = [
      {
        id: "left",
        text: "Left",
        icon: <IconAlignLeft />,
        selected: selectedId === "left",
      },
      {
        id: "center",
        text: "Center",
        icon: <IconAlignCenter />,
        selected: selectedId === "center",
      },
      {
        id: "right",
        text: "Right",
        icon: <IconAlignRight />,
        selected: selectedId === "right",
      },
    ];

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Text Alignment
          </h3>
          <ButtonGroup
            items={items}
            variant="outline"
            size="md"
            color="brand"
            onItemClick={setSelectedId}
          />
        </div>
        <div className="text-sm text-gray-600">Selected: {selectedId}</div>
      </div>
    );
  },
};

export const MultipleGroups: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Text Formatting
        </h3>
        <ButtonGroup
          items={[
            { id: "bold", text: "", icon: <IconBold /> },
            { id: "italic", text: "", icon: <IconItalic /> },
            { id: "underline", text: "", icon: <IconUnderline /> },
          ]}
          variant="outline"
          size="sm"
          color="gray"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Text Alignment
        </h3>
        <ButtonGroup
          items={[
            { id: "left", text: "", icon: <IconAlignLeft /> },
            { id: "center", text: "", icon: <IconAlignCenter /> },
            { id: "right", text: "", icon: <IconAlignRight /> },
          ]}
          variant="outline"
          size="sm"
          color="gray"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">View Options</h3>
        <ButtonGroup
          items={[
            { id: "list", text: "List", icon: <IconList /> },
            {
              id: "grid",
              text: "Grid",
              icon: <IconLayoutGrid />,
              selected: true,
            },
            { id: "map", text: "Map", icon: <IconMap /> },
          ]}
          variant="secondary"
          size="md"
          color="brand"
        />
      </div>
    </div>
  ),
};
