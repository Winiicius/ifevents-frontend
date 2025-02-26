import { useForm } from "react-hook-form";
import api from "../Api";
import { useNavigate } from "react-router-dom";

function CriarUsuario() {
  const navigate = useNavigate();

  const criarUsuario = async (data) => {
    try {
      const response = await api.post("http://localhost:8080/usuarios", data);
      console.log("Resposta do servidor:", response.data);
      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário.");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="h-screen w-screen bg-gray-300">
      <div className=" relative flex justify-center items-center w-full md:w-3/4 lg:w-3/4 mx-auto shadow-md">
        <h1 className="font-bold text-4xl text-center p-6">Novo usuário</h1>
        <form
          onSubmit={handleSubmit(criarUsuario)}
          className="max-w-md mx-auto p-4 border rounded-lg shadow-md"
        >
          {/* Nome */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Nome:</label>
            <input
              {...register("nome", { required: "Nome é obrigatório" })}
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Email:</label>
            <input
              {...register("email", {
                required: "Email é obrigatório",
                pattern: { value: /\S+@\S+\.\S+/, message: "Email inválido" },
              })}
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* <div className="mb-4">
            <label className="block text-sm font-medium">Senha:</label>
            <input
              type="password"
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter pelo menos 6 caracteres",
                },
              })}
              className="w-full p-2 border rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div> */}

          {/* Tipo de Usuário */}
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Tipo de Usuário:
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  {...register("tipo", {
                    required: "Selecione um tipo de usuário",
                  })}
                  value="ALUNO"
                  className="mr-2"
                />
                Aluno
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  {...register("tipo", {
                    required: "Selecione um tipo de usuário",
                  })}
                  value="PROFESSOR"
                  className="mr-2"
                />
                Professor
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  {...register("tipo", {
                    required: "Selecione um tipo de usuário",
                  })}
                  value="COORDENADOR"
                  className="mr-2"
                />
                Coordenador
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  {...register("tipo", {
                    required: "Selecione um tipo de usuário",
                  })}
                  value="CONVIDADO"
                  className="mr-2"
                />
                Convidado
              </label>
            </div>
            {errors.tipo && (
              <p className="text-red-500 text-sm">{errors.tipo.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
export default CriarUsuario;
