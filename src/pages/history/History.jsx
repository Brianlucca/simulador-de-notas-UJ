import React, { useEffect, useState } from "react";

const History = () => {
  const [historico, setHistorico] = useState([]);

  const carregarHistorico = () => {
    const dados = JSON.parse(localStorage.getItem("historico")) || [];
    setHistorico(dados);
  };

  const excluirHistorico = (index) => {
    const dados = JSON.parse(localStorage.getItem("historico")) || [];
    dados.splice(index, 1);
    localStorage.setItem("historico", JSON.stringify(dados));
    carregarHistorico();
  };

  useEffect(() => {
    carregarHistorico();

    const handleStorageChange = () => {
      carregarHistorico();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Histórico de Notas</h2>
      {historico.length === 0 ? (
        <p className="text-gray-500">Nenhuma matéria cadastrada.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {historico
            .slice()
            .reverse()
            .map((item, index) => (
              <li key={index} className="py-2 flex justify-between items-center">
                <div>
                  <p><strong>Matéria:</strong> {item.titulo}</p>
                  <p><strong>Média:</strong> {item.media}</p>
                  <p><strong>Status:</strong> {item.status}</p>
                  <small><strong>{item.data}</strong></small>
                </div>
                <button
                  onClick={() => excluirHistorico(index)}
                  className="ml-4 text-red-600 hover:text-red-800"
                >
                  Excluir
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default History;
