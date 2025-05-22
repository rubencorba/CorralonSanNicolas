import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ACompactarRow from "./aCompactarRow";
import { actualizarEstadosAcompactar, consultarCompactacionJuzgado, getAllIngresados } from "../../redux/actions";
import SuccessModal from "../modalsComponent/successModal";
import ErrorModal from "../modalsComponent/errorModal";



function ACompactarComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [loading, setLoading] = useState(true);
    const [vehiculosIngresados, setVehiculosIngresados] = useState([]);
    const [meses, setMeses] = useState(24);
    useEffect(() => {
        const fetchVehiculosIngresados = async () => {
            try {
                const response = await dispatch(getAllIngresados(meses));
                setVehiculosIngresados(response);
            } catch (error) {
                console.error("Error al obtener los vehículos ingresados", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVehiculosIngresados();
    }, [dispatch, meses]);


    const [permiteCompactacion, setPermiteCompactacion] = useState({});
    const [loadingItem, setLoadingItem] = useState({});
    const [checkedItems, setCheckedItems] = useState({});

    const handleCheckChange = async (id, nroActa, lugar) => {
        setLoadingItem(prev => ({ ...prev, [id]: true }));

        let response = true;
        if (nroActa) {
            response = await dispatch(consultarCompactacionJuzgado(nroActa, lugar));
        }

        if (!nroActa || response === true) {
            setCheckedItems(prev => ({
                ...prev,
                [id]: !prev[id],
            }));
            setPermiteCompactacion(prev => ({ ...prev, [id]: true }));
        } else {
            setPermiteCompactacion(prev => ({ ...prev, [id]: false }));
        }

        setLoadingItem(prev => ({ ...prev, [id]: false }));
    };

    const manejarActualizacionEstados = async () => {
        const idsSeleccionados = vehiculosIngresados
            .filter(({ id }) => checkedItems[id])
            .map(({ id }) => id);

        try {
            await dispatch(actualizarEstadosAcompactar(idsSeleccionados));
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
                }} />
            )}
            {mostrarModalError && (
                <ErrorModal closeErrorModal={() => setMostrarModalError(false)} message={"Ocurrió un error"} />
            )}
            <div className="flex  flex-col w-full h-full  p-5">
                <div className="text-[#687073] text-s font-medium font-inter">
                    Selecciona los vehículos que cambiarán su estado a "A compactar"
                </div>
                <div className="text-[#687073] text-s font-medium font-inter mt-2">
                    Vehículos ingresados hace más de{" "}
                    <span className="inline-block">
                        <select
                            value={meses}
                            onChange={(e) => setMeses(e.target.value)}
                            className="bg-white w-[3.5rem] border border-gray-300 rounded px-2 py-1 text-sm text-[#3E4345] focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            {[...Array(24)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </span>{" "}
                    meses:
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
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-4">Cargando vehículos...</div>
                ) : (
                    vehiculosIngresados?.map(({ Acta, Vehiculo, id }) => (
                        <ACompactarRow
                            key={id}
                            actaNro={Acta?.nro || "Sin Acta"}
                            marcaModelo={
                                Vehiculo
                                    ? `${Vehiculo.marcavh} / ${Vehiculo.modelovh}`
                                    : "Sin información"
                            }
                            dominio={Vehiculo?.dominio || "Sin dominio"}
                            checked={!!checkedItems[id]}
                            onCheck={() => handleCheckChange(id, Acta?.nro, Acta?.lugar)}
                            loadingItem={!!loadingItem[id]}
                            permiteCompactacion={permiteCompactacion[id]}
                        />
                    ))
                )}
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

export default ACompactarComponent;
