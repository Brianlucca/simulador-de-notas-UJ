import React, { useState, useEffect } from "react";

const WarningModal = ({ onClose }) => {
  const modalMessages = [
    {
      id: "alert_dezena",
      title: "ATENÇÃO! Notas entre 0 e 10",
      message:
        "As notas devem ser inseridas no intervalo de 0 a 10. Certifique-se de preencher corretamente para calcular a média no resultado final.",
    },
    {
      id: "fix_a2",
      title: "Correção no Cálculo da A2",
      message:
        "Consertado o erro para quem colocava a nota da A2 menor que 5. Anteriormente, independente do resultado, mesmo se tirasse 10, o resultado era 'reprovado'. Agora, o cálculo está correto.",
    },
    {
      id: "new_feature",
      title: "Adicionado visualização de histórico",
      message: "Adicionada a opção de visualizar o histórico de notas na barra lateral.",
    },
    {
      id: "new_feature_1",
      title: "Adicionado compartilhamento de notas",
      message: "Adicionada a funcionalidade de compartilhamento das notas.",
    },
  ];

  const [modals, setModals] = useState([]);
  const [visibleModal, setVisibleModal] = useState(null);

  useEffect(() => {
    const unseenModals = modalMessages.filter(
      (modal) => !localStorage.getItem(`modalDismissed_${modal.id}`)
    );
    setModals(unseenModals);
    if (unseenModals.length > 0) {
      setVisibleModal(unseenModals[0].id);
    }
  }, []);

  const closeModal = (id) => {
    localStorage.setItem(`modalDismissed_${id}`, "true");
    const nextModals = modals.filter((modal) => modal.id !== id);
    setModals(nextModals);
    setVisibleModal(nextModals.length > 0 ? nextModals[0].id : null);
    if (onClose) onClose(id);
  };

  if (!visibleModal) return null;

  const currentModal = modals.find((modal) => modal.id === visibleModal);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4">{currentModal?.title}</h2>
        <p className="mb-6">{currentModal?.message}</p>
        <button
          onClick={() => closeModal(currentModal.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Entendi
        </button>
      </div>
    </div>
  );
};

export default WarningModal;
