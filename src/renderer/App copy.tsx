import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Routes, Route } from "react-router-dom";
import type { FC } from "react";
import { Project } from "../types/global";

type DirEntry = {
  name: string;
  isDirectory: boolean;
};

type ReadDirResult = DirEntry[] | { error: string };

type GitRepo = {
  folderName: string;
  folderPath: string;
  projectName?: string;
};

declare global {
  interface Window {
    api: {
      readDir: (dirPath: string) => Promise<ReadDirResult>;
      findGitRepos: () => Promise<GitRepo[]>;
      selectDirectory: () => Promise<string | null>;
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
      scanProjectsFullAccess: () => Promise<Project[]>;
      scanProjectsDirectories: (directories: string[]) => Promise<Project[]>;
    };
  }
}

const Home: FC = () => {
  const [dirPath, setDirPath] = useState<string>("/");
  const [entries, setEntries] = useState<DirEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [gitRepos, setGitRepos] = useState<GitRepo[]>([]);
  const [gitLoading, setGitLoading] = useState<boolean>(false);
  const [gitError, setGitError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDirPath(e.target.value);
  };

  const handleReadDir = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setEntries([]);
    const result = await window.api.readDir(dirPath);
    setLoading(false);
    if (Array.isArray(result)) {
      setEntries(result);
    } else {
      setError(result.error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key === "Enter" || e.key === " ") {
      handleReadDir();
    }
  };

  const handleFindGitRepos = async (): Promise<void> => {
    setGitLoading(true);
    setGitError(null);
    setGitRepos([]);
    try {
      const repos = await window.api.findGitRepos();
      setGitRepos(repos);
    } catch (err) {
      setGitError((err as Error).message);
    }
    setGitLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Rule Ranger Boilerplate
      </h1>
      <label
        htmlFor="dir-input"
        className="mb-2 text-lg text-gray-700 dark:text-gray-200"
      >
        Directory Path
      </label>
      <input
        id="dir-input"
        type="text"
        value={dirPath}
        onChange={handleInputChange}
        className="w-80 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 dark:bg-gray-800 dark:text-white"
        aria-label="Directory path"
        autoFocus
      />
      <button
        type="button"
        onClick={handleReadDir}
        onKeyDown={handleKeyDown}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        tabIndex={0}
        aria-label="Read directory"
      >
        {loading ? "Loading..." : "Read Directory"}
      </button>
      {error && (
        <div className="text-red-600 mb-4" role="alert">
          {error}
        </div>
      )}
      <button
        type="button"
        onClick={handleFindGitRepos}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
        tabIndex={0}
        aria-label="Find Git repositories"
      >
        {gitLoading ? "Searching..." : "Find Git Repositories"}
      </button>
      {gitError && (
        <div className="text-red-600 mb-4" role="alert">
          {gitError}
        </div>
      )}
      {gitRepos.length > 0 && (
        <ul
          className="w-80 bg-white dark:bg-gray-800 rounded shadow p-4 mb-4"
          role="list"
          aria-label="Git repositories"
        >
          {gitRepos.map((repo) => (
            <li
              key={repo.folderPath}
              className="py-1 px-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0 flex flex-col"
            >
              <span className="font-semibold text-blue-700 dark:text-blue-300">
                📁 {repo.folderName}
              </span>
              <span className="text-xs text-gray-500 break-all">
                {repo.folderPath}
              </span>
              {repo.projectName && (
                <span className="text-xs text-green-700 dark:text-green-300">
                  Project: {repo.projectName}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      <ul
        className="w-80 bg-white dark:bg-gray-800 rounded shadow p-4"
        role="list"
        aria-label="Directory contents"
      >
        {entries.map((entry) => (
          <li
            key={entry.name}
            className="py-1 px-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0 flex items-center"
          >
            <span
              className={
                entry.isDirectory
                  ? "font-semibold text-blue-700 dark:text-blue-300"
                  : "text-gray-800 dark:text-gray-200"
              }
            >
              {entry.isDirectory ? "📁" : "📄"} {entry.name}
            </span>
          </li>
        ))}
        {entries.length === 0 && !error && !loading && (
          <li className="text-gray-500 dark:text-gray-400">No entries</li>
        )}
      </ul>
    </main>
  );
};

const About: FC = () => <div>About Page</div>;

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default App;
