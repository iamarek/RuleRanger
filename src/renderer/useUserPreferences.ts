import { useUserPreferencesContext } from "./UserPreferencesContext";

export const useUserPreferences = () => {
  return useUserPreferencesContext();
};
