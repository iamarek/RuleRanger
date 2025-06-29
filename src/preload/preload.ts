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
});
