import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MovieScheduleView from "./admin/movie-schedule/index.tsx";
import SnackBarProvider from "./admin/global/snackbar-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackBarProvider>
      <MovieScheduleView />
    </SnackBarProvider>
  </StrictMode>
);
