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

// Project type definition
export type Project = {
  folderName: string;
  folderPath: string;
  favicon?: string;
  projectName?: string;
  cursorRules: number;
};

// Helper to get project name from package.json
const getProjectNameFromPackageJson = async (
  projectPath: string
): Promise<string | undefined> => {
  try {
    const packageJsonPath = path.join(projectPath, "package.json");
    const packageJsonContent = await fs.readFile(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(packageJsonContent);
    return packageJson.name;
  } catch {
    return undefined;
  }
};

// Helper to convert image to base64 data URL
const imageToBase64 = async (
  imagePath: string
): Promise<string | undefined> => {
  try {
    const imageBuffer = await fs.readFile(imagePath);
    const ext = path.extname(imagePath).toLowerCase();

    let mimeType = "image/png"; // default
    switch (ext) {
      case ".ico":
        mimeType = "image/x-icon";
        break;
      case ".png":
        mimeType = "image/png";
        break;
      case ".svg":
        mimeType = "image/svg+xml";
        break;
      case ".jpg":
      case ".jpeg":
        mimeType = "image/jpeg";
        break;
    }

    return `data:${mimeType};base64,${imageBuffer.toString("base64")}`;
  } catch (error) {
    console.error(`Error converting image to base64: ${imagePath}`, error);
    return undefined;
  }
};

// Helper to recursively find favicon files
const getFaviconPath = async (
  projectPath: string
): Promise<string | undefined> => {
  const faviconNames = [
    "favicon.ico",
    "favicon.png",
    "favicon.svg",
    "favicon.jpg",
    "favicon.jpeg",
    "apple-touch-icon.png",
    "icon.ico",
    "icon.png",
    "icon.svg",
  ];

  const skipDirectories = new Set([
    "node_modules",
    ".git",
    "build",
    "dist",
    "out",
    "target",
    ".next",
    ".nuxt",
    "vendor",
    "__pycache__",
    ".pytest_cache",
    "venv",
    ".venv",
    "env",
    ".env",
    "coverage",
    ".coverage",
    "tmp",
    "temp",
    ".tmp",
    ".temp",
  ]);

  const searchForFavicon = async (
    dir: string,
    depth = 0
  ): Promise<string | undefined> => {
    if (depth > 4) return undefined; // Limit search depth to avoid performance issues

    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      // First, check for favicon files in current directory
      for (const faviconName of faviconNames) {
        const faviconPath = path.join(dir, faviconName);
        try {
          await fs.access(faviconPath);
          console.log(`Found favicon: ${faviconPath}`);
          return faviconPath;
        } catch {
          // Continue to next favicon name
        }
      }

      // Then search in subdirectories
      for (const entry of entries) {
        if (
          entry.isDirectory() &&
          !skipDirectories.has(entry.name) &&
          !entry.name.startsWith(".")
        ) {
          const subDir = path.join(dir, entry.name);
          const found = await searchForFavicon(subDir, depth + 1);
          if (found) return found;
        }
      }
    } catch {
      // Directory can't be read, skip
    }

    return undefined;
  };

  return searchForFavicon(projectPath);
};

// Helper to count .mdc files in all .cursor/rules directories recursively throughout the project
const countCursorRules = async (projectPath: string): Promise<number> => {
  console.log(`Starting cursor rules count for: ${projectPath}`);
  const skipDirectories = new Set([
    "node_modules",
    ".git",
    "build",
    "dist",
    "out",
    "target",
    ".next",
    ".nuxt",
    "vendor",
    "__pycache__",
    ".pytest_cache",
    "venv",
    ".venv",
    "env",
    ".env",
    "coverage",
    ".coverage",
    "tmp",
    "temp",
    ".tmp",
    ".temp",
  ]);

  const searchForCursorRules = async (
    dir: string,
    depth = 0
  ): Promise<number> => {
    if (depth > 6) return 0; // Limit search depth

    let totalCount = 0;
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      // Check if this directory is .cursor/rules and count .md files
      if (dir.endsWith(path.join(".cursor", "rules"))) {
        console.log(`Found .cursor/rules directory: ${dir}`);
        for (const entry of entries) {
          if (entry.isFile() && entry.name.endsWith(".mdc")) {
            console.log(`Found .mdc file: ${entry.name}`);
            totalCount++;
          } else if (entry.isDirectory()) {
            // Recursively count in subdirectories within rules
            totalCount += await searchForCursorRules(
              path.join(dir, entry.name),
              depth + 1
            );
          }
        }
      } else {
        // Continue searching in subdirectories
        for (const entry of entries) {
          if (entry.isDirectory() && !skipDirectories.has(entry.name)) {
            const subDir = path.join(dir, entry.name);
            // Log when we find a .cursor directory
            if (entry.name === ".cursor") {
              console.log(`Found .cursor directory: ${subDir}`);
            }
            totalCount += await searchForCursorRules(subDir, depth + 1);
          }
        }
      }
    } catch (error) {
      console.log(`Error reading directory ${dir}:`, error);
    }

    return totalCount;
  };

  const count = await searchForCursorRules(projectPath);
  console.log(
    `Project: ${path.basename(projectPath)}, Cursor rules found: ${count}`
  );
  return count;
};

// Enhanced function to find git repos with complete project information
const findProjectsWithGit = async (
  startDir: string,
  maxDepth = 6
): Promise<Project[]> => {
  const results: Project[] = [];
  const queue: { dir: string; depth: number }[] = [{ dir: startDir, depth: 0 }];

  // Directories to skip for performance and relevance
  const skipDirectories = new Set([
    "node_modules",
    "Trash",
    ".Trash",
    "Library", // macOS system library
    "System", // macOS system directory
    "Applications", // macOS applications
    "bin", // Common binary directories
    "sbin",
    "usr",
    "var",
    "tmp",
    "temp",
    "cache",
    ".cache",
    "build",
    "dist",
    "out",
    "target", // Rust/Java build directories
    ".next", // Next.js build directory
    ".nuxt", // Nuxt.js build directory
    "vendor", // Common dependency directories
    "__pycache__", // Python cache
    ".pytest_cache",
    "venv", // Python virtual environments
    ".venv",
    "env",
    ".env",
  ]);

  while (queue.length) {
    const { dir, depth } = queue.shift()!;
    if (depth > maxDepth) continue;

    let entries: fsSync.Dirent[];
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      continue;
    }

    // Check if this directory has a .git folder
    if (entries.some((e) => e.isDirectory() && e.name === ".git")) {
      const folderName = path.basename(dir);
      const folderPath = dir;

      // Get project name from package.json (preferred) or git config (fallback)
      let projectName = await getProjectNameFromPackageJson(dir);
      if (!projectName) {
        const gitConfigPath = path.join(dir, ".git", "config");
        projectName = await getProjectName(gitConfigPath);
      }

      // Check for favicon and convert to base64
      const faviconPath = await getFaviconPath(dir);
      const favicon = faviconPath
        ? await imageToBase64(faviconPath)
        : undefined;
      console.log(
        `Project: ${folderName}, Favicon: ${faviconPath || "none found"}`
      );

      // Count cursor rules
      console.log(`About to count cursor rules for: ${folderName}`);
      const cursorRules = await countCursorRules(dir);
      console.log(
        `Finished counting cursor rules for: ${folderName}, count: ${cursorRules}`
      );

      results.push({
        folderName,
        folderPath,
        favicon,
        projectName,
        cursorRules,
      });

      continue; // Don't search deeper in this repo
    }

    // Add subdirectories to queue
    for (const entry of entries) {
      if (
        entry.isDirectory() &&
        entry.name !== ".git" &&
        !entry.name.startsWith(".") &&
        !skipDirectories.has(entry.name)
      ) {
        queue.push({ dir: path.join(dir, entry.name), depth: depth + 1 });
      }
    }
  }

  return results;
};

// Recursively search for git repos (legacy function - keeping for compatibility)
const findGitRepos = async (
  startDir: string,
  maxDepth = 6
): Promise<
  { folderName: string; folderPath: string; projectName?: string }[]
> => {
  const projects = await findProjectsWithGit(startDir, maxDepth);
  return projects.map(({ folderName, folderPath, projectName }) => ({
    folderName,
    folderPath,
    projectName,
  }));
};

ipcMain.handle("find-git-repos", async () => {
  const homeDir = os.homedir();
  return findGitRepos(homeDir);
});

// Enhanced project scanning with full information
ipcMain.handle("scan-projects-full-access", async () => {
  const homeDir = os.homedir();
  return findProjectsWithGit(homeDir);
});

ipcMain.handle(
  "scan-projects-directories",
  async (_event: IpcMainInvokeEvent, directories: string[]) => {
    const allProjects: Project[] = [];

    for (const directory of directories) {
      try {
        const projects = await findProjectsWithGit(directory);
        allProjects.push(...projects);
      } catch (error) {
        console.error(`Error scanning directory ${directory}:`, error);
      }
    }

    return allProjects;
  }
);

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
