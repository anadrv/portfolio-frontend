import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Subjects from "../pages/Subjects/Subjects";
import Notifications from "../pages/Notifications/Notifications";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/course/7" element={<Subjects />} />

      <Route path="/login" element={<Login />} />
     <Route path="/notifications" element={<Notifications />} />



    </Routes>
  );
}

export default AppRoutes;
