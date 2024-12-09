import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import History from "../components/history/History";
import GradeForm from "../components/grade-form/GradeForm";
import WarningModal from "../components/warnings/WarningModal";

const RenderRoutes = () => {
  return (
    <BrowserRouter>
      <WarningModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historico" element={<History />} />
        <Route path="/formulario" element={<GradeForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RenderRoutes;
