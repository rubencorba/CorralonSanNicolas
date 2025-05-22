import { useDispatch } from "react-redux";
import Navbar from "../navbar/navbarComponent";
import { useForm } from "react-hook-form";
import { getAllUsers, getRegistro } from "../../redux/actions";
import RegistroTableComponent from "../registroTableComponent/registroTableComponent";
import { useEffect, useState } from "react";

function RegistrosComponent() {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [soloUnDia, setSoloUnDia] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await dispatch(getAllUsers());

        setUsers(response);

      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    };
    fetchUsers();
  }, [dispatch]);


  const {
    register,
    unregister,
    handleSubmit,
    getValues,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const estadoSeleccionado = watch("estado", "todos");
  // Definir los mensajes según el estado seleccionado
  const estadoMensajes = {
    Egresado: "Se filtrará los vehículos que egresaron en la fecha seleccionada",
    Compactado: "Se filtrará los vehículos que se compactaron en la fecha seleccionada",
    default: "Se filtrará los vehículos que ingresaron en la fecha seleccionada",
  };

  const mensajeEstado = estadoMensajes[estadoSeleccionado] || estadoMensajes.default;

  const handleCheckboxChange = () => {
    if (soloUnDia) {
      unregister("date"); // Elimina "date" si cambia a rango
      setValue("endDate", new Date().toISOString().split("T")[0]);
      setValue("startDate", "");
    } else {
      unregister("startDate"); // Elimina "startDate" si cambia a solo un día
      setValue("endDate", "");
      unregister("endDate"); // También elimina "endDate"
      setValue("date", new Date().toISOString().split("T")[0]);
    }
    setSoloUnDia(!soloUnDia);
  };

  const [registro, setRegistro] = useState([]);
  const [submit, setSubmit] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await dispatch(getRegistro(data));
    setRegistro(response);
    setSubmit(true)
    setLoading(false)
  };

  const handleResetFilters = () => {
    reset(); // Restablece todos los campos del formulario
    setRegistro([]); // Limpia los registros filtrados
    setSubmit(false); // Indica que no se ha hecho un filtro aún
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] gap-8">
        <div class="flex flex-col justify-center items-start sm:items-center inline-flex mt-[1rem] sm:mt-[1rem] w-[21rem] sm:w-[32rem]">
          <div class="text-[#3d4245] sm:text-[2rem] text-[1rem] font-bold font-inter">
            Tabla de registros
          </div>
          <div class="text-[#687073] sm:text-[1.1rem] text-s font-medium font-inter">
            Movimientos dentro de la plataforma
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center items-start w-[21rem] sm:w-[40rem] p-4 bg-white rounded-lg shadow-[1px_2px_8px_1px_rgba(220,220,220,0.45)] inline-flex overflow-hidden">

            {/* Checkbox: Un solo día */}
            <div className="flex items-center col-span-2">
              <input
                type="checkbox"
                id="soloUnDia"
                checked={soloUnDia}
                onChange={handleCheckboxChange}
                className="mr-2 cursor-pointer  w-6 h-6 rounded border-2 border-[#0477ad] bg-white focus:outline-none focus:ring-0"
              />
              <label htmlFor="soloUnDia" className="text-sm text-[#3d4245] font-inter cursor-pointer">
                Solo un dia
              </label>
            </div>


            <div className="self-stretch flex-col items-start gap-5 flex">


              <div className="grid grid-cols-2 gap-2 w-full">

                {/* Fechas */}
                <div className="flex flex-col gap-1">
                {!soloUnDia ? (<div className="text-[#3d4245] text-sm font-normal font-inter">Desde</div>
                ):(<div className="text-[#3d4245] text-sm font-normal font-inter">Fecha</div>)}
                  <input
                    name={soloUnDia ? "date" : "startDate"}
                    type="date"
                    className="w-full text-sm font-inter rounded-md p-2"
                    defaultValue={soloUnDia ? new Date().toISOString().split("T")[0] : ""} //No se actualiza dinamicamente con el checkbox
                    {...register(soloUnDia ? "date" : "startDate", {
                      required: "Por favor, ingrese la fecha desde la que desea filtrar",
                      validate: (value) => {
                        const selectedDate = new Date(value);
                        const now = new Date();
                        if (selectedDate > now) {
                          return "La fecha no puede ser superior a la actual";
                        }
                        return true;
                      },
                    })}
                  />
                </div>

                <div className="flex flex-col gap-1 justify-end">
                {!soloUnDia && <div className="text-[#3d4245] text-sm font-normal font-inter">Hasta</div>}
                  <input
                    disabled= {soloUnDia}
                    name="endDate"
                    type="date"
                    /* defaultValue={!soloUnDia ? new Date().toISOString().split("T")[0] : ""} */  //No se actualiza dinamicamente con el checkbox
                    className={`w-full text-sm font-inter rounded-md p-2 ${
                      soloUnDia ? "bg-gray-300 cursor-not-allowed" : ""
                    }`}
                    {...register("endDate", {
                      validate: (value) => {
                        const selectedDate = new Date(value);
                        const now = new Date();
                        const startDate = new Date(getValues("startDate"));
                        if (selectedDate > now) {
                          return "La fecha no puede ser superior a la actual";
                        }
                        if (selectedDate <= startDate) {
                          return "La fecha final debe ser mayor a la fecha de inicio";
                        }
                        return true;
                      },
                    })}
                  />
                </div>
                

                {/* Estado */}
                <div className="flex flex-col gap-1">
                  <div className="text-[#3d4245] text-sm font-inter">Estado</div>
                  <select
                    className="w-full text-sm font-inter rounded-md p-2"
                    defaultValue="todos"
                    {...register("estado")}
                  >
                    <option value="todos">Todos</option>
                    <option value="Egresado">Egresados</option>
                    <option value="Compactado">Compactados</option>
                    <option value="Ingresado">Ingresados</option>
                    <option value="No Compactar">No compactar</option>
                    <option value="A compactar">A compactar</option>
                    <option value="Desconocido">Desconocido</option>
                  </select>
                </div>

                {/* Usuario */}
                <div className="flex flex-col gap-1">
                  <div className="text-[#3d4245] text-sm font-inter">Usuario</div>
                  <select
                    className="w-full text-sm font-inter rounded-md p-2"
                    defaultValue="todos"
                    {...register("user")}
                  >
                    <option value="todos">Todos</option>
                    {users?.map((user, index) => (
                      <option key={index} value={user.id}>
                        {user.nombreCompleto}
                      </option>
                    ))}
                  </select>
                </div>


                {/* Tipo de vehículo */}
                <div className="flex flex-col gap-1">
                  <div className="text-[#3d4245] text-sm font-inter">Tipo de vehículo</div>
                  <select
                    className="w-full text-sm font-inter rounded-md p-2"
                    defaultValue="todos"
                    {...register("tipovh")}
                  >
                    <option value="todos">Todos</option>
                    <option value="Automóvil">Automóvil</option>
                    <option value="Moto">Moto</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                {/* Sector */}
                <div className="flex flex-col gap-1">
                  <div className="text-[#3d4245] text-sm font-inter">Sector</div>
                  <select
                    className="w-full text-sm font-inter rounded-md p-2"
                    defaultValue=""
                    {...register("sector", { required: "Ingrese un sector por favor" })}
                  >
                    <option value="todos">Todos</option>
                    {Array.from({ length: 26 }, (_, i) => {
                      const letter = String.fromCharCode(65 + i);
                      return (
                        <option key={letter} value={letter}>
                          {letter}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>


              <div className="self-stretch justify-start items-start gap-2 inline-flex">
                <button
                  type="submit"
                  className="grow shrink basis-0 h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center gap-1 flex overflow-hidden"
                  disabled={loading} // Deshabilita el botón mientras carga
                >
                  {loading ? (
                    <div role="status">
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
                    </div>
                  ) : (
                    <div className="text-[#f6f5f5] text-base font-semibold font-inter">
                      Filtrar
                    </div>
                  )}
                </button>


                <button
                  type="button"
                  onClick={handleResetFilters} className="grow shrink basis-0 h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 flex overflow-hidden">
                  <div className="text-[#0477ad] text-base font-semibold font-inter">
                    Limpiar filtros
                  </div>
                </button>
              </div>
            </div>

            <p className="text-green-500 mt-2">{mensajeEstado}</p>

            {Object.values(errors).map((error, index) => (
              <p className="text-red-500 mt-4" key={index}>
                {error.message}
              </p>
            ))}
          </div>
        </form>
        {submit ? <RegistroTableComponent registro={registro} /> : ""}
      </div >
    </div >
  );
}

export default RegistrosComponent;
