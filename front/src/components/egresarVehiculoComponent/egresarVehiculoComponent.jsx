import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postEgreso } from "../../redux/actions";

import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useNavigate, useParams } from "react-router-dom";

function EgresarVehiculoComponent({ onCloseEgresar, idLevantamiento }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { id } = useParams();

  const userId = useSelector((state) => state.currentUserId);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data, event) => {
    event.preventDefault();

    if (firmaRef.current.isEmpty()) {
      setError("firma", {
        type: "manual",
        message: "Por favor, complete la firma",
      });
      return;
    }

    setLoading(true);

    // Agregar información extra
    data.userId = userId;
    data.idSecuestro = id;
    data.idLevantamiento = idLevantamiento;
    // Convertir la firma en base64 y agregarla a los datos
    data.firma = firmaRef.current.toDataURL("image/png");

    // Obtener la firma en Base64
    const firmaDataUrl = firmaRef.current.toDataURL("image/png");

    // Convertir Base64 a Blob
    const blob = await fetch(firmaDataUrl).then(res => res.blob());

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

      await dispatch(postEgreso(formData));
      navigate(0);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    } finally {
      setLoading(false);
    }
  };

  //-----------Firma--------------//
  const firmaRef = useRef(null);

  const limpiarFirma = () => {
    firmaRef.current.clear();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 "
      onClick={onCloseEgresar} /* Cierra al hacer clic fuera */
    >
      <div
        className="w-[20rem] sm:w-[30rem] px-5 py-8 bg-white rounded-xl flex flex-col justify-center  gap-6 mx-5 overflow-y-auto my-[2rem]"
        onClick={(e) =>
          e.stopPropagation()
        } /* Evita que el clic dentro lo cierre */
      >
        {/* Título */}
        <div className="sm:text-left text-center text-[#3d4245] text-2xl font-bold font-inter">
          Egresar vehículo
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Contenido principal */}
          <div className="self-stretch h-[414px] flex flex-col justify-start items-start gap-4">
            {/* Apellidos y Nombres / DNI */}
            <div className="self-stretch flex justify-start items-start gap-3 sm:flex-row flex-col">
              <div className="flex-grow flex flex-col justify-start items-start gap-2 w-full">
                <label className="text-[#3d4245] text-sm font-normal font-inter">
                  Apellidos y Nombres
                </label>
                <input
                  placeholder="Apellidos y Nombres"
                  className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] text-sm font-normal font-inter w-full flex-grow"
                  name="nombreCompleto"
                  {...register("nombreCompleto", {
                    required: "Por favor, ingrese el apellido y nombre",
                    validate: (value) => {
                      // Validar caracteres permitidos
                      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-'´]+$/;
                      if (!regex.test(value)) {
                        return "El nombre solo puede contener letras, espacios, apóstrofos y guiones.";
                      }

                      // Validar longitud mínima
                      if (value.length < 2) {
                        return "El nombre debe tener al menos 2 caracteres.";
                      }

                      // Validar longitud máxima
                      if (value.length > 50) {
                        return "El nombre no debe superar los 50 caracteres.";
                      }

                      // Validar espacios consecutivos
                      if (/\s{2,}/.test(value)) {
                        return "El nombre no debe contener espacios consecutivos.";
                      }

                      return true; // Válido
                    },
                    setValueAs: (value) =>
                      value
                        ?.trim() // Eliminar espacios innecesarios
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toUpperCase()), // Capitalizar nombres
                  })}
                />
              </div>
              <div className="flex-grow flex flex-col justify-start items-start gap-2 w-full">
                <label className="text-[#3d4245] text-sm font-normal font-inter">
                  DNI
                </label>
                <input
                  placeholder="000000000"
                  className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] text-sm font-normal font-inter w-full flex-grow"
                  type="number"
                  name="dni"
                  {...register("dni", {
                    required: "Por favor, ingrese el dni",
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
                />
              </div>
            </div>

            {/* Domicilio / Lic. Conducir */}
            <div className="self-stretch flex justify-start items-start gap-3 sm:flex-row flex-col">
              <div className="flex-grow flex flex-col justify-start items-start gap-2 w-full">
                <label
                  htmlFor="address"
                  className="text-[#3d4245] text-sm font-normal font-inter"
                >
                  Domicilio
                </label>

                <input
                  placeholder="Domicilio"
                  className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] text-sm font-normal font-inter w-full flex-grow"
                  type="text"
                  name="domicilio"
                  {...register("domicilio", {
                    validate: (value) => {
                      // Permitir valores vacíos
                      if (!value) {
                        return true;
                      }

                      // Validar caracteres permitidos (letras, números y caracteres comunes en direcciones)
                      if (!/^[a-zA-Z0-9\s.,º#/-]+$/.test(value)) {
                        return "El domicilio contiene caracteres no permitidos.";
                      }

                      // Validar longitud mínima
                      if (value.length < 5) {
                        return "El domicilio debe tener al menos 5 caracteres.";
                      }

                      return true; // Válido
                    },
                    setValueAs: (value) => value?.trim(), // Eliminar espacios innecesarios
                  })}
                />
              </div>
              <div className="flex-grow flex flex-col justify-start items-start gap-2 w-full">
                <label
                  htmlFor="license"
                  className="text-[#3d4245] text-sm font-normal font-inter"
                >
                  Lic. Conducir
                </label>
                <input
                  placeholder="000000000"
                  className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] text-sm font-normal font-inter w-full flex-grow"
                  type="number"
                  name="licencia"
                  {...register("licencia", {
                    validate: (value) => {
                      // Permitir valores vacíos
                      if (!value) {
                        return true; // Campo válido si está vacío
                      }

                      // Validar que solo contenga números
                      if (!/^\d+$/.test(value)) {
                        return "La licencia solo puede contener números.";
                      }

                      return true; // Válido
                    },
                    setValueAs: (value) => value?.trim(), // Eliminar espacios innecesarios
                  })}
                />
              </div>
            </div>

            {/* Tarj. Verde / B. Pago */}
            <div className="self-stretch flex justify-start items-start gap-3 sm:flex-row flex-col">
              <div className="flex-grow flex flex-col justify-start items-start gap-2 w-full">
                <label
                  htmlFor="green-card"
                  className="text-[#3d4245] text-sm font-normal font-inter"
                >
                  Tarj. Verde
                </label>
                <input
                  placeholder="Tarj. Verde"
                  className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] text-sm font-normal font-inter w-full flex-grow uppercase"
                  type="text"
                  name="tarjetaVerde"
                  {...register("tarjetaVerde", {
                    validate: (value) => {
                      // Permitir valores vacíos
                      if (!value) {
                        return true;
                      }

                      // Validar caracteres permitidos (letras, números y caracteres comunes en direcciones)
                      if (!/^[a-zA-Z0-9\s.,º#/-]+$/.test(value)) {
                        return "La tarjeta verde contiene caracteres no permitidos.";
                      }

                      return true; // Válido
                    },
                    setValueAs: (value) => value?.trim().toUpperCase(), // Convertir a mayúsculas
                  })}
                />
              </div>
              <div className="flex-grow flex flex-col justify-start items-start gap-2 w-full">
                <label
                  htmlFor="payment-slip"
                  className="text-[#3d4245] text-sm font-normal font-inter"
                >
                  B. Pago
                </label>

                <input
                  placeholder="000000000"
                  className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] text-sm font-normal font-inter w-full flex-grow"
                  type="number"
                  name="bPago"
                  {...register("bPago", {
                    validate: (value) => {
                      // Permitir valores vacíos
                      if (!value) {
                        return true; // Campo válido si está vacío
                      }

                      // Validar que solo contenga números
                      if (!/^\d+$/.test(value)) {
                        return "La boleta de pago solo puede contener números.";
                      }

                      return true; // Válido
                    },
                    setValueAs: (value) => value?.trim(), // Eliminar espacios innecesarios
                  })}
                />
              </div>
            </div>

            {/* Observaciones / Fecha y hora */}
            <div className="self-stretch flex justify-start items-start gap-3 sm:flex-row flex-col">
              {/* Campo Observaciones */}
              <div className="flex-grow flex flex-col justify-start items-start gap-2 w-full">
                <label className="text-[#3d4245] text-sm font-normal font-inter">
                  Observaciones
                </label>

                <input
                  placeholder="Observaciones"
                  className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] text-sm font-normal font-inter w-full flex-grow"
                  type="text"
                  name="observaciones"
                  {...register("observaciones", {
                    validate: (value) => {
                      // Permitir valores vacíos
                      if (!value) {
                        return true;
                      }

                      // Validar longitud máxima
                      if (value.length > 500) {
                        return "Las observaciones no pueden superar los 500 caracteres.";
                      }

                      return true; // Válido
                    },
                    setValueAs: (value) => value?.trim(), // Eliminar espacios innecesarios al inicio y final
                  })}
                />
              </div>
              {/* Campo Fecha y hora de salida */}
              <div className="flex-grow flex flex-col justify-start items-start gap-2 w-full">
                <label className="text-[#3d4245] text-sm font-normal font-inter">
                  Fecha y hora de salida
                </label>
                <div className="flex items-center gap-2 w-full">
                  <input
                    name="fecha_hora"
                    placeholder="0"
                    type="datetime-local"
                    defaultValue={(() => {
                      const now = new Date();

                      const pad = (n) => n.toString().padStart(2, '0');

                      const year = now.getFullYear();
                      const month = pad(now.getMonth() + 1);
                      const day = pad(now.getDate());
                      const hours = pad(now.getHours());
                      const minutes = pad(now.getMinutes());

                      return `${year}-${month}-${day}T${hours}:${minutes}`;
                    })()}
                    className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] text-sm font-normal font-inter w-full flex-grow"
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
                        return true;
                      },
                    })}
                  />
                </div>
              </div>
            </div>

            {/* Firma */}
            <div className="self-stretch flex flex-col gap-2 justify-start items-start">
              <label className="text-[#3d4245] text-sm font-normal font-inter">
                Firma
              </label>
              <SignatureCanvas
                ref={firmaRef}
                penColor="blue"
                onBegin={() => clearErrors("firma")} // Limpia el error al comenzar a firmar
                canvasProps={{
                  height: 150,
                  className: "border border-black rounded-md w-full",
                }}
              />
              <div className="flex gap-2">
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
            <div className="self-stretch flex justify-start items-start gap-3 sm:flex-row flex-col pb-5">
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
                    Egresar vehículo
                  </div>
                )}
              </button>
              <button
                onClick={onCloseEgresar}
                className="w-full flex-grow h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] flex justify-center items-center gap-1 sm:mb-0 mb-5"
              >
                <div className="text-[#0477ad] text-base font-semibold font-inter">
                  Cancelar
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EgresarVehiculoComponent;
