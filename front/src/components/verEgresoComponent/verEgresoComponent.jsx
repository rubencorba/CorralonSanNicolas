import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getEgreso } from "../../redux/actions";

function VerEgresoComponent({ idSecuestro, closeVerEgreso }) {
  const dispatch = useDispatch();

  const [egreso, setEgreso] = useState({});

  useEffect(() => {
    const fetchEgreso = async () => {
      const resp = await dispatch(getEgreso(idSecuestro));
      setEgreso(resp);
    };

    fetchEgreso();
  }, [dispatch, idSecuestro]);

  const { bPago,domicilio,dni,fecha_hora,firma,licencia,nombreCompleto,obs,tarjetaVerde,User } = egreso;

   //-----------------Fecha y Hora--------------//

   const date = new Date(fecha_hora); // Fecha en UTC
   // Ajustar a zona horaria de Argentina
   const options = { timeZone: "America/Argentina/Buenos_Aires", hour12: false };

   //-----------------Firma--------------//

   const env = process.env.REACT_APP_ENVIRONMENT || "development";  // Detectar el entorno (development, stage, production)


  // Directorios según el entorno
  const remoteDir = env === "production" ? "images/corralon/production/firmas_secuestros" : "images/corralon/stage/firmas_secuestros";


    const urlFirma = `https://staticcontent.sannicolasciudad.gob.ar/${remoteDir}/${firma}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={closeVerEgreso} /* Cierra al hacer clic fuera */
    >
      <div
        className="flex flex-col gap-4  bg-[#F5FAFF] rounded-[8px]  border p-4"
        onClick={(e) =>
          e.stopPropagation()
        } /* Evita que el clic dentro lo cierre */
      >
        <div className="sm:gap-4 bg-white rounded-[8px]  border border-[#61ABCF] divide-y divide-[#61ABCF]">
          <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
            <dt className=" text-sm/6 font-bold text-[#036395] font-inter">
              EGRESO
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0"></dd>
          </div>
          <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
            <dt className="text-sm/6 font-medium text-gray-900">
              Apellido y nombres
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
              {nombreCompleto}
            </dd>
          </div>
          <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
            <dt className="text-sm/6 font-medium text-gray-900">DNI</dt>
            <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
              {dni}
            </dd>
          </div>
          <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
            <dt className="text-sm/6 font-medium text-gray-900">Domicilio</dt>
            <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
              {domicilio}
            </dd>
          </div>
          <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
            <dt className="text-sm/6 font-medium text-gray-900">
              Fecha y Hora
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
              <span>{date.toLocaleString("es-AR", options)}</span>
            </dd>
          </div>

          <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
            <dt className="text-sm/6 font-medium text-gray-900">Licencia</dt>
            <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
              {licencia}
            </dd>
          </div>
          <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
            <dt className="text-sm/6 font-medium text-gray-900">
              Tarjeta verde
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
              {tarjetaVerde}
            </dd>
          </div>
          <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
            <dt className="text-sm/6 font-medium text-gray-900">
              Boleta de pago
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
              {bPago}
            </dd>
          </div>
          <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
            <dt className="text-sm/6 font-medium text-gray-900">
              Observaciones
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
              {obs}
            </dd>
          </div>
          <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
            <dt className="text-sm/6 font-medium text-gray-900">
              Firma
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0 max-w-[10rem]">
              <img src={urlFirma} alt="firma" />

            </dd>
          </div>
        </div>

        <div className="sm:gap-4 bg-white rounded-[8px]  border border-[#61ABCF] divide-y divide-[#61ABCF]">
          <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
            <dt className=" text-sm/6 font-bold text-[#036395] font-inter">
              USUARIO
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0"></dd>
          </div>
          <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
            <dt className="text-sm/6 font-medium text-gray-900">
              Apellido y nombres
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
              {User?.nombreCompleto}
            </dd>
          </div>
          <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
            <dt className="text-sm/6 font-medium text-gray-900">DNI</dt>
            <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
              {User?.dni}
            </dd>
          </div>
        </div>
        <button
          onClick={closeVerEgreso}
          class="w-full h-[45px] px-[4px] py-[6px] bg-[#0477AD] rounded-[8px] overflow-hidden justify-center items-center flex text-[#F6F5F5] text-[16px] font-inter font-semibold gap-[4px]"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default VerEgresoComponent;
