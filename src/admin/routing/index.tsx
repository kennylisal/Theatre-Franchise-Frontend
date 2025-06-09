import { Route, Routes } from "react-router-dom";
import LoginPage from "../auth/login";
import MoviesView from "../../public/movies";
import NotFound from "../global/not-found/not-found";
import { AuthProvider } from "../auth/auth-provider/authProvider";
import MovieScheduleView from "../movie-schedule";
import ProtectedRoute from "./protected-route";
import AdminBar from "../global/appbar/app-bar";
import SnackBarProvider from "../global/snackbar-provider";

function TheatreAdmin() {
  return (
    <AuthProvider>
      <div>
        <SnackBarProvider>
          <AdminBar />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/movies" element={<MoviesView />} />
            <Route
              path="/movieSchedule"
              element={
                <ProtectedRoute>
                  <MovieScheduleView />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SnackBarProvider>
      </div>
    </AuthProvider>
  );
}

export default TheatreAdmin;
