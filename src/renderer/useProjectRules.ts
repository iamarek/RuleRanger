import { useState, useCallback } from "react";
import { CursorRule } from "../preload/preload";
import { useUserPreferences } from "./useUserPreferences";

export const useProjectRules = () => {
  const { preferences } = useUserPreferences();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [rules, setRules] = useState<CursorRule[]>([]);

  const scanProjectRules = useCallback(
    async (projectId: string): Promise<CursorRule[]> => {
      if (preferences.selectedProjects.length === 0) {
        setError("No projects selected");
        return [];
      }

      setLoading(true);
      setError(null);

      try {
        const result = await (window as any).api.scanProjectCursorRules(
          projectId,
          preferences.selectedProjects
        );
        setRules(result);
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to scan project rules";
        setError(errorMessage);
        console.error("Error scanning project rules:", err);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [preferences.selectedProjects]
  );

  return {
    rules,
    loading,
    error,
    scanProjectRules,
  };
};
