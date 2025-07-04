import { Project } from "../../../../main/main";
import Text from "../../../Text/Text";
import { splitUserPath } from "./helpers";
import BadgeGroup from "../../../BadgeGroup/BadgeGroup";
import { Checkbox } from "../../../Checkbox/Checkbox";

type ProjectRowType = {
  project: Project;
  onCheckboxClick: () => void;
  checked: boolean;
};

const ProjectRow = ({ project, onCheckboxClick, checked }: ProjectRowType) => {
  const [userName, projectPath] = splitUserPath(project.folderPath);

  return (
    <div
      className="flex items-center gap-4 cursor-pointer group border-b border-gray-light  p-6 hover:bg-gray-50/50"
      onClick={onCheckboxClick}
    >
      <div className="rounded-md p-1 -m-1 transition-colors duration-200">
        <Checkbox checked={checked} />
      </div>
      <div className="flex items-center justify-between flex-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {project.favicon && (
              <img
                src={project.favicon}
                alt="Project favicon"
                className="w-4 h-4"
                onError={(e) => {
                  console.error(
                    "Failed to load favicon for project:",
                    project.folderName
                  );
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
            <Text
              size="regular"
              color={
                checked
                  ? "text-gray-dark"
                  : "text-gray-dark/60 group-hover:text-gray-dark/75"
              }
            >
              {project.projectName || project.folderName}
            </Text>
          </div>
          <Text
            size="small"
            color="text-gray-normal"
            className="flex items-center gap-[2px]"
          >
            {userName ? "..." : ""}
            {projectPath}
          </Text>
        </div>
        <div>
          <BadgeGroup
            variant="default"
            description={
              project.cursorRules > 0 ? "Existing rules" : "No rules found"
            }
            label={
              project.cursorRules > 0 ? `${project.cursorRules}` : undefined
            }
            disabled={project.cursorRules === 0}
            condensed
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectRow;
