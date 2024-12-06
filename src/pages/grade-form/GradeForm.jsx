import React, { useState } from "react";

const GradeForm = () => {
  const [titulo, setTitulo] = useState("");
  const [trab1, setTrab1] = useState("");
  const [trab2, setTrab2] = useState("");
  const [a2, setA2] = useState("");
  const [a3, setA3] = useState("");
  const [resultado, setResultado] = useState(null);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "trab1") setTrab1(value);
    if (name === "trab2") setTrab2(value);
    if (name === "a2") setA2(value);
    if (name === "a3") setA3(value);
  };

  const calcularMedia = () => {
    const trab1Value = parseFloat(trab1) || 0;
    const trab2Value = parseFloat(trab2) || 0;
    const a2Value = parseFloat(a2) || 0;
    const a3Value = parseFloat(a3) || 0;

    let primeiraAvaliacao = (trab1Value + trab2Value) / 2;
    primeiraAvaliacao = primeiraAvaliacao * 0.4;

    let a2Final = a2Value;
    if (a2Value < a3Value || a3Value >= 10) {
      a2Final = a3Value;
    }

    const a2Media = a2Final * 0.6;
    const media = primeiraAvaliacao + a2Media;

    let statusResult = "";
    if (trab1 === "" || trab2 === "" || a2 === "") {
      statusResult = "Preencha todos os campos.";
      setResultado(null);
      setStatus(statusResult);
      return;
    }

    if (primeiraAvaliacao === 0) {
      statusResult = "Reprovado! Porque você zerou os dois trabalhos!";
    } else if (a2Final < 5) {
      statusResult = "Reprovado! Porque você tirou a nota da Avaliação A2 menor que 5!";
    } else if (media < 6) {
      statusResult = "Reprovado! Porque a sua média foi menor que 6!";
    } else {
      statusResult = "Aprovado!";
    }

    setResultado(media.toFixed(2));
    setStatus(statusResult);

    const dadosMateria = { titulo, media: media.toFixed(2), status: statusResult, data: new Date().toLocaleString() };
    const historico = JSON.parse(localStorage.getItem("historico")) || [];
    historico.push(dadosMateria);
    localStorage.setItem("historico", JSON.stringify(historico));

    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Simular Média</h2>
      <input
        type="text"
        placeholder="Título da Matéria"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="block w-full mb-4 px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="number"
          name="trab1"
          placeholder="Trabalho 1"
          value={trab1}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
        />
        <input
          type="number"
          name="trab2"
          placeholder="Trabalho 2"
          value={trab2}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
        />
        <input
          type="number"
          name="a2"
          placeholder="Avaliação A2"
          value={a2}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
        />
        <input
          type="number"
          name="a3"
          placeholder="Avaliação A3 (Substitutiva)"
          value={a3}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
        />
      </div>
      <button
        onClick={calcularMedia}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Calcular e Salvar
      </button>

      {resultado && (
        <div className="mt-8 bg-gray-100 p-4 rounded-md shadow">
          <h3 className="text-xl font-semibold">Resultado</h3>
          <p><strong>Resultado:</strong> {resultado}</p>
          <p><strong>Status:</strong> {status}</p>
        </div>
      )}
    </div>
  );
};

export default GradeForm;
