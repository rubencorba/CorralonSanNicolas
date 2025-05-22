import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTipoUsuario } from "../../redux/actions";

function CambiarTipoUsuarioComponent({ userId, onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = async (data, event) => {
        event.preventDefault();
        // Agregar el campo "id" a los datos
        const finalData = { ...data, id: userId };

        /* const response =  */await dispatch(updateTipoUsuario(finalData));
        //Luego falta sumar una animación que confirme la actualización,
        navigate(0);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose} /* Cierra al hacer clic fuera */
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                onClick={(e) =>
                    e.stopPropagation()
                } /* Evita que el clic dentro lo cierre */
            >
                <div className="w-[20rem] bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold mb-4 text-center">
                        Cambiar rol del usuario
                    </div>
                    <div className="mb-4">
                        <div className="block text-sm font-medium text-gray-700 mb-2">
                            Tipo
                        </div>

                        <select
                            className="w-full p-2 border rounded"
                            placeholder= "Seleccionar un rol"
                            {...register("tipo", {
                                required: "Seleccione un rol por favor",
                            })}
                        >
                            <option value="" disabled>
                                Seleccionar un rol
                            </option>
                            <option value="super_admin">Super admin</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="viewer">Viewer</option>

                        </select>

                    </div>
                    <div className="flex flex-col justify-center gap-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#0477AD] text-white rounded w-full font-inter"
                        >
                            Guardar
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-white border border-[#0477AD] text-[#0477AD] font-inter rounded w-full"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CambiarTipoUsuarioComponent;
