import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Th from "../components/Th";
import Td from "../components/Td";
import api from "../api";

function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const editarUsuario = (usuarioSelecionado) => {
    navigate("/usuarios", { state: { usuario: usuarioSelecionado } });
  };

  const deletarUsuario = async (id) => {
    await api
      .delete(`/usuarios/${id}`)
      .then(() => {
        setUsuarios(usuarios.filter((user) => user.id !== id));
      })
      .catch((error) => console.error("Erro ao excluir usuário:", error));
  };

  const criarUsuario = () => {
    navigate("/usuarios");
  };

  useEffect(() => {
    api
      .get("/usuarios")
      .then((response) => {
        console.log(response.data);
        const r = response.data;
        setUsuarios(r);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="h-screen w-screen bg-gray-300">
        <div className=" relative flex justify-center items-center w-full md:w-3/4 lg:w-3/4 mx-auto shadow-md">
          <h1 className="font-bold text-4xl text-center p-6">
            Usuários Cadastrados
          </h1>
          <button
            onClick={() => criarUsuario()}
            className="absolute right-0 px-6 py-2 bg-green-500 mr-2 text-white rounded-lg font-bold hover:bg-blue-600 cursor-pointer"
          >
            Criar usuário
          </button>
        </div>

        {/* <div className="mb-5 w-full md:w-3/4 lg:w-3/4 mx-auto p-10 bg-white rounded-lg shadow-md "></div> */}

        <div className="mt-2 w-full md:w-3/4 lg:w-3/4 mx-auto p-10 bg-white rounded-lg shadow-md">
          {/* {usuarios.lenght > 0 ? ( */}
          <table className="min-w-full bg-gray-200 border border-gray-200">
            <thead className="">
              <tr>
                <Th nome={"Id"} />
                <Th nome={"Nome"} />
                <Th nome={"Email"} />
                <Th nome={"Tipo"} />
                <Th nome={"Editar"} />
                <Th nome={"Deletar"} />
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => {
                return (
                  <tr key={usuario.id}>
                    <Td atributo={usuario.id} />
                    <Td atributo={usuario.nome} />
                    <Td atributo={usuario.email} />
                    <Td atributo={usuario.tipo} />
                    <td className="px-4 py-2 border border-black ">
                      <button
                        onClick={() => editarUsuario(usuario)}
                        className="bg-green-500 w-full h-full my-2 text-white rounded-md cursor-pointer"
                      >
                        Editar
                      </button>
                    </td>
                    <td className="px-4 py-2 border border-black ">
                      <button
                        onClick={() => deletarUsuario(usuario.id)}
                        className="bg-green-500 w-full h-full my-2 text-white rounded-md cursor-pointer"
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* ) : (<p>Nenhum usuário cadastrado</p>)} */}
        </div>
        <footer></footer>
      </div>
    </>
  );
}

export default ListarUsuarios;
