import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { AuthenticationProvider } from "./context/AuthenticationContext.tsx";

document.documentElement.setAttribute("data-theme", "light");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>
  </StrictMode>
);
