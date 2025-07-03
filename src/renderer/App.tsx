import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Routes, Route } from "react-router-dom";
import type { FC } from "react";
import Home from "./Home/Home";
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
