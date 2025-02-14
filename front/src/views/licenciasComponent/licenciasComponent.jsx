import { useDispatch } from "react-redux";
import Navbar from "../../components/navbar/navbarComponent";
import { useForm } from "react-hook-form";
import { useState } from "react";

function LicenciasComponent() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }, // Accede a los errores del formulario
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    if (data.dni === "1234567") {
      setError("dni", {
        type: "server",
        message:
          "No se encontraron licencias relacionadas con el dni ingresado", // Muestra el mensaje del servidor
      });
    } else if (data.dni == "12345678") {
      setRespuesta("entregar");
    } else if (data.dni == "12345679") {
      setRespuesta("no entregar");
    }
    /* const error = await dispatch(searchActa(data.nroActa));
          
          if (!error) {
            navigate("/ingreso_detalles");
          } else if (typeof error === "number" ){
            setError("nroActa", {
              type: "server",
              message: "Este número de acta ya fue ingresado al corralón", // Muestra el mensaje del servidor
            });
            setSecuestroId(error);
          } else {
            setError("nroActa", {
              type: "server",
              message: error.message || "Error desconocido", // Muestra el mensaje del servidor
            });
          } */
  };

  const [respuesta, setRespuesta] = useState("");

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] gap-8">
        <div class="flex flex-col justify-center items-start sm:items-center inline-flex mt-[1rem] sm:mt-[4rem] w-[20rem] sm:w-[32rem]">
          <div class="text-[#3d4245] sm:text-[2rem] text-[1rem] font-bold font-inter">
            Licencias de conducir
          </div>
          <div class="text-[#687073] sm:text-[1.1rem] text-s font-medium font-inter">
            Ingresa un nro de dni para saber si la licencia puede ser retirada
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          /* action="" */ class="w-[20rem] sm:w-[32rem] h-[75px] justify-start items-end gap-2 inline-flex"
        >
          <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
            <div class="text-[#3d4245] text-sm font-normal font-inter">
              Nro de documento
            </div>

            <input
              placeholder="000000000"
              className=" w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
              type="number"
              name="dni"
              {...register("dni", {
                required: "Ingrese un número de dni por favor",
                validate: (value) => {
                  // Validar que solo contenga números
                  if (!/^\d+$/.test(value)) {
                    return "El DNI solo puede contener números.";
                  }

                  // Validar longitud permitida (7 u 8 dígitos)
                  if (value.length < 6 || value.length > 9) {
                    return "El DNI debe tener entre 6 y 9 dígitos.";
                  }

                  return true; // Válido
                },
                setValueAs: (value) => value?.trim(), // Eliminar espacios innecesarios
              })}
              onChange={()=>setRespuesta("")}
            />
          </div>
          <button
            type="submit"
            class="w-[118px] h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center gap-1 flex"
          >
            <div class="text-[#f6f5f5] text-base font-semibold font-inter">
              Buscar
            </div>
          </button>
        </form>
        {/* <div className="justify-center items-center text-center"> */}
        {errors.dni && (
          <p className="text-red-500 w-[20rem] sm:w-[32rem] text-center">
            {errors.dni.message}
          </p>
        )}
        {/* </div> */}
        {respuesta == "entregar" && (
          <div className="flex justify-start p-4 bg-[#ccf8dd] rounded-xl items-center gap-2 inline-flex">
            <div className="text-[#0d6e34] text-xl font-semibold font-inter">
              Entregar licencia
            </div>
            <div className="w-8 h-8 relative overflow-hidden">
              <div className="w-[24.75px] h-6 left-[4px] top-[5px] absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#0d6e34"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
        {respuesta == "no entregar" && (
          <div className="flex justify-start p-4 bg-[#fed5d5] rounded-xl items-center gap-2 inline-flex">
            <div className="text-[#a21414] text-xl font-semibold font-inter">
              No entregar licencia
            </div>
            <div className="w-8 h-8 relative overflow-hidden">
              <div className="w-[24.75px] h-6 left-[4px] top-[5px] absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#a21414"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LicenciasComponent;
