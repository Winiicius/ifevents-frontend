import { useNavigate } from "react-router-dom";
import api from "../api"
import { useEffect, useState } from "react";
import Th from "../components/Th";
import Td from "../components/Td";

function Home() {

    const [usuarios, setUsuarios] = useState([])
    const navigate = useNavigate()

    const editarUsuario = () => {
        navigate("/usuario/:id/editar")
    }

    const deletarUsuario = (id) => {

        api.delete(`/usuarios/${id}`)
            .then(() => {

                setUsers(users.filter(user => user.id !== id));

            })
            .catch(error => console.error("Erro ao excluir usuário:", error));
    }

    useEffect(() => {
        api.get("/usuarios")
            .then(response => {
                console.log(response.data);
                setUsuarios(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    return <>
        <div className="h-screen w-screen bg-gray-300">
            <nav className="w-screen h-20  bg-green-500 flex justify-between items-center text-white" >
                <h3 className="font-bold ml-10 text-4xl 
                "><a href="">IFEvents</a></h3>
                <div className="font-bold mr-6">
                    <a href="" className="text-right p-2">sobre</a>
                    <a href="" className="p-2">sair</a>
                </div>
            </nav>
            <h1 className="font-bold text-4xl text-center p-6">Usuários Cadastrados</h1>
            <div className="mt-2 w-full md:w-3/4 lg:w-3/4 mx-auto p-10 bg-white rounded-lg shadow-md ">
                {/* {array.lenght > 0 ? ( */}
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
                            return (<tr key={usuario.id}>
                                <Td atributo={usuario.id} />
                                <Td atributo={usuario.nome} />
                                <Td atributo={usuario.email} />
                                <Td atributo={usuario.tipo} />
                                <td className="px-4 py-2 border border-black ">
                                    <button onClick={() => editarUsuario()} className="bg-green-500 w-full h-full my-2 text-white rounded-md cursor-pointer">Editar</button>
                                </td>
                                <td className="px-4 py-2 border border-black ">
                                    <button onClick={() => deletarUsuario(usuario.id)} className="bg-green-500 w-full h-full my-2 text-white rounded-md cursor-pointer">Deletar</button>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                {/* ) : <p>Nenhum usuário cadastrado</p>} */}
            </div>
            <footer></footer>
        </div>
    </>
}

export default Home;