import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Project } from "../preload/preload";

export type UserPreferences = {
  directories: string[];
  allowFullAccess: boolean;
  onboardingCompletedAt: string | null;
  selectedProjects: Project[];
};

type UserPreferencesContextType = {
  preferences: UserPreferences;
  setPreferences: (prefs: UserPreferences) => Promise<void>;
  updatePreferences: (update: Partial<UserPreferences>) => Promise<void>;
  resetPreferences: () => Promise<void>;
  loading: boolean;
};

const defaultPreferences: UserPreferences = {
  directories: [],
  allowFullAccess: false,
  onboardingCompletedAt: null,
  selectedProjects: [],
};

const UserPreferencesContext = createContext<
  UserPreferencesContextType | undefined
>(undefined);

export const UserPreferencesProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [preferences, setPreferencesState] =
    useState<UserPreferences>(defaultPreferences);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const prefs = await (window as any).api.getUserPreferences();
      setPreferencesState(prefs);
      setLoading(false);
    })();
  }, []);

  const setPreferences = async (prefs: UserPreferences): Promise<void> => {
    await (window as any).api.setUserPreferences(prefs);
    setPreferencesState(prefs);
  };

  const updatePreferences = async (
    update: Partial<UserPreferences>
  ): Promise<void> => {
    const newPrefs = { ...preferences, ...update };
    await setPreferences(newPrefs);
  };

  const resetPreferences = async (): Promise<void> => {
    await setPreferences(defaultPreferences);
  };

  return (
    <UserPreferencesContext.Provider
      value={{
        preferences,
        setPreferences,
        updatePreferences,
        resetPreferences,
        loading,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferencesContext = (): UserPreferencesContextType => {
  const ctx = useContext(UserPreferencesContext);
  if (!ctx)
    throw new Error(
      "useUserPreferencesContext must be used within UserPreferencesProvider"
    );
  return ctx;
};
