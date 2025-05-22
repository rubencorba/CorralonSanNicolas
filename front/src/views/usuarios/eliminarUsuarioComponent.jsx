import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateTipoUsuario } from "../../redux/actions";

function EliminarUsuarioComponent({ userId, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
  } = useForm();


  const onSubmit = async () => {

    // Agregar el campo "id" a los datos
    const finalData = {
      tipo: "eliminado",
      id: userId
    };
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
            Eliminar usuario
          </div>


          <div className="mb-4">

            <label className="block text-m font-medium mb-2 text-center">
              Confirma la eliminación de este usuario?
            </label>

          </div>

          <div className="flex flex-col justify-center gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[#0477AD] text-white rounded w-full font-inter"
            >
              Confirmar
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

export default EliminarUsuarioComponent;
