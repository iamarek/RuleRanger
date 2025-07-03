export type Project = {
  folderName: string;
  folderPath: string;
  favicon?: string;
  projectName?: string;
  cursorRules: number;
};

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
      getUserPreferences: () => Promise<{
        directories: string[];
        allowFullAccess: boolean;
        onboardingCompletedAt: string | null;
      }>;
      setUserPreferences: (prefs: {
        directories: string[];
        allowFullAccess: boolean;
        onboardingCompletedAt: string | null;
      }) => Promise<boolean>;
      selectDirectory: () => Promise<string | null>;
    };
  }
}
