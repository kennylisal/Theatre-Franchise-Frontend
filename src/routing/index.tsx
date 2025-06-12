import { Route, Routes } from "react-router-dom";
import LoginPage from "../admin/auth/login";
import NotFound from "../admin/global/not-found/not-found";
import { AuthProvider } from "../admin/auth/auth-provider/authProvider";
import MovieScheduleView from "../admin/movie-schedule";
import ProtectedRoute from "./protected-route";
import AdminBar from "../admin/global/appbar/app-bar";

import AuthVerificationPage from "../admin/auth/verif-page";
import SnackBarProvider from "../admin/global/snackbar/snackbar-provider";
import MoviesView from "../public/movies";
import EmployeeLocketkSchedule from "../employee/locket-scehdule";
import UserSignUpPage from "../user/auth/signup";

function TheatreAdminRouter() {
  return (
    <AuthProvider>
      <div>
        <SnackBarProvider>
          <AdminBar />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/movies" element={<MoviesView />} />
            <Route path="/verifAccount" element={<AuthVerificationPage />} />
            <Route path="/signUp" element={<UserSignUpPage />} />
            <Route
              path="/locketSchedule"
              element={<EmployeeLocketkSchedule />}
            />
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

export default TheatreAdminRouter;
