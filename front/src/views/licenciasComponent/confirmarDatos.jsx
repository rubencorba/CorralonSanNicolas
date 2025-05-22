import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postLicencia } from "../../redux/actions";

function ConfirmarDatosLicencia({ closeConfirmarDatosLicencia, openSuccessModal }) {
  const dispatch = useDispatch();

  const dataIngresoLicencia = useSelector((state) => state.dataIngresoLicencia);
  const fotoLicencia = useSelector((state) => state.fotoLicencia);
  const tipoCurrentUser = useSelector((state) => state.tipoCurrentUser);

  const formatFecha = (fecha_hora) => {
    const date = new Date(fecha_hora);
    return date.toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const [data, setData] = useState({});

  useEffect(() => {
    setData({
      ...dataIngresoLicencia,
      foto: fotoLicencia || null
    });

  }, [dataIngresoLicencia, fotoLicencia]);

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    const formData = new FormData();

    // Agregar los datos al FormData
    for (const key in data) {
      if (key === "foto") {
        if (data[key]) {
          formData.append("foto", data[key]); // Solo agregamos la foto si existe
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      await dispatch(postLicencia(formData));
      closeConfirmarDatosLicencia()
      openSuccessModal()
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };


  return (

      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        onClick={closeConfirmarDatosLicencia}
      >
        <div
          className="flex flex-col gap-4  bg-[#F5FAFF] rounded-[8px]  border p-4"
          onClick={(e) =>
            e.stopPropagation()
          }
        >
          <div className="sm:gap-4 bg-white rounded-[8px]  border border-[#61ABCF] divide-y divide-[#61ABCF]">
            <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
              <dt className=" text-sm/6 font-bold text-[#036395] font-inter">
                Verificar la información
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0"></dd>
            </div>
            <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
              <dt className="text-sm/6 font-medium text-gray-900">
                Apellido y nombres
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                {dataIngresoLicencia?.nombre}
              </dd>
            </div>
            <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
              <dt className="text-sm/6 font-medium text-gray-900">DNI</dt>
              <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                {dataIngresoLicencia?.dni}
              </dd>
            </div>
            <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
              <dt className="text-sm/6 font-medium text-gray-900">Numero</dt>
              <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                {dataIngresoLicencia?.numero}
              </dd>
            </div>
            <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
              <dt className="text-sm/6 font-medium text-gray-900">
                Fecha y Hora
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                <span>{formatFecha(dataIngresoLicencia?.fecha_hora)}</span>
              </dd>
            </div>
            <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
              <dt className="text-sm/6 font-medium text-gray-900">
                Observaciones
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                <span>{dataIngresoLicencia?.observaciones}</span>
              </dd>
            </div>


          </div>

          <div className="w-full inline-flex gap-[1rem]">
            <button
              onClick={closeConfirmarDatosLicencia}
              className="w-full h-[45px] px-[4px] py-[6px] bg-white rounded-[8px] overflow-hidden justify-center items-center flex text-[#0477AD] border border-[#0477AD] text-[16px] font-inter font-semibold gap-[4px]"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading || tipoCurrentUser === "viewer"}
              className={`w-full h-[45px] px-[4px] py-[6px] bg-[#0477AD] rounded-[8px] overflow-hidden justify-center items-center flex text-[#F6F5F5] text-[16px] font-inter font-semibold gap-[4px]"
                ${loading || tipoCurrentUser === "viewer" ? "bg-gray-400 cursor-not-allowed" : "bg-[#0477ad]"
                }`}
                >
              {loading ? (
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                <div className="text-[#f6f5f5] text-center font-semibold font-inter">
                  Ingresar licencia
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
  );
}

export default ConfirmarDatosLicencia;
