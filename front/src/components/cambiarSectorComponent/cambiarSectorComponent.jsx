import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateSector } from "../../redux/actions";

function CambiarSectorComponent({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    // Agregar el campo "id" a los datos
    const finalData = { ...data, id: id };
    console.log(finalData);
    const response = await dispatch(updateSector(finalData));
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
            Cambiar Sector
          </div>
          <div className="mb-4">
            {/* Contenido del formulario */}
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sector
            </label>
            <select
              className="w-full p-2 border rounded"
              {...register("sector", {
                required: "Ingrese un sector por favor",
              })}
            >
              {Array.from({ length: 26 }, (_, i) => {
                const letter = String.fromCharCode(65 + i); // 65 es el código ASCII de 'A'
                return (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                );
              })}
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
              onClick={onClose} // Cierra el modal
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

export default CambiarSectorComponent;
