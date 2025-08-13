import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Recommendations from "../pages/Recommendations";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recommendations" element={<Recommendations />} />
    </Routes>
  </Router>
);

export default AppRouter;
