import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { UserPreferencesProvider } from "./UserPreferencesContext";
import "./styles.css";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <UserPreferencesProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </UserPreferencesProvider>
    </React.StrictMode>
  );
}
