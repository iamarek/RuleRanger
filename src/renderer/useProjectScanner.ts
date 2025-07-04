import { useState, useCallback } from "react";
import { useUserPreferences } from "./useUserPreferences";
import { Project } from "../preload/preload";

type ProjectScannerState = {
  projects: Project[];
  loading: boolean;
  error: string | null;
};

export const useProjectScanner = () => {
  const { preferences } = useUserPreferences();
  const [state, setState] = useState<ProjectScannerState>({
    projects: [],
    loading: false,
    error: null,
  });

  const scanProjects = useCallback(async (): Promise<Project[]> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      let projects: Project[];

      if (preferences.allowFullAccess) {
        projects = await window.api.scanProjectsFullAccess();
      } else if (preferences.directories.length > 0) {
        projects = await window.api.scanProjectsDirectories(
          preferences.directories
        );
      } else {
        projects = [];
      }

      setState({
        projects,
        loading: false,
        error: null,
      });

      return projects;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to scan projects";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, [preferences.allowFullAccess, preferences.directories]);

  const refreshProjects = useCallback(async (): Promise<void> => {
    await scanProjects();
  }, [scanProjects]);

  return {
    ...state,
    scanProjects,
    refreshProjects,
  };
};
