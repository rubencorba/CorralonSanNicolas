import { useEffect, useState } from "react";
import Navbar from "../navbar/navbarComponent";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIdSecuestroByNroActa, getLevantamientos } from "../../redux/actions";
import RetiraLevantamiento from "./retiraLevantamiento";
import ErrorModal from "../modalsComponent/errorModal";



function LevantamientosComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [levantamientos, setLevantamientos] = useState([]);

    useEffect(() => {
        const fetchLevantamientos = async () => {
            try {
                const response = await dispatch(getLevantamientos());
    
                if (Array.isArray(response)) {
                    setLevantamientos(response);
                }
            } catch (error) {
                console.error("Error al obtener los vehículos", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLevantamientos();
    }, [dispatch]);

    const [modalRetiraOpen, setModalRetiraOpen] = useState(false);
    const [retiraMessage, setRetiraMessage] = useState("");

    const openRetiraModal = (retira) => {
        setModalRetiraOpen(true);
        setRetiraMessage(retira)
    }
    const closeRetiraModal = () => setModalRetiraOpen(false);


    const [errorModalOpen, setErrorModalOpen] = useState(false);

    const openErrorModal = () => {
        setErrorModalOpen(true);
    }
    const closeErrorModal = () => setErrorModalOpen(false);

    const [errorMessage, setErrorMessage] = useState("");
    const handleVerDetalle = async (nroActa) => {
        const response = await dispatch(getIdSecuestroByNroActa(nroActa));

        if (response.message) {
            setErrorMessage(response.message)
            openErrorModal()
        } else {
            navigate(`/detail/${response.id}`)
        }
    }


    return (
        <div className="bg-[#F5FAFF] flex flex-col justify-center">

            {/* Render condicional para ver información de quien retira el vehículo */}
            {modalRetiraOpen && (
                <RetiraLevantamiento closeRetiraModal={closeRetiraModal} retira={retiraMessage} />
            )}

            {/* Render condicional para modal de error */}
            {errorModalOpen && (
                <ErrorModal closeErrorModal={closeErrorModal} message={errorMessage} />
            )}

            <Navbar />
            <div className="min-h-screen">
                <div className="flex  flex-col items-center w-full h-full gap-8">
                    <div className="flex flex-col justify-center items-start sm:items-center text-start sm:text-center inline-flex mt-[1rem] sm:mt-[4rem] w-[20rem] sm:w-[32rem]">
                        <div className="text-[#3d4245] sm:text-[2rem] text-[1rem] font-bold font-inter">
                            Levantamientos
                        </div>
                        <div className="text-[#687073] sm:text-lg text-s font-medium font-inter">
                            Vehículos en corralón que pueden ser entregados
                        </div>
                    </div>
                </div>



                <div className="mx-auto my-[3rem] rounded-lg border border-[#c5dfff] flex flex-col overflow-hidden sm:w-[32rem] w-[20rem]">
                    {/* Encabezado */}
                    <div className="flex items-center bg-[#c5dfff] h-[3.5rem] px-4">
                        <div className="text-start text-[#0a5477] text-xs font-bold font-inter uppercase flex-[0.5]">
                            Acta
                        </div>
                        <div className="text-center text-[#0a5477] text-xs font-bold font-inter uppercase flex-1">
                            Marca / Modelo
                        </div>
                        <div className="text-center text-[#0a5477] text-xs font-bold font-inter uppercase flex-1">
                            Dominio
                        </div>
                        <div className="text-center text-[#0a5477] text-xs font-bold font-inter uppercase flex-[0.6]">
                            Retira
                        </div>
                        <div className="text-center text-[#0a5477] text-xs font-bold font-inter uppercase flex-[0.5]">
                            Acción
                        </div>
                    </div>

                    {/* Cuerpo de la tabla */}
                    {loading ? (
                        <div className="text-center py-4">Cargando vehículos...</div>
                    ) : levantamientos.length === 0 ? (
                        <div className="text-center py-4 text-[#3d4245] font-medium">
                            No hay levantamientos en este momento.
                        </div>
                    ) : (
                        levantamientos?.map(({ nroActa, vehiculo, retira, id }, index) => (
                            <div
                                key={index}
                                className="h-20 bg-white border-b border-[#c5dfff] flex items-center px-4"
                            >
                                <div className="text-[#3d4245] text-base font-semibold font-inter flex-[0.5]">
                                    {nroActa ?? "Sin Acta"}
                                </div>
                                <div className="text-[#3d4245] text-base font-semibold font-inter flex-1 text-center">
                                    {vehiculo.marca ? `${vehiculo.marca} / ${vehiculo.modelo}` : "Sin información"}
                                </div>
                                <div className="text-[#3d4245] text-base font-semibold font-inter flex-1 text-center">
                                    {vehiculo.dominio ? `${vehiculo.dominio}` : "Sin dominio"}
                                </div>
                                <div className="text-[#3d4245] text-base font-semibold font-inter flex-[0.6] text-center">
                                    {/* {retira} */}
                                    <button
                                        type="button"
                                        onClick={() => openRetiraModal(retira)}
                                        className="px-2 py-2 bg-white rounded-lg border border-[#0477ad] text-[#0477ad] text-sm font-medium font-inter"
                                    >
                                        Ver
                                    </button>
                                </div>
                                <div className="flex justify-center flex-[0.5]">
                                    <button
                                        type="button"
                                        onClick={() => handleVerDetalle(nroActa)}
                                        className="px-2 py-2 bg-white rounded-lg border border-[#0477ad] text-[#0477ad] text-sm font-medium font-inter"
                                    >
                                        Detalle
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default LevantamientosComponent;
