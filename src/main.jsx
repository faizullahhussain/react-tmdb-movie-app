import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter basename="/react-tmdb-movie-app">
      <App />
    </HashRouter>
  </StrictMode>,
);
