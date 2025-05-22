import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actualizarEstadosDesconocido, getAllIngresados } from "../../redux/actions";
import IngresadoRow from "./ingresadoRow";
import Navbar from "../navbar/navbarComponent";
import SuccessModal from "../modalsComponent/successModal";
import ErrorModal from "../modalsComponent/errorModal";



function StockActualComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [vehiculosIngresados, setVehiculosIngresados] = useState(true);
    useEffect(() => {
        const fetchVehiculosIngresados = async () => {
            try {
                const response = await dispatch(getAllIngresados(0));
                setVehiculosIngresados(response);
            } catch (error) {
                console.error("Error al obtener los vehículos ingresados", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVehiculosIngresados();
    }, [dispatch]);



    const [checkedItems, setCheckedItems] = useState({});

    const handleCheckChange = (id) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const seleccionarTodos = () => {
        const nuevosChecks = {};
        vehiculosIngresados.forEach(({ id }) => {
            nuevosChecks[id] = true;
        });
        setCheckedItems(nuevosChecks);
    };

    const manejarActualizacionEstados = async () => {
        const idsNoSeleccionados = vehiculosIngresados
            .filter(({ id }) => !checkedItems[id])
            .map(({ id }) => id);

        try {
            await dispatch(actualizarEstadosDesconocido(idsNoSeleccionados));
            setMostrarModalExito(true);
        } catch (error) {
            console.error("Error al actualizar estados:", error);
            setMostrarModalError(true);
        }
    };

    const [mostrarModalExito, setMostrarModalExito] = useState(false);
    const [mostrarModalError, setMostrarModalError] = useState(false);

    return (
        <div className="bg-[#F5FAFF] flex flex-col justify-center">
            {mostrarModalExito && (
                <SuccessModal closeSuccessModal={() => {
                    setMostrarModalExito(false);
                    navigate(0)
                  }}/>
            )}
            {mostrarModalError && (
                <ErrorModal closeErrorModal={() => setMostrarModalError(false)} message={"Ocurrió un error"}/>
            )}
            <Navbar />
            <div className="min-h-screen">
                <div className="flex  flex-col items-center w-full h-full gap-8">
                    <div className="flex flex-col justify-center items-start sm:items-center text-start inline-flex mt-[1rem] sm:mt-[4rem] w-[20rem] sm:w-[32rem]">
                        <div className="text-[#3d4245] sm:text-[2rem] text-[1rem] font-bold font-inter">
                            Stock actual
                        </div>
                        <div className="text-[#687073] sm:text-lg text-s font-medium font-inter inline-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                            </svg>

                            Selecciona los vehículos que se encuentran actualmente en corralón
                        </div>
                        <div className="text-[#687073] sm:text-lg text-s font-medium font-inter inline-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                            </svg>
                            Al final de la lista encontrará el botón para completar la operación
                        </div>
                        <div className="text-[#687073] sm:text-lg text-s font-medium font-inter inline-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                            </svg>
                            Los vehículos no seleccionados pasarán a tener estado "Desconocido"
                        </div>
                    </div>
                </div>

                <div className="mx-auto mb-[3rem] mt-[1rem] rounded-lg border border-[#c5dfff] flex flex-col overflow-hidden sm:w-[32rem] w-[20rem]">
                    {/* Encabezado */}
                    <div className="flex items-center bg-[#c5dfff] h-[3.5rem] px-4">
                        <div className="text-start text-[#0a5477] text-xs font-bold font-inter uppercase flex-[0.5]">
                            Nro Acta
                        </div>
                        <div className="text-center text-[#0a5477] text-xs font-bold font-inter uppercase flex-1">
                            Marca / Modelo
                        </div>
                        <div className="text-center text-[#0a5477] text-xs font-bold font-inter uppercase flex-1">
                            Dominio
                        </div>
                        <div className="text-center text-[#0a5477] text-xs font-bold font-inter uppercase flex-[0.5]">
                            {/* Acción */}
                            <button
                                type="button"
                                onClick={seleccionarTodos}
                                className="px-2 py-1 bg-white rounded-lg border border-[#0477ad] text-[#0477ad] text-sm font-medium font-inter"
                            >
                                Seleccionar todos
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-4">Cargando vehículos...</div>
                    ) : (
                        vehiculosIngresados?.map(({ Acta, Vehiculo, id }) => (
                            <IngresadoRow
                                key={id}
                                actaNro={Acta?.nro || "Sin Acta"}
                                marcaModelo={
                                    Vehiculo
                                        ? `${Vehiculo.marcavh} / ${Vehiculo.modelovh}`
                                        : "Sin información"
                                }
                                dominio={Vehiculo?.dominio || "Sin dominio"}
                                checked={!!checkedItems[id]}
                                onCheck={() => handleCheckChange(id)}
                            />
                        ))
                    )}
                </div>
            </div>
            <button
                className="bg-[#0477ad] text-white px-4 py-2 rounded-lg font-inter font-semibold mx-auto mb-[3rem] block"
                onClick={manejarActualizacionEstados}
            >
                Actualizar estados
            </button>
        </div>
    );
}

export default StockActualComponent;