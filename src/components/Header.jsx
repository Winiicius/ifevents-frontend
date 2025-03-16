import HeaderLogin from "./HeaderLogin";
import MainHeader from "./MainHeader";
import { useLocation } from "react-router-dom";

function Header() {

  const location = useLocation(); // Hook para obter a rota atual

  const conteudoHeader = () => {
    switch (location.pathname) {
      case '/login':
        return <HeaderLogin title="Realizar Login" />
      case '/cadastro':
        return <HeaderLogin title="Realizar Cadastro" />
      case '/recuperar-senha':
        return <HeaderLogin title="Recuperar Senha" />
      default:
        return <MainHeader />
    }
  };

  return (
    conteudoHeader()
  )
}
export default Header;
