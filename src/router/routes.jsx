import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import History from "../components/history/History";
import GradeForm from "../components/grade-form/GradeForm";

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
