import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
// import Cadastro from "./pages/Cadastro";
// import RecuperarSenha from "./pages/RecuperarSenha";
import CriarUsuario from "./pages/CriarUsuario";
import { Evento } from "./components/evento/Evento";
import CriarEvento from "./pages/evento/CriarEvento";
import ListarUsuarios from "./pages/ListarUsuarios";
import Layout from "./layouts/Layout";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="login" element={<Login />} />
                    {/* <Route path="cadastro" element={<Cadastro />} /> */}
                    {/* <Route path="recuperar-senha" element={<RecuperarSenha />} /> */}
                    <Route path="criar-usuario" element={<CriarUsuario />} />
                    <Route path="usuarios" element={<ListarUsuarios />} />
                    <Route path="eventos" element={<Evento />} />
                    <Route path="criar-evento" element={<CriarEvento />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;