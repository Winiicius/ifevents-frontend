import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ListarUsuarios from "./pages/ListarUsuarios.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CriarUsuario from "./pages/CriarUsuario.jsx";
import Header from "./components/Header.jsx";
import { Evento } from "./components/evento/Evento.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListarUsuarios />,
  },
  {
    path: "/usuarios",
    element: <CriarUsuario />,
  },
  {
    path: "/eventos",
    element: <Evento />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <RouterProvider router={router} />
  </StrictMode>
);
