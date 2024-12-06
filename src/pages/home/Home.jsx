import React from "react";
import GradeForm from "../../components/grade-form/GradeForm";
import History from "../../components/history/History";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <main className="bg-gray-100 min-h-screen p-4 flex">
      <Sidebar />
      <div className="w-full max-w-4xl grid gap-8 mt-8 ml-16 sm:ml-64">
        <GradeForm />
        <History />
      </div>
    </main>
  );
};

export default Home;
