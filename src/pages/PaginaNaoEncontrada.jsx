import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="p-6 h-screen w-full bg-gray-300">
            <div className="flex flex-col bg-white md:w-3/4 lg:w-3/4 items-center rounded-2xl mx-auto p-3">
                <p className="font-bold text-2xl text-center p-2">
                    Erro 404: Página não encontrada
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-green-500 text-white rounded-sm w-30 hover:bg-green-600 transition mt-3"
                >
                    Voltar para Home
                </button>
            </div>
        </div>
    );
}

export default NotFound;
