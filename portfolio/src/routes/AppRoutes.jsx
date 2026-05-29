import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Notifications from "../pages/Notifications/Notifications";
import AuthLoading from "../pages/AuthLoading/AuthLoading";
import Competency from "../pages/Competency/Competency";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/course/:id"
        element={
          <ProtectedRoute>
            <Competency />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Login />} />
      <Route path="/auth" element={<AuthLoading />} />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "COORDINATOR", "NITE"]}>
            <Notifications />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;