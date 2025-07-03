// @ts-ignore
import { contextBridge, ipcRenderer } from "electron";

export type DirEntry = {
  name: string;
  isDirectory: boolean;
};

export type ReadDirResult = DirEntry[] | { error: string };

export type Project = {
  folderName: string;
  folderPath: string;
  favicon?: string;
  projectName?: string;
  cursorRules: number;
};

contextBridge.exposeInMainWorld("api", {
  readDir: async (dirPath: string): Promise<ReadDirResult> => {
    return ipcRenderer.invoke("read-dir", dirPath);
  },
  findGitRepos: async (): Promise<
    { folderName: string; folderPath: string; projectName?: string }[]
  > => {
    return ipcRenderer.invoke("find-git-repos");
  },
  scanProjectsFullAccess: async (): Promise<Project[]> => {
    return ipcRenderer.invoke("scan-projects-full-access");
  },
  scanProjectsDirectories: async (
    directories: string[]
  ): Promise<Project[]> => {
    return ipcRenderer.invoke("scan-projects-directories", directories);
  },
  getUserPreferences: async (): Promise<{
    directories: string[];
    allowFullAccess: boolean;
    onboardingCompletedAt: string | null;
  }> => {
    return ipcRenderer.invoke("get-user-preferences");
  },
  setUserPreferences: async (prefs: {
    directories: string[];
    allowFullAccess: boolean;
    onboardingCompletedAt: string | null;
  }): Promise<boolean> => {
    return ipcRenderer.invoke("set-user-preferences", prefs);
  },
  selectDirectory: async (): Promise<string | null> => {
    return ipcRenderer.invoke("select-directory");
  },
});
