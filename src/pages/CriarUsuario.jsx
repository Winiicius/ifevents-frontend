import { useForm } from "react-hook-form";
import api from "../api";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function CriarUsuario() {
  const navigate = useNavigate();
  const location = useLocation();
  const usuarioParaEditar = location.state?.usuario;

  const criarOuEditarUsuario = async (data) => {
    try {
      console.log(usuarioParaEditar);
      if (usuarioParaEditar) {
        // Se há um usuário para editar, fazemos uma requisição PUT
        await api.put(
          `http://localhost:8080/usuarios/${usuarioParaEditar.id}`,
          data
        );
        alert("Usuário atualizado com sucesso!");
      } else {
        // Caso contrário, fazemos uma requisição POST para criar um novo usuário
        console.log(data);
        await api.post("/auth/register", data)

        alert("Usuário cadastrado com sucesso!");
      }
      navigate("/");
    } catch (error) {
      console.error("Erro ao processar usuário:", error);
      alert("Erro ao processar usuário.");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: usuarioParaEditar || {},
  });

  // Resetar o formulário com os dados do usuário para editar, se houver
  useEffect(() => {
    if (usuarioParaEditar) {
      reset(usuarioParaEditar);
    }
  }, [usuarioParaEditar, reset]);

  return (
    <div className="h-screen w-screen bg-gray-300">
      <div className=" relative flex justify-center items-center w-full md:w-3/4 lg:w-3/4 mx-auto shadow-md">
        <h1 className="font-bold text-4xl text-center p-6">
          {usuarioParaEditar ? "Editar Usuário" : "Novo Usuário"}
        </h1>
        <form
          onSubmit={handleSubmit(criarOuEditarUsuario)}
          className="max-w-md mx-auto p-4 border rounded-lg shadow-md"
        >
          {/* Nome */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Nome:</label>
            <input
              {...register("nome", { required: "Nome é obrigatório" })}
              className="w-full p-2 border rounded"
            />
            {errors.nome && (
              <p className="text-red-500 text-sm">{errors.nome.message}</p>
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

          {/* Senha */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Senha:</label>
            <input
              {...register("senha", {
                required: "Senha é obrigatória",
                pattern: { message: "Senha inválida" },
              })}
              className="w-full p-2 border rounded"
            />
            {errors.senha && (
              <p className="text-red-500 text-sm">{errors.senha.message}</p>
            )}
          </div>

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
            {usuarioParaEditar ? "Atualizar" : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CriarUsuario;
