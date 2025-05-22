import { useEffect, useState } from "react";
import EgresarLicenciaComponent from "./egresarLicencia";
import VerEgresoLicenciaComponent from "./verEgresoLicencia";
import CargarFotoLicencia from "./cargarFoto";
import TakeFotoToUpdate from "./takeFotoToUpdate";
import { useSelector } from "react-redux";

function LicenciaCardComponent({
  id, dni, nombre, fecha_hora, egresada, observaciones, tipo, foto
}) {

  const tipoCurrentUser = useSelector((state) => state.tipoCurrentUser);


  //-------------------Estado actual------------------------//
  const [estado, setEstado] = useState("");

  useEffect(() => {
    if (egresada !== null) {
      setEstado("Egresada")
    } else {
      setEstado("Ingresada")
    }
  }, [egresada]);


  // Foto
  const env = process.env.REACT_APP_ENVIRONMENT || "development";

  // Directorios según el entorno
  const remoteDir = env === "production" ? "images/corralon/production/fotos_licencias" : "images/corralon/stage/fotos_licencias";


  const urlFoto = `https://staticcontent.sannicolasciudad.gob.ar/${remoteDir}/${foto}`;


  // Fecha_hora
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

  const [isEgresarLicenciaOpen, setIsEgresarLicenciaOpen] = useState(false);
  
  const openModalEgresoLicencia = () => setIsEgresarLicenciaOpen(true);
  const closeModalEgresoLicencia = () => setIsEgresarLicenciaOpen(false);
  
  const [isVerEgresoLicenciaOpen, setIsVerEgresoLicenciaOpen] = useState(false);
  
  const openModalVerEgresoLicencia = () => setIsVerEgresoLicenciaOpen(true);
  const closeModalVerEgresoLicencia = () => setIsVerEgresoLicenciaOpen(false);

  const [isCargarFotoOpen, setIsCargarFotoOpen] = useState(false);

  const openCargarFoto = () => setIsCargarFotoOpen(true);
  const closeCargarFoto = () => setIsCargarFotoOpen(false);

  const [isTakeFotoToUpdateOpen, setIsTakeFotoToUpdateOpen] = useState(false);

  const openTakeFotoToUpdate = () => {
    setIsTakeFotoToUpdateOpen(true);
    closeCargarFoto()
  };
  const closeTakeFotoToUpdate = () => setIsTakeFotoToUpdateOpen(false);

  return (

    <div>
      {/* Render condicional para egresar licencia */}
      {isEgresarLicenciaOpen && <EgresarLicenciaComponent closeModalEgresoLicencia={closeModalEgresoLicencia} dni={dni} observaciones={observaciones} id={id} />}
      {/* Render condicional para ver egreso de licencia */}
      {isVerEgresoLicenciaOpen && <VerEgresoLicenciaComponent closeModalVerEgresoLicencia={closeModalVerEgresoLicencia} idLicencia={id} />}

      {/* Render condicional para tomar foto */}
      {isTakeFotoToUpdateOpen && <TakeFotoToUpdate closeTakeFotoToUpdate={closeTakeFotoToUpdate} id={id}/* dni={dni} observaciones={observaciones} id={id} */ />}

      {/* Render condicional para cargar foto */}
      {isCargarFotoOpen && <CargarFotoLicencia closeCargarFoto={closeCargarFoto} openTakeFotoToUpdate={openTakeFotoToUpdate} id={id} />}
      <div className="flex overflow-hidden border-[0.5px] items-center bg-white border border-[#C5E0FF] gap-1 pr-1 p-3 rounded-lg shadow-[1px_2px_8px_1px_rgba(219,219,219,0.45)] flex-row md:max-w-xl">
        <div className="w-full md:w-1/2 h-full">
          {foto ? (

            <img
              className="object-cover w-[8rem] h-full rounded"
              src={urlFoto}
              alt="foto licencia"
            />
          ) : (
            <button
              onClick={openCargarFoto}
              disabled={tipoCurrentUser === "viewer"}
              className={`text-[#0477AD] border border-[#0477AD] text-[1.5rem] font-bold font-inter justify-center flex text-center items-center border w-auto h-full rounded
                ${tipoCurrentUser === "viewer" ? "text-gray-400 border-gray-400 cursor-not-allowed" : ""
                }`}
                >Cargar foto
            </button>
          )}
        </div>
        <div className="flex flex-col justify-between px-2 leading-normal gap-1.5 w-full">
          <div className="gap-1">
            <div className="self-stretch text-[#687073] text-[14px] font-inter font-medium break-words">
              DNI: {dni}
            </div>
            <div className="self-stretch text-[#687073] text-[14px] font-inter font-medium break-words">
              Nombre: {nombre}
            </div>
            <div className="self-stretch text-[#687073] text-[14px] font-inter font-medium break-words">
              Fecha Hora: {formatFecha(fecha_hora)}
            </div>
            <div className="self-stretch text-[#687073] text-[14px] font-inter font-medium break-words">
              Estado: {estado}
            </div>
            {/* <div className="self-stretch text-[#687073] text-[14px] font-inter font-medium break-words">
            Tipo: {tipo}
          </div> */}
          </div>

          {estado === "Ingresada" ? (
            <div className="justify-end flex">
              <button
                onClick={openModalEgresoLicencia}
                disabled={tipoCurrentUser === "viewer"}
                className={`w-[6rem] h-[2rem] px-[18px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center gap-1 flex
                  ${tipoCurrentUser === "viewer" ? "bg-gray-400 cursor-not-allowed" : "bg-[#0477ad]"
                  }`}
                  >
                <div className="text-[#f6f5f5] text-base font-semibold font-inter">
                  Egresar
                </div>
              </button>
            </div>
          ) : (
            <div className="justify-end flex">
              <button
                onClick={openModalVerEgresoLicencia}
                className="inline-flex w-[8rem] h-[2rem] px-[18px] py-[13px] bg-gray-700 rounded-lg justify-center items-center gap-1 text-[#f6f5f5] text-base font-semibold font-inter"
              >
                Ver egreso
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LicenciaCardComponent;

