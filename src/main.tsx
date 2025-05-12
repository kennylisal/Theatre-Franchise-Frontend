import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import MoviesView from "./public/movies/index.tsx";
// import MovieScheduleView from "./admin/movie-schedule/index.tsx";
import PercobaanView from "./admin/movie-schedule/percobaan.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PercobaanView />
  </StrictMode>
);
