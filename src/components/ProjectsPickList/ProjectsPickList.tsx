import { useState } from "react";
import { Project } from "../../main/main";
import ProjectRow from "./components/ProjectRow/ProjectRow";

type ProjectsPickListType = {
  projects: Project[];
  checkedProjects: Project[];
  setCheckedProjects: (projects: Project[]) => void;
};

const ProjectsPickList = ({
  projects,
  checkedProjects,
  setCheckedProjects,
}: ProjectsPickListType) => {
  console.log({ checkedProjects });
  return (
    <div className="flex flex-col">
      {projects?.map((project) => (
        <ProjectRow
          key={project.folderPath}
          project={project}
          onCheckboxClick={() => {
            if (checkedProjects.includes(project)) {
              setCheckedProjects(
                checkedProjects.filter(
                  (p) => p.folderPath !== project.folderPath
                )
              );
            } else {
              setCheckedProjects([...checkedProjects, project]);
            }
          }}
          checked={checkedProjects.includes(project)}
        />
      ))}
    </div>
  );
};

export default ProjectsPickList;
