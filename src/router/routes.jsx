import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import History from "../pages/history/History";
import GradeForm from "../pages/grade-form/GradeForm";

const RenderRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historico" element={<History />} />
        <Route path="/formulario" element={<GradeForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RenderRoutes;
