import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CardComponent({
  id,
  tipo,
  dominio,
  egreso,
  numeroActa,
  lugar,
  fecha_hora,
  foto,
  compactado,
  estadoBd
}) {
  const date = new Date(fecha_hora); // Fecha en UTC

  // Ajustar a zona horaria de Argentina
  const options = { timeZone: "America/Argentina/Buenos_Aires", hour12: false };

  //---------------Estado actual------------------------//
  const [estado, setEstado] = useState("");

  useEffect(() => {
    if (estadoBd !== null) {
      setEstado(estadoBd)
    } else {
      if (compactado !== null) {
        setEstado("Compactado")
      } else if (compactado === null && egreso !== null) {
        setEstado("Egresado")
      } else if (compactado === null && egreso === null) {
        setEstado("Ingresado")
      }
    }
  }, [compactado,egreso,estadoBd]);


  // Foto
    const env = process.env.REACT_APP_ENVIRONMENT || "development";  // Detectar el entorno (development, stage, production)

  // Directorios según el entorno
  const remoteDir = env === "production" ? "images/corralon/production/fotos" : "images/corralon/stage/fotos";


    const urlFoto = `https://staticcontent.sannicolasciudad.gob.ar/${remoteDir}/${foto}`;

  return (
    <Link
      to={`/detail/${id}`}
      class="flex overflow-hidden border-[0.5px] items-center bg-white border border-[#C5E0FF] gap-1 pr-1 rounded-lg shadow-[1px_2px_8px_1px_rgba(219,219,219,0.45)] flex-row md:max-w-xl"
    >
      <div class="w-full md:w-1/2 h-full">
      {foto?(

        <img
          class="object-cover w-full h-full rounded-l-lg md:rounded-none md:rounded-s-lg"
          src={urlFoto}
          alt="vehiculo"
        />
      ):(
        <div className="text-[#3d4245] text-[3rem] font-bold font-inter justify-center flex text-center items-center border w-auto h-full">Sin foto</div>
      )}
      </div>
      <div className="flex flex-col justify-between px-2 leading-normal gap-1.5">
        <div className="mb-1 text-[18px] font-inter font-bold break-words  text-[#3E4345] ">
          {tipo}, {dominio.toUpperCase()}
        </div>
        <div className="gap-1">
          <div class="self-stretch text-[#687073] text-[14px] font-inter font-medium break-words">
            Estado: {estado}
          </div>
          <div class="self-stretch text-[#687073] text-[14px] font-inter font-medium break-words">
            N° acta: {numeroActa}
          </div>
          <div class="text-[#687073] text-[14px] font-inter font-medium break-words">
            {lugar}
          </div>
          <div class="self-stretch text-[#687073] text-[14px] font-inter font-medium break-words">
            {date.toLocaleString("es-AR", options)}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CardComponent;
