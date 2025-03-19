import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
// import Cadastro from "./pages/Cadastro";
// import RecuperarSenha from "./pages/RecuperarSenha";
import CriarUsuario from "./pages/CriarUsuario";
import { Evento } from "./components/evento/Evento";
import CriarEvento from "./pages/evento/CriarEvento";
import ListarUsuarios from "./pages/ListarUsuarios";
import Layout from "./layouts/Layout";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import AcessoNegado from "./pages/AcessoNegado";
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login />} />
            {/* <Route path="cadastro" element={<Cadastro />} /> */}
            {/* <Route path="recuperar-senha" element={<RecuperarSenha />} /> */}
            <Route path="acesso-negado" element={<AcessoNegado />} />

            <Route path="eventos" element={<Evento />} />
            <Route element={<ProtectedLayout roles={["COORDENADOR"]} />}>
              <Route path="usuarios" element={<ListarUsuarios />} />
            </Route>
            <Route
              element={
                <ProtectedLayout
                  roles={["COORDENADOR", "PROFESSOR", "ALUNO"]}
                />
              }
            ></Route>
            <Route path="criar-evento" element={<CriarEvento />} />
            <Route path="criar-usuario" element={<CriarUsuario />} />
            <Route
              path="*"
              element={<Navigate to="/pagina-nao-encontrada" replace />}
            />
            <Route
              path="pagina-nao-encontrada"
              element={<PaginaNaoEncontrada />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
