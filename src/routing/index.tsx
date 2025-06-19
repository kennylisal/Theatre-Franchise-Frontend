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
import UserLogin from "../user/auth/login";

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
            <Route path="/user">
              {/* harusnya ada verif-account disini */}
              <Route path="signup" element={<UserSignUpPage />} />
              <Route path="login" element={<UserLogin />} />
            </Route>
            <Route path="*" element={<NotFound />} />
            {/* User Routes */}
            {/* <Route path="/user" element={<UserLayout />}>
              <Route index element={<UserHome />} />
              <Route path="movies" element={<UserMovies />} />
              <Route path="login" element={<UserLogin />} />
            </Route> */}
          </Routes>
        </SnackBarProvider>
      </div>
    </AuthProvider>
  );
}

export default TheatreAdminRouter;
