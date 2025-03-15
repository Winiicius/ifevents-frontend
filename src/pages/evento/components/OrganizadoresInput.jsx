import { Controller } from "react-hook-form";
import HelpTooltip from "./HelpToolTip";

function OrganizadoresInput({ control, errors }) {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex items-center">
                <label className="font-semibold">Organizadores (máximo 2 emails)</label>
                <HelpTooltip text="O criador do evento já está incluso como um organizador" />
            </div>

            <Controller
                name="organizadores"
                control={control}
                defaultValue={[]}
                rules={{
                    validate: (value) => value.length <= 2 || "Máximo de 2 organizadores permitido",
                }}
                render={({ field }) => (
                    <div className="space-y-2">
                        {field.value.map((email, index) => (
                            <div key={index} className="flex space-x-2 items-center">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        const newEmails = [...field.value];
                                        newEmails[index] = e.target.value;
                                        field.onChange(newEmails);
                                    }}
                                    placeholder="Email do organizador"
                                    className="border rounded-lg p-2 flex-grow"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newEmails = field.value.filter((_, i) => i !== index);
                                        field.onChange(newEmails);
                                    }}
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                                >
                                    Remover
                                </button>
                            </div>
                        ))}
                        {field.value.length < 2 && (
                            <button
                                type="button"
                                onClick={() => field.onChange([...field.value, ""])}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Adicionar Organizador
                            </button>
                        )}
                        {errors.organizadores && (
                            <span className="text-red-500 text-sm">{errors.organizadores.message}</span>
                        )}
                    </div>
                )}
            />
        </div>
    );
}

export default OrganizadoresInput;