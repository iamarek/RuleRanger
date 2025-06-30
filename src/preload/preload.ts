// @ts-ignore
import { contextBridge, ipcRenderer } from "electron";

export type DirEntry = {
  name: string;
  isDirectory: boolean;
};

export type ReadDirResult = DirEntry[] | { error: string };

contextBridge.exposeInMainWorld("api", {
  readDir: async (dirPath: string): Promise<ReadDirResult> => {
    return ipcRenderer.invoke("read-dir", dirPath);
  },
  findGitRepos: async (): Promise<
    { folderName: string; folderPath: string; projectName?: string }[]
  > => {
    return ipcRenderer.invoke("find-git-repos");
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
