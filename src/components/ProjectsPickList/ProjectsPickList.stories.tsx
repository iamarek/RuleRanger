import type { Meta, StoryObj } from "@storybook/react";
import ProjectsPickList from "./ProjectsPickList";

const meta: Meta<typeof ProjectsPickList> = {
  title: "UI/ProjectsPickList",
  component: ProjectsPickList,
};
export default meta;

type Story = StoryObj<typeof ProjectsPickList>;

export const Default: Story = {
  render: (args) => <ProjectsPickList {...args} />,
};

Default.args = {
  projects: [
    {
      folderPath: "/Users/arek/Desktop/test",
      folderName: "test",
      cursorRules: 0,
      projectName: "test",
      favicon: "https://www.google.com/favicon.ico",
    },
    {
      folderPath: "/Users/arek/Desktop/test2",
      folderName: "test2",
      cursorRules: 1,
      projectName: "test2",
      favicon: "https://www.google.com/favicon.ico",
    },
    {
      folderPath: "/Users/arek/Desktop/test3",
      folderName: "test3",
      cursorRules: 2,
      projectName: "test3",
      favicon: "https://www.google.com/favicon.ico",
    },
  ],
};
