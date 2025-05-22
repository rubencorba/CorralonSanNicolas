import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getEgresoLicencia } from "../../redux/actions";

function VerEgresoLicenciaComponent({ closeModalVerEgresoLicencia, idLicencia }) {
    const dispatch = useDispatch();

    const [egreso, setEgreso] = useState({});

    useEffect(() => {
        const fetchEgreso = async () => {
            const resp = await dispatch(getEgresoLicencia(idLicencia));
            setEgreso(resp);
        };

        fetchEgreso();
    }, [dispatch, idLicencia]);


    //-----------------Fecha y Hora--------------//

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

    //-----------------Firma--------------//

    const env = process.env.REACT_APP_ENVIRONMENT || "development";

    // Directorios según el entorno
    const remoteDir = env === "production" ? "images/corralon/production/firmas_licencias" : "images/corralon/stage/firmas_licencias";

    // Determinar si `firma` es una cadena Base64 o un nombre de archivo
    const isBase64 = egreso?.firma?.startsWith("data:image");

    /* const urlFirma = `https://staticcontent.sannicolasciudad.gob.ar/${remoteDir}/${firma}`; */
    const urlFirma = isBase64
        ? egreso?.firma // Si es Base64, lo usamos directamente
        : `https://staticcontent.sannicolasciudad.gob.ar/${remoteDir}/${egreso?.firma}`;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={closeModalVerEgresoLicencia} /* Cierra al hacer clic fuera */
        >
            <div
                className="flex flex-col gap-4  bg-[#F5FAFF] rounded-[8px]  border p-4"
                onClick={(e) =>
                    e.stopPropagation()
                } /* Evita que el clic dentro lo cierre */
            >
                <div className="sm:gap-4 bg-white rounded-[8px]  border border-[#61ABCF] divide-y divide-[#61ABCF]">
                    <div className="flex flex-col py-2  px-4 gap-5">
                        <dt className=" text-sm/6 font-bold text-[#036395] font-inter">
                            LICENCIA EGRESADA
                        </dt>
                        
                    </div>
                    <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
                        <dt className="text-sm/6 font-medium text-gray-900">
                            Fecha y Hora
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                            <span>{formatFecha(egreso?.fecha_hora)}</span>
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
                    <div className="flex flex-col py-2  px-4 gap-5">
                        <dt className=" text-sm/6 font-bold text-[#036395] font-inter">
                            USUARIO QUE EGRESÓ
                        </dt>
                        
                    </div>
                    <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
                        <dt className="text-sm/6 font-medium text-gray-900">
                            Apellido y nombres
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                            {egreso?.User?.nombreCompleto}
                        </dd>
                    </div>
                    <div className="flex flex-col py-2 grid grid-cols-2 px-4 gap-5">
                        <dt className="text-sm/6 font-medium text-gray-900">DNI</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                            {egreso?.User?.dni}
                        </dd>
                    </div>
                </div>
                <button
                    onClick={closeModalVerEgresoLicencia}
                    class="w-full h-[45px] px-[4px] py-[6px] bg-[#0477AD] rounded-[8px] overflow-hidden justify-center items-center flex text-[#F6F5F5] text-[16px] font-inter font-semibold gap-[4px]"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}

export default VerEgresoLicenciaComponent;
