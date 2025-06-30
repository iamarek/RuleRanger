import {
  app,
  BrowserWindow,
  ipcMain,
  IpcMainInvokeEvent,
  dialog,
} from "electron";
import * as path from "path";
import * as fs from "fs/promises";
import * as os from "os";
import * as fsSync from "fs";
import * as ini from "ini";

declare const __dirname: string;
declare const process: NodeJS.Process;

let mainWindow: BrowserWindow | null = null;

type DirEntry = {
  name: string;
  isDirectory: boolean;
};

const isDev: boolean = process.env.NODE_ENV !== "production";

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 1000,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../../public/index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle(
  "read-dir",
  async (_event: IpcMainInvokeEvent, dirPath: string) => {
    try {
      const files = await fs.readdir(dirPath, { withFileTypes: true });
      return files.map(
        (file: { name: string; isDirectory: () => boolean }) => ({
          name: file.name,
          isDirectory: file.isDirectory(),
        })
      );
    } catch (error) {
      return { error: (error as Error).message };
    }
  }
);

// Helper to check if a directory contains a .git folder
const isGitRepo = async (dir: string): Promise<boolean> => {
  try {
    const stat = await fs.stat(path.join(dir, ".git"));
    return stat.isDirectory();
  } catch {
    return false;
  }
};

// Helper to get project name from .git/config
const getProjectName = async (
  gitConfigPath: string
): Promise<string | undefined> => {
  try {
    const configContent = await fs.readFile(gitConfigPath, "utf-8");
    const config = ini.parse(configContent);
    if (config['remote "origin"'] && config['remote "origin"'].url) {
      const url = config['remote "origin"'].url;
      // Try to extract project name from URL
      const match = url.match(/([^\/]+)(?:\.git)?$/);
      if (match) return match[1];
    }
  } catch {}
  return undefined;
};

// Recursively search for git repos
const findGitRepos = async (
  startDir: string,
  maxDepth = 6
): Promise<
  { folderName: string; folderPath: string; projectName?: string }[]
> => {
  const results: {
    folderName: string;
    folderPath: string;
    projectName?: string;
  }[] = [];
  const queue: { dir: string; depth: number }[] = [{ dir: startDir, depth: 0 }];
  while (queue.length) {
    const { dir, depth } = queue.shift()!;
    if (depth > maxDepth) continue;
    let entries: fsSync.Dirent[];
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    if (entries.some((e) => e.isDirectory() && e.name === ".git")) {
      const gitConfigPath = path.join(dir, ".git", "config");
      const projectName = await getProjectName(gitConfigPath);
      results.push({
        folderName: path.basename(dir),
        folderPath: dir,
        projectName,
      });
      continue; // Don't search deeper in this repo
    }
    for (const entry of entries) {
      if (
        entry.isDirectory() &&
        entry.name !== ".git" &&
        !entry.name.startsWith(".")
      ) {
        queue.push({ dir: path.join(dir, entry.name), depth: depth + 1 });
      }
    }
  }
  return results;
};

ipcMain.handle("find-git-repos", async () => {
  const homeDir = os.homedir();
  return findGitRepos(homeDir);
});

// --- User Preferences Types and Helpers ---
type UserPreferences = {
  directories: string[];
  allowFullAccess: boolean;
  onboardingCompletedAt: string | null;
  // Add more fields as needed
};

const getPreferencesPath = (): string => {
  return path.join(app.getPath("userData"), "user-preferences.json");
};

const readUserPreferences = async (): Promise<UserPreferences> => {
  const prefPath = getPreferencesPath();
  try {
    const data = await fs.readFile(prefPath, "utf-8");
    return JSON.parse(data);
  } catch {
    // Return defaults if not found or error
    return {
      directories: [],
      allowFullAccess: false,
      onboardingCompletedAt: null,
    };
  }
};

const writeUserPreferences = async (prefs: UserPreferences): Promise<void> => {
  const prefPath = getPreferencesPath();
  await fs.writeFile(prefPath, JSON.stringify(prefs, null, 2), "utf-8");
};

ipcMain.handle("get-user-preferences", async () => {
  return readUserPreferences();
});
ipcMain.handle(
  "set-user-preferences",
  async (_event, prefs: UserPreferences) => {
    await writeUserPreferences(prefs);
    return true;
  }
);

ipcMain.handle("select-directory", async () => {
  if (!mainWindow) return null;

  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
    title: "Select Projects Directory",
    message: "Choose the directory where your projects are located",
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  return result.filePaths[0];
});
