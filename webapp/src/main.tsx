import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeConfiguration } from "@prima-materia/ui";
import { BrowserRouter } from "react-router-dom";

import "@prima-materia/ui/dist/style.css";
import { ServerContextProvider } from "./ServerContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeConfiguration>
      <BrowserRouter>
        <ServerContextProvider>
          <App />
        </ServerContextProvider>
      </BrowserRouter>
    </ThemeConfiguration>
  </React.StrictMode>
);
