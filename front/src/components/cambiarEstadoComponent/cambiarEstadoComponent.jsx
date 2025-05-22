import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateEstado } from "../../redux/actions";

function CambiarEstadoComponent({ onCloseEstado, puedeCompactar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();

  const tipoCurrentUser = useSelector((state) => state.tipoCurrentUser);

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    const finalData = { ...data, id: id };
    /* const response =  */await dispatch(updateEstado(finalData));
    //Luego falta sumar una animación que confirme la actualización,
    navigate(0);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onCloseEstado} /* Cierra al hacer clic fuera */
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) =>
          e.stopPropagation()
        } /* Evita que el clic dentro lo cierre */
      >
        <div className="w-[20rem] bg-white p-6 rounded-lg shadow-lg">
          <div className="text-2xl font-bold mb-4 text-center">
            Cambiar Estado
          </div>
          <div className="mb-4">
            {/* Contenido del formulario */}
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            {(tipoCurrentUser === "admin" || tipoCurrentUser === "super_admin") ? (
              <select
                className="w-full p-2 border rounded"
                {...register("estado", {
                  required: "Seleccione un estado por favor",
                })}
              >
                <option value="" disabled>
                  Seleccionar un estado
                </option>
                <option value="Ingresado">Ingresado</option>
                <option value="Desconocido">Desconocido</option>
                {/* <option value="Compactado">Compactado</option> */} {/* Se debe cambiar a ese estado desde botón "compactar" */}
                <option value="No compactar">No compactar</option> {/* //Esto solo lo puede seleccionar admins */}
                <option
                  value="A compactar"
                  disabled={!puedeCompactar}
                  className={!puedeCompactar ? "text-gray-400 italic" : ""}
                  title={!puedeCompactar ? "No se puede cambiar a este estado por ahora" : ""}
                >
                  {puedeCompactar ? "A compactar" : "A compactar (bloqueado por juzgado)"}
                </option> {/* //Esto solo lo puede seleccionar admins */}

              </select>
            ) : (
              <select
                className="w-full p-2 border rounded"
                {...register("estado", {
                  required: "Seleccione un estado por favor",
                })}
              >

                <option value="" disabled>
                  Seleccionar un estado
                </option>
                <option value="Ingresado">Ingresado</option>
                <option value="Desconocido">Desconocido</option>
              </select>
            )}

          </div>
          <div className="flex flex-col justify-center gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[#0477AD] text-white rounded w-full font-inter"
            >
              Guardar
            </button>
            <button
              onClick={onCloseEstado} // Cierra el modal
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

export default CambiarEstadoComponent;
