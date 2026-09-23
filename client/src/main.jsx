import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "./components/ui/Provider";
import AuthProvider from "./context/AuthProvider"
import ProfileProvider from "./context/ProfileProvider";
import { Toaster } from "./components/ui/Toaster";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider defaultTheme="light">
      <AuthProvider>
        <ProfileProvider>
          <BrowserRouter>
            <App />
            <Toaster />
          </BrowserRouter>
        </ProfileProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
);
