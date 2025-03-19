import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import HelpTooltip from "./components/HelpTooltip";
import FormInput from "../../components/FormInput";
import OrganizadoresInput from "./components/OrganizadoresInput";

function CriarEvento() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // adicionar o email do criador na lista dos organizadores antes de fazer a requisição
    const evento = {
      nomeEvento: data.nomeEvento,
      status: "EM_ANALISE",
      dataEvento: data.dataEvento,
      horaInicio: data.horaInicio,
      horaTermino: data.horaTermino,
      capacidadeMaxima: data.capacidadeMaxima,
      organizadores: data.organizadores,
    };
    try {
      let token = localStorage.getItem("token");
      const response = await api.post("/eventos", evento, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Evento criado com sucesso:", response.data);
    } catch (error) {
      // navigate() // Ir para home (quando existir)
      console.error(
        "Erro ao criar evento:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="h-full w-full bg-gray-300">
      <div className="justify-center items-center w-full md:w-3/4 lg:w-3/4 mx-auto shadow-md pt-2">
        <h1 className="font-bold text-4xl text-center p-6 bg-white shadow-md rounded-md w-full">
          Criar Solicitação de Evento
          <HelpTooltip text="Os Dados informados podem ser alterados pelo coordenador" />
        </h1>
        <div className="mt-3 w-full mx-auto p-10 bg-white rounded-lg shadow-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-3/4 mx-auto p-6 bg-white shadow-2xl rounded-lg space-y-4"
          >
            <FormInput
              label="Nome do Evento"
              type="text"
              register={register}
              errors={errors}
              name="nomeEvento"
              required
            />

            <FormInput
              label="Hora de Início"
              type="time"
              register={register}
              errors={errors}
              name="horaInicio"
              required
            />

            <FormInput
              label="Hora de Término"
              type="time"
              register={register}
              errors={errors}
              name="horaTermino"
              required
            />

            <FormInput
              label="Data do Evento"
              type="date"
              register={register}
              errors={errors}
              name="dataEvento"
              required
            />

            <FormInput
              label="Capacidade Máxima"
              type="number"
              register={register}
              errors={errors}
              name="capacidadeMaxima"
              required
            />

            <OrganizadoresInput control={control} errors={errors} />

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Criar Evento
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CriarEvento;
