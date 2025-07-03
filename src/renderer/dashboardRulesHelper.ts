import { Project, DashboardRulesData } from "../preload/preload";

export const scanProjectsForRules = async (
  selectedProjects: Project[]
): Promise<DashboardRulesData | null> => {
  if (selectedProjects.length === 0) {
    throw new Error("No projects selected");
  }

  try {
    const result = await (window as any).api.scanCursorRules(selectedProjects);
    return result;
  } catch (error) {
    console.error("Error scanning cursor rules:", error);
    throw error;
  }
};

export const getDashboardRulesData = async (
  selectedProjects: Project[]
): Promise<{
  mostRecentlyUpdatedProject: {
    project: Project;
    lastRuleUpdate: Date;
  } | null;
  latestRules: Array<{
    name: string;
    project: Project;
    filePath: string;
    description: string | null;
    lastModified: Date;
  }>;
} | null> => {
  try {
    const data = await scanProjectsForRules(selectedProjects);

    if (!data) {
      return null;
    }

    return {
      mostRecentlyUpdatedProject: data.mostRecentlyUpdatedProject,
      latestRules: data.latestRules,
    };
  } catch (error) {
    console.error("Error getting dashboard rules data:", error);
    return null;
  }
};
