import { useState, useCallback } from "react";
import { useUserPreferences } from "./useUserPreferences";
import { DashboardRulesData } from "../preload/preload";

export const useDashboardRules = () => {
  const { preferences } = useUserPreferences();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardRulesData | null>(null);

  const scanRules =
    useCallback(async (): Promise<DashboardRulesData | null> => {
      if (preferences.selectedProjects.length === 0) {
        setError("No projects selected");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await (window as any).api.scanCursorRules(
          preferences.selectedProjects
        );
        setData(result);
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to scan cursor rules";
        setError(errorMessage);
        console.error("Error scanning cursor rules:", err);
        return null;
      } finally {
        setLoading(false);
      }
    }, [preferences.selectedProjects]);

  return {
    data,
    loading,
    error,
    scanRules,
  };
};
