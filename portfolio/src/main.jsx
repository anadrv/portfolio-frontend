import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import AuthProvider from "./context/AuthContext";

import { MsalProvider } from "@azure/msal-react";

import { msalInstance } from "./config/AuthConfig";

async function startApp() {
  await msalInstance.initialize();

  ReactDOM.createRoot(
    document.getElementById("root")
  ).render(
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </MsalProvider>
    </React.StrictMode>
  );
}

startApp();