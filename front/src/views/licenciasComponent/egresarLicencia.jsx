import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInfoEgreso, postEgresoLicencia } from "../../redux/actions";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";

function EgresarLicenciaComponent({ dni, closeModalEgresoLicencia, observaciones, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.currentUserId);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }, // Accede a los errores del formulario
  } = useForm();

  const [loading, setLoading] = useState(false);
  const firmaRef = useRef(null); // Referencia para la firma

  const onSubmit = async (data, event) => {
    event.preventDefault(); // Evita el comportamiento por defecto

    if (firmaRef.current.isEmpty()) {
      setError("firma", {
        type: "manual",
        message: "Por favor, complete la firma",
      });
      return;
    }

    setLoading(true);

    data.userId = userId;
    data.licencia_id = id;

    // Obtener la firma en Base64
    const firmaDataUrl = firmaRef.current.toDataURL("image/png");

    // Convertir Base64 a Blob
    const blob = await fetch(firmaDataUrl).then(res => res.blob());

    // Crear FormData para enviar archivos binarios
    const formData = new FormData();

    // Agregar los demás campos al formData
    for (const key in data) {
      if (key !== "firma") {
        formData.append(key, data[key]);
      }
    }

    // Agregar la firma como archivo binario
    formData.append("firma", blob, "firma.png");

    try {
      await dispatch(postEgresoLicencia(formData));
      alert("Licencia egresada con éxito");
      navigate(0);
    } catch (error) {
      alert("Hubo un error al egresar la licencia");
    } finally {
      setLoading(false);
    }
  };

  //-----------Firma--------------//

  const limpiarFirma = () => {
    firmaRef.current.clear();
  };

  const [infoEgreso, setInfoEgreso] = useState({});

  useEffect(() => {
    const fetchInfoEgreso = async () => {
      const resp = await dispatch(getInfoEgreso(dni)); //Trae información de juzgado 

      setInfoEgreso(resp);
    };

    fetchInfoEgreso();
  }, [dispatch, dni]);

  const { state, msg } = infoEgreso;


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 overflow-y-auto"
      onClick={closeModalEgresoLicencia} /* Cierra al hacer clic fuera */
    >
      <div
        className="flex flex-col gap-2  bg-[#F5FAFF] rounded-[8px]  border p-3 w-[20rem] sm:w-[32rem]"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <div className="sm:gap-4 bg-white rounded-[8px]  border border-[#61ABCF] divide-y divide-[#61ABCF]">
          <div className="flex flex-col py-1  px-4 gap-5">
            <dt className=" text-sm/6 font-bold text-[#036395] font-inter">
              INFORMACION DE JUZGADO:
            </dt>
            {/* <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0"></dd> */}
          </div>
          {infoEgreso ? (
            <div>
              <div className="flex flex-col py-1 grid grid-cols-2 px-4 gap-1">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Estado:
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">


                  {state === "Habilitado" ? (
                    <div className="flex justify-start p-1.5 bg-[#ccf8dd] rounded-xl items-center gap-1 inline-flex">
                      <div className="text-[#0d6e34] text-l font-semibold font-inter">
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
                  ) : (
                    <div className="flex justify-start p-1.5 bg-[#fed5d5] rounded-xl items-center gap-1 inline-flex">
                      <div className="text-[#a21414] text-l font-semibold font-inter">
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
                </dd>
              </div>
              <div className="flex flex-col py-1 grid grid-cols-2 px-4 gap-2">
                <dt className="text-sm/6 font-medium text-gray-900">Mensaje:</dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                  {msg}
                </dd>
              </div>
            </div>)
            :
            (
              <div className="flex flex-col py-2  px-4 gap-2">
                <dt className=" text-sm/6 font-bold text-[#036395] font-inter">
                  No hay información de juzgado sobre esta licencia, la entrega queda a criterio de corralón
                </dt>

              </div>
            )}

        </div>


        {observaciones ? (
          <div className="sm:gap-1 bg-white rounded-[8px]  border border-[#61ABCF] divide-y divide-[#61ABCF]">
            <div className="flex flex-col py-1  px-4 gap-5">
              <dt className=" text-sm/6 font-bold text-[#036395] font-inter">
                OBSERVACIÓN DE INGRESO
              </dt>
              {/* <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0"></dd> */}
            </div>
            <div className="flex flex-col py-1  px-4 gap-2">
              <dt className="text-sm/6 font-medium text-gray-900">
                {observaciones}
              </dt>

            </div>
          </div>) : (null)}



        {state === "Habilitado" ? (

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Contenido principal */}
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              {/* Campo Fecha y hora de salida */}
              <div className="self-stretch flex justify-start items-start gap-1 sm:flex-row flex-col">


                <div className="flex-grow flex flex-col justify-start items-start gap-1 w-full">
                  <label className="text-[#3d4245] text-sm font-normal font-inter">
                    Fecha y hora de entrega
                  </label>
                  <div className="flex items-center gap-1 w-full">
                    <input
                      name="fecha_hora"
                      placeholder="0"
                      type="datetime-local"
                      defaultValue={(() => {
                        const ahora = new Date();

                        const ahoraArgentina = new Date(
                          ahora.toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" })
                        );

                        const pad = (n) => n.toString().padStart(2, "0");

                        const year = ahoraArgentina.getFullYear();
                        const month = pad(ahoraArgentina.getMonth() + 1);
                        const day = pad(ahoraArgentina.getDate());
                        const hour = pad(ahoraArgentina.getHours());
                        const minute = pad(ahoraArgentina.getMinutes());

                        return `${year}-${month}-${day}T${hour}:${minute}`;
                      })()}
                      className="self-stretch  p-2 rounded-md border border-[#687073] text-sm font-normal font-inter w-full flex-grow"
                      {...register("fecha_hora", {
                        required: "Por favor, ingrese la fecha y hora.",
                        validate: (value) => {
                          const selectedDate = new Date(value);
                          const now = new Date();
                          const threeYearsAgo = new Date();
                          threeYearsAgo.setFullYear(now.getFullYear() - 3);

                          if (selectedDate > now) {
                            return "La fecha no puede ser superior a la actual";
                          }
                          if (selectedDate < threeYearsAgo) {
                            return `El año no puede ser menor a ${threeYearsAgo.getFullYear() + 1
                              }`;
                          }
                          return true; // La fecha es válida
                        },
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Firma */}
              <div className="self-stretch flex flex-col gap-1 justify-start items-start">
                <label className="text-[#3d4245] text-sm font-normal font-inter">
                  Firma
                </label>
                <SignatureCanvas
                  ref={firmaRef}
                  penColor="blue"
                  onBegin={() => clearErrors("firma")} // Limpia el error al comenzar a firmar
                  canvasProps={{
                    height: 150,
                    className: "border border-black rounded-md w-full bg-white",
                  }}
                />
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={limpiarFirma}
                    className="bg-gray-300 px-4 py-2 rounded-md"
                  >
                    Limpiar
                  </button>
                </div>
              </div>

              {/* Mensajes de error */}
              <div className=" text-start">
                {Object.values(errors).map((error, index) => (
                  <p className="text-red-500 " key={index}>
                    {error.message}
                  </p>
                ))}
              </div>

              {/* Botones */}
              <div className="self-stretch flex justify-start items-start gap-3 sm:flex-row flex-col">
                <button
                  type="submit"
                  className="w-full h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg flex justify-center items-center gap-1 flex-grow"
                  disabled={loading}  // Deshabilitar el botón mientras se está enviando la solicitud
                >
                  {loading ? (
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
                  ) : (
                    <div className="text-[#f6f5f5] text-base font-semibold font-inter">
                      Egresar licencia
                    </div>
                  )}
                </button>
                <button
                  onClick={closeModalEgresoLicencia}
                  className="w-full flex-grow h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] flex justify-center items-center gap-1 "
                >
                  <div className="text-[#0477ad] text-base font-semibold font-inter">
                    Cancelar
                  </div>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <button
            onClick={closeModalEgresoLicencia}
            class=" h-[45px] px-[4px] py-[6px] bg-[#0477AD] rounded-[8px] overflow-hidden justify-center items-center flex text-[#F6F5F5] text-[16px] font-inter font-semibold gap-[4px]"
          >
            Cerrar
          </button>
        )}

      </div>
    </div>
  );
}

export default EgresarLicenciaComponent;
