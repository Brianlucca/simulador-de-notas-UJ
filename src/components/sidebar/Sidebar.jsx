import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Home, History, Github, School, Phone, HistoryIcon } from "lucide-react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div 
        className={`bg-blue-600 text-white h-screen fixed top-0 left-0 transition-all duration-300 ${isExpanded ? "w-64" : "w-16"} flex flex-col justify-start`}
      >
        <div className="flex items-center justify-center h-16 border-b border-blue-500 cursor-pointer" onClick={toggleSidebar}>
          <Menu size={24} />
          {isExpanded &&  <h1 className="text-lg font-bold ml-4">Simulador de Notas - UJ</h1>}
        </div>
        <nav className="mt-4 flex flex-col">
          <Link
            to="https://www.unijorge.edu.br/sedes/"
            className="flex items-center gap-4 px-4 py-2 hover:bg-blue-500 transition"
          >
            <Phone size={24} />
            {isExpanded && <span>Unijorge Contatos</span>}
          </Link>
          <Link
            to="https://www.unijorge.edu.br/perguntas-frequentes/"
            className="flex items-center gap-4 px-4 py-2 hover:bg-blue-500 transition"
          >
            <School size={24} />
            {isExpanded && <span>FAQ Unijorge</span>}
          </Link>
          <Link
            to="/historico"
            className="flex items-center gap-4 px-4 py-2 hover:bg-blue-500 transition"
          >
            <HistoryIcon size={24} />
            {isExpanded && <span>Histórico</span>}
          </Link>
        </nav>
        <div className="flex items-center justify-center mt-auto h-16 border-t border-blue-500">
          {isExpanded ? (
            <span className="text-sm flex items-center gap-2">
              <Github size={20} />
              <a href="https://github.com/Brianlucca" target="_blank">Brian Lucca</a>
            </span>
          ) : (
            <Menu size={24} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
