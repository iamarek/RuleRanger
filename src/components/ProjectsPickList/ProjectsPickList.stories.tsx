import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ProjectsPickList from "./ProjectsPickList";
import { Project } from "../../preload/preload";

const meta: Meta<typeof ProjectsPickList> = {
  title: "UI/ProjectsPickList",
  component: ProjectsPickList,
  decorators: [
    (Story, context) => {
      const [checkedProjects, setCheckedProjects] = useState<Project[]>([]);

      return (
        <Story
          {...context}
          args={{
            ...context.args,
            checkedProjects,
            setCheckedProjects,
          }}
        />
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof ProjectsPickList>;

export const Default: Story = {
  render: (args) => <ProjectsPickList {...args} />,
};

Default.args = {
  projects: [
    {
      id: "test-0",
      folderPath: "/Users/arek/Desktop/test",
      folderName: "test",
      cursorRules: 0,
      projectName: "test",
      favicon: "https://www.google.com/favicon.ico",
    },
    {
      id: "test2-0",
      folderPath: "/Users/arek/Desktop/test2",
      folderName: "test2",
      cursorRules: 1,
      projectName: "test2",
      favicon: "https://www.google.com/favicon.ico",
    },
    {
      id: "test3-0",
      folderPath: "/Users/arek/Desktop/test3",
      folderName: "test3",
      cursorRules: 2,
      projectName: "test3",
      favicon: "https://www.google.com/favicon.ico",
    },
  ],
};
