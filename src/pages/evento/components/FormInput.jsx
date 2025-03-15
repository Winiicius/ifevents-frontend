function FormInput({ label, type, register, errors, name, required, ...rest }) {
    return (
        <div className="flex flex-col">
            <label className="font-semibold">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                {...register(name, { required: required && "Este campo é obrigatório" })}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...rest}
            />
            {errors[name] && <span className="text-red-500 text-sm">{errors[name].message}</span>}
        </div>
    );
}

export default FormInput;