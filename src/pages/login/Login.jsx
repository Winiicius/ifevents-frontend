import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import { useForm } from "react-hook-form";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";

function Login() {

    const { login } = useAuth()

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const user = {
            login: data.login,
            senha: data.senha
        };

        try {

            console.log(user);
            const response = await api.post("http://localhost:8080/auth/login", user)

            console.log(response.data);

            // login(response.data) // token

            navigate("/eventos")
        } catch (error) {
            alert(error.response?.data || error.message);
        }
    };

    return (
        <div className="h-screen w-full bg-gray-300 p-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-5 h-auto w-full md:w-2/4 lg:w-2/4 mx-auto bg-white rounded-md shadow-4xl">
                <FormInput
                    label="Login"
                    type="text"
                    placeholder="Email/matrícula"
                    register={register}
                    errors={errors}
                    name="login"
                />
                <div className="flex flex-col mb-2 space-y-2">
                    <FormInput
                        label="Senha"
                        type="password"
                        placeholder="Senha"
                        register={register}
                        errors={errors}
                        name="senha"
                    />
                    <a
                        onClick={() => navigate("/recuperar-senha")}
                        className="text-sm text-blue-500 hover:underline justify-end flex cursor-pointer"
                    >
                        Esqueceu a senha?
                    </a>
                </div>
                <button type="submit" className="bg-green-500 cursor-pointer hover:bg-green-600 transition block w-full p-1.5 rounded-md text-white text-xl">Login</button>
                <div className="space-x-3 flex items-center justify-end">
                    <span className="text-gray-600 font-semibold text-sm">Ainda não possui cadastro?</span>
                    <button className="bg-green-500 cursor-pointer rounded-md hover:bg-green-600 transition text-white p-2"
                        type="button"
                        onClick={() => navigate("/cadastro")}>Cadastrar</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
