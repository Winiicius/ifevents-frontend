import { useAuth } from "../context/AuthContext";

function MainHeader() {
  const { logout } = useAuth();
  return (
    <nav className="w-screen h-20 bg-green-500 flex justify-between items-center text-white">
      <h3 className="font-bold ml-10 text-4xl">
        <a href="/">IFEvents</a>
      </h3>
      <div className="font-bold mr-6">
        <a href="" className="text-right p-2">
          sobre
        </a>
        <a onClick={() => logout()} href="/login" className="p-2">
          sair
        </a>
      </div>
    </nav>
  );
}

export default MainHeader;
