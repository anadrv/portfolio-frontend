import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Subjects from "../pages/Subjects/Subjects";


function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/subjects" element={<Subjects />} />


    </Routes>
  );
}

export default AppRoutes;