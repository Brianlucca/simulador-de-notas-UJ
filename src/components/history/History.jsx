import { Share, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const History = () => {
  const [historico, setHistorico] = useState([]);

  const carregarHistorico = () => {
    const dados = JSON.parse(localStorage.getItem("historico")) || [];
    setHistorico(dados);
  };

  const excluirHistorico = (id) => {
    const dados = JSON.parse(localStorage.getItem("historico")) || [];
    const novosDados = dados.filter((item) => item.id !== id);
    localStorage.setItem("historico", JSON.stringify(novosDados));
    setHistorico(novosDados);
  };

  const compartilharHistorico = async (item) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${item.titulo}`,
          text: `Matéria: ${item.titulo}\nMédia: ${item.media}\nStatus: ${item.status}`,
        });
        alert("Histórico compartilhado com sucesso!");
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
        alert("Não foi possível compartilhar.");
      }
    } else {
      alert("Compartilhamento não suportado neste dispositivo.");
    }
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
        <p className="text-gray-500">Nenhuma matéria encontrada.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {historico.map((item) => (
            <li key={item.id} className="py-2 flex justify-between items-center">
              <div>
                <p>
                  <strong>Matéria:</strong> {item.titulo}
                </p>
                <p>
                  <strong>Média:</strong> {item.media}
                </p>
                <p>
                  <strong>Status:</strong> {item.status}
                </p>
                <small>
                  <strong>{item.data}</strong>
                </small>
              </div>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => compartilharHistorico(item)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Share />
                </button>
                <button
                  onClick={() => excluirHistorico(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
