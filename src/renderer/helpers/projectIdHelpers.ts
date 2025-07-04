import { Project } from "../../preload/preload";

export const generateUniqueProjectId = (
  projectName: string | undefined,
  folderName: string,
  existingProjects: Project[]
): string => {
  const baseName = projectName || folderName;
  const existingIds = existingProjects.map((p) => p.id);

  let counter = 0;
  let candidateId = `${baseName}-${counter}`;

  while (existingIds.includes(candidateId)) {
    counter++;
    candidateId = `${baseName}-${counter}`;
  }

  return candidateId;
};

export const addUniqueIdToProject = (
  project: Omit<Project, "id">,
  existingProjects: Project[]
): Project => {
  return {
    ...project,
    id: generateUniqueProjectId(
      project.projectName,
      project.folderName,
      existingProjects
    ),
  };
};
