import { useDispatch } from "react-redux";
import Navbar from "../navbar/navbarComponent";
import { useForm } from "react-hook-form";
import { getRegistro } from "../../redux/actions";
import RegistroTableComponent from "../registroTableComponent/registroTableComponent";
import { useState } from "react";

function RegistrosComponent() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors }, // Accede a los errores del formulario
  } = useForm();

  const [registro, setRegistro] = useState([]);
  const [submit, setSubmit] = useState(false);

  const onSubmit = async (data) => {
    const response = await dispatch(getRegistro(data));
    setRegistro(response);
    setSubmit(true)
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] gap-8">
        <div class="flex flex-col justify-center items-start sm:items-center inline-flex mt-[1rem] sm:mt-[4rem] w-[21rem] sm:w-[32rem]">
          <div class="text-[#3d4245] sm:text-[2rem] text-[1rem] font-bold font-inter">
            Tabla de registros
          </div>
          <div class="text-[#687073] sm:text-[1.1rem] text-s font-medium font-inter">
            Movimientos dentro de la plataforma
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center items-center w-[21rem] sm:w-[40rem] p-4 bg-white rounded-lg shadow-[1px_2px_8px_1px_rgba(220,220,220,0.45)] inline-flex overflow-hidden">
            <div className="self-stretch flex-col items-start gap-5 flex">
              <div className="self-stretch flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch justify-between flex sm:inline-flex sm:flex-row flex-col gap-3">
                  <div className="justify-start items-center gap-1 flex">
                    <input
                      type="checkbox"
                      {...register("compactados")}
                      className="w-6 h-6 rounded border-2 border-[#0477ad] bg-white "
                    />
                    <div className="text-[#3d4245] text-sm font-bold font-inter">
                      Compactados
                    </div>
                  </div>

                  <div className="justify-start items-center gap-1 flex">
                    <input
                      type="checkbox"
                      {...register("ingresados")}
                      className="w-6 h-6 rounded border-2 border-[#0477ad] bg-white "
                    />
                    <div className="text-[#3d4245] text-sm font-bold font-inter">
                      Ingresados
                    </div>
                  </div>

                  <div className="justify-start items-center gap-1 flex">
                    <input
                      type="checkbox"
                      {...register("egresados")}
                      className="w-6 h-6 rounded border-2 border-[#0477ad] bg-white "
                    />
                    <div className="text-[#3d4245] text-sm font-bold font-inter">
                      Egresados
                    </div>
                  </div>
                </div>

                <div className="self-stretch justify-start items-start gap-2 inline-flex flex flex-wrap sm:flex-nowrap">
                  <div className="inline-flex  w-full gap-2 self-stretch">
                    <div className="flex-grow  flex-col justify-start items-start gap-1 inline-flex">
                      <div className="text-[#3d4245] text-sm font-normal font-inter">
                        Desde
                      </div>
                      {/* <div className="self-stretch p-2 bg-white rounded-md border border-[#687073] justify-between items-center inline-flex">
                    <div className="text-[#3d4245] text-sm font-semibold font-inter">
                      09/10/2024   sm:w-[50%]
                    </div>
                  </div> */}

                      <input
                        name="startDate"
                        type="date"
                        className="w-full text-sm font-inter rounded-md  items-center"
                        {...register("startDate", {
                          required:
                            "Por favor, ingrese la fecha desde la que desea filtrar",
                          validate: (value) => {
                            const selectedDate = new Date(value);
                            const now = new Date();

                            if (selectedDate > now) {
                              return "La fecha no puede ser superior a la actual";
                            }

                            return true; // La fecha es válida
                          },
                        })}
                      />
                    </div>

                    <div className="flex-grow  flex-col justify-start items-start gap-1 inline-flex">
                      <div className="text-[#3d4245] text-sm font-normal font-inter">
                        Hasta
                      </div>

                      <input
                        name="endDate"
                        type="date"
                        defaultValue={new Date().toISOString().split("T")[0]} // Fecha actual en formato YYYY-MM-DD
                        className="w-full text-sm font-inter rounded-md  items-center "
                        {...register("endDate", {
                          /* required:
                          "Por favor, ingrese hasta qué fecha desea filtrar", */ //No hace falta porque ya hay un valor por defecto
                          validate: (value) => {
                            const selectedDate = new Date(value);
                            const now = new Date();
                            const startDate = new Date(getValues("startDate")); // Obtiene startDate

                            if (selectedDate > now) {
                              return "La fecha no puede ser superior a la actual";
                            }

                            if (selectedDate <= startDate) {
                              return "La fecha final debe ser mayor a la fecha de inicio";
                            }

                            return true; // La fecha es válida
                          },
                        })}
                      />
                    </div>
                  </div>

                  <div className="inline-flex  w-full gap-2 self-stretch">
                    <div className="grow inline-flex basis-0  flex-col justify-start items-start flex gap-1">
                      <div className="text-[#3d4245] text-sm  font-inter">
                        Usuario
                      </div>
                      {/* <div className="self-stretch p-2 bg-white rounded-md border border-[#687073] justify-between items-center inline-flex">
                      <div className="text-[#3d4245] text-sm font-inter">
                        Seleccionar
                      </div>
                    </div> */}

                      <select
                        className="self-stretch justify-between items-center inline-flex text-sm  font-inter rounded-md p-2 "
                        defaultValue="todos"
                        {...register("user")}
                      >
                        <option value="todos">Todos</option>
                        {["cacho", "pablo", "pedro"].map((user, index) => (
                          <option key={index} value={user}>
                            {user}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grow basis-0 flex-col justify-start items-start gap-1 inline-flex">
                      <div className="text-[#3d4245] text-sm  font-inter">
                        Sector
                      </div>

                      <select
                        className="self-stretch justify-between items-center inline-flex text-sm  font-inter rounded-md p-2 "
                        defaultValue=""
                        {...register("sector", {
                          required: "Ingrese un sector por favor",
                        })}
                      >
                        <option value="todos">Todos</option>
                        {Array.from({ length: 26 }, (_, i) => {
                          const letter = String.fromCharCode(65 + i); // 65 es el código ASCII de 'A'
                          return (
                            <option key={letter} value={letter}>
                              {letter}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-2 inline-flex">
                <button
                  type="submit"
                  className="grow shrink basis-0 h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center gap-1 flex overflow-hidden"
                >
                  <div className="text-[#f6f5f5] text-base font-semibold font-inter">
                    Filtrar
                  </div>
                </button>
                <div className="grow shrink basis-0 h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 flex overflow-hidden">
                  <div className="text-[#0477ad] text-base font-semibold font-inter">
                    Limpiar filtros
                  </div>
                </div>
              </div>
            </div>

            {/* //Para compactar// */}

            {/* <div className="self-stretch h-[143px] px-3 py-4 bg-[#f4f4f4] rounded-lg flex-col justify-center items-start gap-3 flex overflow-hidden">
              <div className="self-stretch h-[49px] flex-col justify-start items-start gap-2 flex">
                <div className="text-center text-[#3d4245] text-lg font-bold font-inter">
                  Para compactar
                </div>
                <div className="self-stretch text-[#687073] text-base font-medium font-inter">
                  Busca vehículos que han ingresado hace más de 6 meses y no
                  fueron egresados
                </div>
              </div>
              <div className="w-[351px] h-[50px] px-[18px] py-[13px] bg-[#a21414] rounded-lg justify-center items-center gap-1 inline-flex overflow-hidden">
                <div className="text-[#f6f5f5] text-base font-semibold font-inter">
                  Buscar vehículos para compactar
                </div>
              </div>
            </div> */}
            {Object.values(errors).map((error, index) => (
              <p className="text-red-500 mt-4" key={index}>
                {error.message}
              </p>
            ))}
          </div>
        </form>
        {submit? <RegistroTableComponent registro={registro} /> : ""}
      </div>
    </div>
  );
}

export default RegistrosComponent;
