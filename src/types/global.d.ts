import { Project, UserPreferences } from "../preload/preload";

declare global {
  interface Window {
    api: {
      readDir: (
        dirPath: string
      ) => Promise<
        { name: string; isDirectory: boolean }[] | { error: string }
      >;
      findGitRepos: () => Promise<
        { folderName: string; folderPath: string; projectName?: string }[]
      >;
      scanProjectsFullAccess: () => Promise<Project[]>;
      scanProjectsDirectories: (directories: string[]) => Promise<Project[]>;
      getUserPreferences: () => Promise<UserPreferences>;
      setUserPreferences: (prefs: UserPreferences) => Promise<boolean>;
      selectDirectory: () => Promise<string | null>;
    };
  }
}
