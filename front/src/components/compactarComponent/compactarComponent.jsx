import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postCompactado } from "../../redux/actions";
import { useEffect, useState } from "react";

function CompactarComponent({ idSecuestro, closeModalCompactar, nroActa, lugar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.currentUserId);

  const {
    handleSubmit,
  } = useForm();

  const [fecha_hora, setFecha_hora] = useState("");

  useEffect(() => {
    const obtenerFechaHoraArgentina = () => {
      const ahora = new Date();
      const opciones = {
        timeZone: "America/Argentina/Buenos_Aires",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      const formatoArgentina = new Intl.DateTimeFormat("es-AR", opciones).format(ahora);

      // Formatear la fecha al estilo "YYYY-MM-DD HH:mm:ss"
      return formatoArgentina.replace(/\//g, "-").replace(",", "");
    };

    setFecha_hora(obtenerFechaHoraArgentina())
  }, []);

  const onSubmit = async () => {
    const finalData = { fecha_hora, idSecuestro, userId, nroActa, lugar };
    /* const response =  */await dispatch(postCompactado(finalData));
    //Luego falta sumar una animación que confirme la actualización,
    navigate(0);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeModalCompactar} /* Cierra al hacer clic fuera */
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) =>
          e.stopPropagation()
        } /* Evita que el clic dentro lo cierre */
      >
        <div className="w-[20rem] bg-white p-6 rounded-lg shadow-lg">
          <div className="text-2xl font-bold mb-4 text-center">
            Compactar
          </div>


          <div className="mb-4">

            <label className="block text-m font-medium mb-2 text-center">
              Confirma la compactación de este vehículo?
            </label>

          </div>

          <div className="block text-sm font-medium text-gray-700 mb-3">Fecha/hora: {fecha_hora}</div>



          <div className="flex flex-col justify-center gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[#0477AD] text-white rounded w-full font-inter"
            >
              Confirmar
            </button>
            <button
              onClick={closeModalCompactar} // Cierra el modal
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

export default CompactarComponent;
