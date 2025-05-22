import { useState } from "react";
import { useSelector } from "react-redux";
import EgresarLicenciaComponent from "./egresarLicencia";

function LicenciaFoundComponent() {

    const licenciaFound = useSelector((state) => state.licenciaFound);
    const tipoCurrentUser = useSelector((state) => state.tipoCurrentUser);
    const [isEgresarLicenciaOpen, setIsEgresarLicenciaOpen] = useState(false);

    const openModalEgresoLicencia = () => setIsEgresarLicenciaOpen(true);
    const closeModalEgresoLicencia = () => setIsEgresarLicenciaOpen(false);

    // Foto
    const env = process.env.REACT_APP_ENVIRONMENT || "development";

    // Directorios según el entorno
    const remoteDir = env === "production" ? "images/corralon/production/fotos_licencias" : "images/corralon/stage/fotos_licencias";

    const urlFoto = `https://staticcontent.sannicolasciudad.gob.ar/${remoteDir}/${licenciaFound?.foto}`;


    return (
        <div>
            {/* Render condicional para egresar licencia */}
            {isEgresarLicenciaOpen && <EgresarLicenciaComponent closeModalEgresoLicencia={closeModalEgresoLicencia} dni={licenciaFound.dni} observaciones={licenciaFound.observaciones} id={licenciaFound.id} />}

            {licenciaFound !== null && (
                <div>
                    Licencia encontrada:
                    <div
                        className="flex overflow-hidden border-[0.5px] items-center bg-white border border-[#0477ad] gap-1 pr-1 p-3 rounded-lg shadow-[1px_2px_8px_1px_rgba(219,219,219,0.45)] flex-row md:max-w-xl"
                    >
                        <div className="w-full md:w-1/2 h-full">
                            {licenciaFound.foto ? (

                                <img
                                    className="object-cover w-full h-full rounded-l-lg md:rounded-none md:rounded-s-lg"
                                    src={urlFoto}
                                    alt="foto licencia"
                                />
                            ) : (
                                <div className="text-[#3d4245] text-[3rem] font-bold font-inter justify-center flex text-center items-center border w-auto h-full">Sin foto</div>
                            )}
                        </div>
                        <div className="flex flex-col justify-between px-2 leading-normal gap-1.5">
                            <div className="gap-1">
                                <div className="self-stretch text-[#687073] text-[14px] font-inter font-medium break-words">
                                    DNI: {licenciaFound.dni}
                                </div>
                                <div className="self-stretch text-[#687073] text-[14px] font-inter font-medium break-words">
                                    Nombre: {licenciaFound.nombre}
                                </div>
                                <div className="self-stretch text-[#687073] text-[14px] font-inter font-medium break-words">
                                    Fecha Hora: {licenciaFound.fecha_hora}
                                </div>
                                <div className="self-stretch text-[#687073] text-[14px] font-inter font-medium break-words">
                                    Estado: {licenciaFound.estado}
                                </div>
                                <div className="self-stretch text-[#687073] text-[14px] font-inter font-medium break-words">
                                    Tipo: {licenciaFound.tipo}
                                </div>
                            </div>

                            <div className="justify-end flex">
                                <button
                                    onClick={openModalEgresoLicencia}
                                    disabled={tipoCurrentUser === "viewer"}
                                    className={`w-[6rem] h-[2rem] px-[18px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center gap-1 flex
                                      ${tipoCurrentUser === "viewer" ? "bg-gray-400 cursor-not-allowed" : "bg-[#0477ad]"
                                      }`}                                >
                                    <div class="text-[#f6f5f5] text-base font-semibold font-inter">
                                        Egresar
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default LicenciaFoundComponent;
