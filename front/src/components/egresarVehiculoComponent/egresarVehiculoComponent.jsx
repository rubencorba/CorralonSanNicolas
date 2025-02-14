import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postEgreso } from "../../redux/actions";

import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useNavigate, useParams } from "react-router-dom";

function EgresarVehiculoComponent({ onCloseEgresar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { id } = useParams();

  const userId = useSelector((state) => state.currentUserId);

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    getValues,
    clearErrors,
    formState: { errors }, // Accede a los errores del formulario
  } = useForm();

  const onSubmit = async (data, event) => {
    event.preventDefault(); // Evita el comportamiento por defecto

    if (firmaRef.current.isEmpty()) {
      setError("firma", {
        type: "manual",
        message: "Por favor, complete la firma",
      });
      return;
    }

    //Agrego el user
    data.userId = userId;
    //Agrego el id del secuestro
    data.idSecuestro = id;
    // Convertir la firma en base64 y agregarla a los datos
    data.firma = firmaRef.current.toDataURL("image/png");

    console.log(data);
    const resp = await dispatch(postEgreso(data));
    console.log(resp);

    navigate(0);
  };

  //-----------Firma--------------//
  const firmaRef = useRef(null); // Referencia para la firma

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
                {/* <input
                type="text"
                placeholder="DNI"
                className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] text-[#a3b8c1] text-sm font-normal font-inter w-full flex-grow"
              /> */}
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
                {/* <input
                  id="license"
                  type="text"
                  placeholder="Lic. Conducir"
                  className="h-[50px] p-2 rounded-md border border-[#687073] text-[#3d4245] text-sm font-normal font-inter w-full flex-grow"
                /> */}
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
                {/* <input
                  id="green-card"
                  type="text"
                  placeholder="Tarj. Verde"
                  className="h-[50px] p-2 rounded-md border border-[#687073] text-[#3d4245] text-sm font-normal font-inter w-full flex-grow"
                /> */}
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
                {/* <input
                  id="payment-slip"
                  type="text"
                  placeholder="B. Pago"
                  className="h-[50px] p-2 rounded-md border border-[#687073] text-[#3d4245] text-sm font-normal font-inter w-full flex-grow"
                /> */}
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

                {/* <input
                  type="text"
                  placeholder="Observaciones"
                  className="h-[50px] p-2 rounded-md border border-[#687073] text-[#3d4245] text-sm font-normal font-inter flex-grow w-full"
                /> */}
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
                  {/* <input
                    type="datetime-local"
                    className="h-[50px] p-2 rounded-md border border-[#687073] text-[#3d4245] text-sm font-normal font-inter  flex-grow "
                  /> */}
                  <input
                    name="fecha_hora"
                    placeholder="0"
                    type="datetime-local"
                    defaultValue={(() => {
                      const now = new Date();
                      // Convertimos a UTC-3 (Argentina)
                      const offset = now.getTimezoneOffset(); // En minutos
                      now.setMinutes(now.getMinutes() - offset /*  - 180 */); // Ajuste al huso horario de Argentina (UTC-3)
                      return now.toISOString().slice(0, 16); // Formateamos la fecha
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
                          return `El año no puede ser menor a ${
                            threeYearsAgo.getFullYear() + 1
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
                {/* <button
                  type="button"
                  onClick={guardarFirma}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Guardar Firma
                </button> */}
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
              >
                <div className="text-[#f6f5f5] text-base font-semibold font-inter">
                  Egresar vehículo
                </div>
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
