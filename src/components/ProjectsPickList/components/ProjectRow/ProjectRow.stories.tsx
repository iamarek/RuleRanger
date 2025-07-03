import type { Meta, StoryObj } from "@storybook/react";
import ProjectRow from "./ProjectRow";

const meta: Meta<typeof ProjectRow> = {
  title: "UI/ProjectRow",
  component: ProjectRow,
};
export default meta;

type Story = StoryObj<typeof ProjectRow>;

export const Default: Story = {
  render: (args) => <ProjectRow {...args} />,
};

Default.args = {
  project: {
    folderName: "9admin",
    folderPath: "/Users/iamarek/Projects/9admin",
    favicon:
      "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAD6jh8A+o4fIfqOH2b6jh9k+o4fHvqOHwD7jx8AAAAAAPqOHwD6jh8b+o4fW/qOH1/6jh9P+o4fCPqOHwAAAAAA+o4fAPqOHxf6jh+2+o4f//qOH6X6jh8P+o4fAAAAAAD6jh8A+o4fSPqOH/X6jh/9+o4f0/qOHxb6jh8AAAAAAPqOHwD6jh8A+o4fKvqOH9H6jh/++o4fhPqOHwX6jh8A+o4fAPqOH0n6jh/5+o4f//qOH9f6jh8X+o4fAAAAAAD6jh8A+o4fAfqOHyj6jh+k+o4f//qOH/P6jh9c+o4fAPqOHwD6jh9J+o4f+fqOH//6jh/X+o4fF/qOHwAAAAAA+o4fAPqOH1X6jh/h+o4f//qOH//6jh//+o4f1/qOHyP6jh8A+o4fSfqOH/n6jh//+o4f1/qOHxf6jh8AAAAAAPqOHxf6jh/L+o4f//qOH7f6jh+N+o4f6vqOH//6jh9r+o4fAPqOH0n6jh/5+o4f//qOH9f6jh8X+o4fAAAAAAD6jh8r+o4f5fqOH/H6jh82+o4fAPqOH6T6jh//+o4fifqPIAH6jh9X+o4f+vqOH//6jh/a+o4fKPqOHxD6jh8F+o4fGvqOH9P6jh/++o4fivqOH1P6jh/W+o4f//qOH2v6jh9P+o4f3/qOH/76jh//+o4f+PqOH9b6jh/G+o4fOPuPIAD6jh98+o4f/PqOH/76jh/8+o4f//qOH9T6jh8h+o4fZPqOH//6jh//+o4f//qOH//6jh//+o4f8vqOH0T6jh8A+o4fDfqOH3X6jh/I+o4f1fqOH6v6jh85+o4fAPqOH0b6jh/I+o4f/fqOH//6jh/z+o4fuPqOH6j6jh8vAAAAAPqOHwD6jh8B+o4fDvqOHxT6jh8G+o4fAPqOHwD6jh8A+o4fTPqOH/n6jh//+o4f2PqOHxr6jh8C+o4fAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+o4fAPqOH0P6jh/3+o4f//qOH9/6jh8f+o4fAPqOHwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPqOHwD6jh8l+o4f4/qOH//6jh/6+o4fnfqOH3r6jh8tAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6jh8A+o4fA/qOH5D6jh//+o4f//qOH//6jh/y+o4fRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+48gAPqOHwD6jh8V+o4fk/qOH+v6jh/8+o4f6fqOHz4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+o4fAPqOHwf6jh85+o4fYfqOH0z6jh8Nh4MAAIODAADBgwAAgYMAAICDAAAAgwAACAAAAAAAAAAAAAAAgQAAAMOAAAD/ggAA/4AAAP+AAAD/wAAA/+AAAA==",
    projectName: "9admin-deploy",
    cursorRules: 10,
  },
};

export const EmptyRules: Story = {
  render: (args) => <ProjectRow {...args} />,
};

EmptyRules.args = {
  project: {
    folderName: "9admin",
    folderPath: "/Users/iamarek/Projects/9admin",
    favicon:
      "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAD6jh8A+o4fIfqOH2b6jh9k+o4fHvqOHwD7jx8AAAAAAPqOHwD6jh8b+o4fW/qOH1/6jh9P+o4fCPqOHwAAAAAA+o4fAPqOHxf6jh+2+o4f//qOH6X6jh8P+o4fAAAAAAD6jh8A+o4fSPqOH/X6jh/9+o4f0/qOHxb6jh8AAAAAAPqOHwD6jh8A+o4fKvqOH9H6jh/++o4fhPqOHwX6jh8A+o4fAPqOH0n6jh/5+o4f//qOH9f6jh8X+o4fAAAAAAD6jh8A+o4fAfqOHyj6jh+k+o4f//qOH/P6jh9c+o4fAPqOHwD6jh9J+o4f+fqOH//6jh/X+o4fF/qOHwAAAAAA+o4fAPqOH1X6jh/h+o4f//qOH//6jh//+o4f1/qOHyP6jh8A+o4fSfqOH/n6jh//+o4f1/qOHxf6jh8AAAAAAPqOHxf6jh/L+o4f//qOH7f6jh+N+o4f6vqOH//6jh9r+o4fAPqOH0n6jh/5+o4f//qOH9f6jh8X+o4fAAAAAAD6jh8r+o4f5fqOH/H6jh82+o4fAPqOH6T6jh//+o4fifqPIAH6jh9X+o4f+vqOH//6jh/a+o4fKPqOHxD6jh8F+o4fGvqOH9P6jh/++o4fivqOH1P6jh/W+o4f//qOH2v6jh9P+o4f3/qOH/76jh//+o4f+PqOH9b6jh/G+o4fOPuPIAD6jh98+o4f/PqOH/76jh/8+o4f//qOH9T6jh8h+o4fZPqOH//6jh//+o4f//qOH//6jh//+o4f8vqOH0T6jh8A+o4fDfqOH3X6jh/I+o4f1fqOH6v6jh85+o4fAPqOH0b6jh/I+o4f/fqOH//6jh/z+o4fuPqOH6j6jh8vAAAAAPqOHwD6jh8B+o4fDvqOHxT6jh8G+o4fAPqOHwD6jh8A+o4fTPqOH/n6jh//+o4f2PqOHxr6jh8C+o4fAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+o4fAPqOH0P6jh/3+o4f//qOH9/6jh8f+o4fAPqOHwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPqOHwD6jh8l+o4f4/qOH//6jh/6+o4fnfqOH3r6jh8tAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6jh8A+o4fA/qOH5D6jh//+o4f//qOH//6jh/y+o4fRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+48gAPqOHwD6jh8V+o4fk/qOH+v6jh/8+o4f6fqOHz4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+o4fAPqOHwf6jh85+o4fYfqOH0z6jh8Nh4MAAIODAADBgwAAgYMAAICDAAAAgwAACAAAAAAAAAAAAAAAgQAAAMOAAAD/ggAA/4AAAP+AAAD/wAAA/+AAAA==",
    projectName: "9admin-deploy",
    cursorRules: 0,
  },
};

export const NotStandardPath: Story = {
  render: (args) => <ProjectRow {...args} />,
};

NotStandardPath.args = {
  project: {
    folderName: "9admin",
    folderPath: "/Us123ers/iamarek/Projects/9admin",
    favicon:
      "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAD6jh8A+o4fIfqOH2b6jh9k+o4fHvqOHwD7jx8AAAAAAPqOHwD6jh8b+o4fW/qOH1/6jh9P+o4fCPqOHwAAAAAA+o4fAPqOHxf6jh+2+o4f//qOH6X6jh8P+o4fAAAAAAD6jh8A+o4fSPqOH/X6jh/9+o4f0/qOHxb6jh8AAAAAAPqOHwD6jh8A+o4fKvqOH9H6jh/++o4fhPqOHwX6jh8A+o4fAPqOH0n6jh/5+o4f//qOH9f6jh8X+o4fAAAAAAD6jh8A+o4fAfqOHyj6jh+k+o4f//qOH/P6jh9c+o4fAPqOHwD6jh9J+o4f+fqOH//6jh/X+o4fF/qOHwAAAAAA+o4fAPqOH1X6jh/h+o4f//qOH//6jh//+o4f1/qOHyP6jh8A+o4fSfqOH/n6jh//+o4f1/qOHxf6jh8AAAAAAPqOHxf6jh/L+o4f//qOH7f6jh+N+o4f6vqOH//6jh9r+o4fAPqOH0n6jh/5+o4f//qOH9f6jh8X+o4fAAAAAAD6jh8r+o4f5fqOH/H6jh82+o4fAPqOH6T6jh//+o4fifqPIAH6jh9X+o4f+vqOH//6jh/a+o4fKPqOHxD6jh8F+o4fGvqOH9P6jh/++o4fivqOH1P6jh/W+o4f//qOH2v6jh9P+o4f3/qOH/76jh//+o4f+PqOH9b6jh/G+o4fOPuPIAD6jh98+o4f/PqOH/76jh/8+o4f//qOH9T6jh8h+o4fZPqOH//6jh//+o4f//qOH//6jh//+o4f8vqOH0T6jh8A+o4fDfqOH3X6jh/I+o4f1fqOH6v6jh85+o4fAPqOH0b6jh/I+o4f/fqOH//6jh/z+o4fuPqOH6j6jh8vAAAAAPqOHwD6jh8B+o4fDvqOHxT6jh8G+o4fAPqOHwD6jh8A+o4fTPqOH/n6jh//+o4f2PqOHxr6jh8C+o4fAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+o4fAPqOH0P6jh/3+o4f//qOH9/6jh8f+o4fAPqOHwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPqOHwD6jh8l+o4f4/qOH//6jh/6+o4fnfqOH3r6jh8tAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6jh8A+o4fA/qOH5D6jh//+o4f//qOH//6jh/y+o4fRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+48gAPqOHwD6jh8V+o4fk/qOH+v6jh/8+o4f6fqOHz4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+o4fAPqOHwf6jh85+o4fYfqOH0z6jh8Nh4MAAIODAADBgwAAgYMAAICDAAAAgwAACAAAAAAAAAAAAAAAgQAAAMOAAAD/ggAA/4AAAP+AAAD/wAAA/+AAAA==",
    projectName: "9admin-deploy",
    cursorRules: 0,
  },
};
