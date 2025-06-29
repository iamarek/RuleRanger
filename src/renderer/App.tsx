import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Routes, Route } from "react-router-dom";
import type { FC } from "react";
import Home from "./Home";

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
    };
  }
}

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
