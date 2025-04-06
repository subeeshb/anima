import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeConfiguration } from "@prima-materia/ui";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/authentication/AuthContext.tsx";

import "@prima-materia/ui/dist/style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeConfiguration>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeConfiguration>
  </React.StrictMode>
);
