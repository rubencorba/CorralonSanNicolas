import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actualizarEstadosCompactados, getVehiculosAcompactar } from "../../redux/actions";
import SuccessModal from "../modalsComponent/successModal";
import ErrorModal from "../modalsComponent/errorModal";
import CompactadosRow from "./compactadosRow";



function CompactadosComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.currentUserId);

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

    const [loading, setLoading] = useState(true);
    const [vehiculosAcompactar, setVehiculosAcompactar] = useState([]);

    useEffect(() => {
        const fetchVehiculosAcompactar = async () => {
            try {
                const response = await dispatch(getVehiculosAcompactar());

                setVehiculosAcompactar(response);

            } catch (error) {
                console.error("Error al obtener los vehículos a compactar", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVehiculosAcompactar();
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
        vehiculosAcompactar.forEach(({ id }) => {
            nuevosChecks[id] = true;
        });
        setCheckedItems(nuevosChecks);
    };

    const manejarActualizacionEstados = async () => {
        const seleccionados = vehiculosAcompactar
            .filter(({ id }) => checkedItems[id])
            .map(({ id, Acta }) => ({
                id,
                nro: Acta?.nro || null,
                lugar: Acta?.lugar || null,
            }));

        try {
            const finalData = { fecha_hora, seleccionados, userId };
            await dispatch(actualizarEstadosCompactados(finalData));
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
                    Selecciona los vehículos que cambiarán su estado a "Compactado"
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
                    vehiculosAcompactar?.map(({ Acta, Vehiculo, id }) => (
                        <CompactadosRow
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
            <button
                className="bg-[#0477ad] text-white px-4 py-2 rounded-lg font-inter font-semibold mx-auto mb-[3rem] block"
                onClick={manejarActualizacionEstados}
            >
                Actualizar estados
            </button>
        </div>
    );
}

export default CompactadosComponent;
