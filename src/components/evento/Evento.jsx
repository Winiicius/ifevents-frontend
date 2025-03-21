import { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Evento = () => {
  const [eventos, setEventos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [size, setSize] = useState(5);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [doingInscricao, setDoingInscricao] = useState(false);

  const [visiblePopUp, setVisiblePopUp] = useState(false);
  const { userRoles } = useAuth();

  const nav = useNavigate();

  const [inscreverseButtonEnabled, setInscreverseButtonDisabled] =
    useState(false);

  const [fecharButtonEnabled, setFecharButtonDisabled] = useState(false);
  const [inscreverseButtonStyle, setInscreverseButtonStyle] = useState(
    "px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
  );

  const [fecharButtonStyle, setFecharButtonStyle] = useState(
    "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer"
  );

  useEffect(() => {
    getEventos(paginaAtual, size);
  }, [paginaAtual, size]);

  async function getEventos(pagina, tamanho) {
    let token = localStorage.getItem("token");
    let status = userRoles === "COORDENADOR" ? "" : "APROVADO";

    const response = await api.get(
      `/eventos?page=${pagina}&size=${tamanho}&status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const dados = response.data;

    setEventos(dados.content);
    setTotalPaginas(dados.totalPages);
  }

  function delay() {
    return new Promise((r) => setTimeout(r, 1000));
  }

  /**
   * Realizar inscricao do usuário no evento
   *
   * @param {} evento
   */
  async function realizarInscricao(evento) {
    setDoingInscricao(true);
    try {
      const response = await api.post(`/eventos/${evento.id}/organizadores`, {
        email: "rharhuky@gmail.com",
      });
      const data = await response.data;
      setDoingInscricao(false);
      closeModal();
      await delay();
      setVisiblePopUp(false);
      nav(0);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePageChange = (novaPagina) => {
    setPaginaAtual(novaPagina);
  };

  const handleSizeChange = (event) => {
    setSize(parseInt(event.target.value));
    setPaginaAtual(0);
  };

  const handleEventClick = (evento) => {
    setEventoSelecionado(evento);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEventoSelecionado(null);
    resetModalButtons();
    setVisiblePopUp(false);
  };

  function resetModalButtons() {
    setInscreverseButtonDisabled(false);
    setFecharButtonDisabled(false);
    setInscreverseButtonStyle(
      "px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
    );
    setFecharButtonStyle(
      "px-4 py-2 bg-red-600 text-white rounded hover:bg-green-700 cursor-pointer"
    );
  }

  function disableModalButtons() {
    setFecharButtonStyle("disabled");
    setInscreverseButtonStyle("disabled");
    setInscreverseButtonDisabled(true);
    setFecharButtonDisabled(true);
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between">
        <h1 className="text-2xl font-bold mb-4 text-center flex-1/2">
          Lista de Eventos
        </h1>
        {visiblePopUp && (
          <span className="bg-green-500 rounded-2xl py-2 px-2 w-30">
            Usuario criado com sucesso!
          </span>
        )}
      </div>
      <div className="mb-4">
        <label className="mr-2">Itens por página:</label>
        <select
          value={size}
          onChange={handleSizeChange}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      <EventoList eventos={eventos} onEventClick={handleEventClick} />
      <Pagination
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        onPageChange={handlePageChange}
      />
      {modalVisible && (
        <div className="fixed top-0 left-0 w-full h-full k bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full space-x-5">
            <div className="flex flex-wrap justify-between">
              <h2 className="text-2xl font-bold mb-4">
                {eventoSelecionado.nomeEvento}
              </h2>
              <span>
                {doingInscricao && (
                  <img src="src/assets/1488.gif" alt="Loading icon" />
                )}
              </span>
            </div>
            <button
              onClick={closeModal}
              className={fecharButtonStyle}
              disabled={fecharButtonEnabled}
            >
              Fechar
            </button>
            <button
              className={inscreverseButtonStyle}
              onClick={() => {
                disableModalButtons();
                realizarInscricao(eventoSelecionado);
              }}
              disabled={inscreverseButtonEnabled}
            >
              Inscrever-se
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => nav("/criar-evento")}
        className="bg-green-500 cursor-pointer rounded-md hover:bg-green-600 transition text-white p-2"
      >
        Criar evento
      </button>
    </div>
  );
};

const EventoList = ({ eventos, onEventClick }) => {
  const statusColorClasses = {
    EM_ANALISE: "text-yellow-600",
    REJEITADO: "text-red-600",
    APROVADO: "text-green-600",
    CANCELADO: "text-red-600",
    CONCLUIDO: "text-blue-500",
    CERTIFICADOS_GERADOS: "text-green-600",
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {eventos.map((evento) => (
          <div
            key={evento.id}
            className="max-w-150 border border-gray-300 rounded-lg shadow-lg p-4 bg-white cursor-pointer hover:bg-gray-100"
            onClick={() => onEventClick(evento)}
          >
            <div>
              <div className="flex justify-between items-center max-w-full">
                <h2 className="text-xl font-semibold">{evento.nomeEvento}</h2>
                <span className={`${statusColorClasses[evento.status]}`}>
                  <li>{evento.status}</li>
                </span>
              </div>
              <p>{evento.dataEvento}</p>
              <p>
                {evento.horaInicio} - {evento.horaTermino}
              </p>
              <label>Capacidade Máxima: {evento.capacidadeMaxima}</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Pagination = ({ paginaAtual, totalPaginas, onPageChange }) => {
  const changePage = (delta) => {
    const novaPagina = paginaAtual + delta;
    if (novaPagina >= 0 && novaPagina < totalPaginas) {
      onPageChange(novaPagina);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => changePage(-1)}
        disabled={paginaAtual === 0}
        className="px-4 py-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
      >
        Anterior
      </button>
      <span className="px-4 py-2 mx-1 text-lg">
        Página {paginaAtual + 1} de {totalPaginas}
      </span>
      <button
        onClick={() => changePage(1)}
        disabled={paginaAtual === totalPaginas - 1}
        className="px-4 py-2 mx-1 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
      >
        Próxima
      </button>
    </div>
  );
};
