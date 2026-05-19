import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Subjects from "../pages/Subjects/Subjects";
import Notifications from "../pages/Notifications/Notifications";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/course/:id" element={<Subjects />} />

      <Route path="/login" element={<Login />} />
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
