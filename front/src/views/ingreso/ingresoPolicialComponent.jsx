import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbarComponent";
import { useDispatch, useSelector } from "react-redux";
import { getAllInfracciones, ingresoOficioPolicial } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function IngresoPolicialComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    getValues,
    clearErrors,
    formState: { errors }, // Accede a los errores del formulario
  } = useForm();

  const infracciones = useSelector((state) => state.infracciones);

  const [infraccionesSelected, setInfraccionesSelected] = useState([]);

  useEffect(() => {
    dispatch(getAllInfracciones());
  }, []);

  const handleRemove = (infraccionToRemove) => {
    const currentInfracciones = getValues("infracciones") || [];

    // Filtrar la infracción que se desea eliminar
    const updatedInfracciones = currentInfracciones.filter(
      (infraccion) => infraccion.descrip !== infraccionToRemove.descrip
    );

    // Actualizar el valor del campo 'infracciones' con las infracciones restantes
    setValue("infracciones", updatedInfracciones);

    // También actualizar el estado local de infracciones seleccionadas
    setInfraccionesSelected(updatedInfracciones);
  };

  const onSubmit = (data, event) => {
    event.preventDefault(); // Evita el comportamiento por defecto
    if (!data.infracciones || data.infracciones.length === 0) {
      return setError("infracciones", {
        type: "manual",
        message: "Debe seleccionar al menos una infracción",
      });
    }
    // Reemplazar patente vacía por "sin patente"
    const processedData = {
      ...data,
      dominio: data.dominio || "sin patente", // Si está vacío, asigna "sin patente"
    };
    dispatch(ingresoOficioPolicial(processedData))

    console.log(processedData);
    navigate('/ingreso_detalles')
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] gap-8">
        <div class="flex flex-col justify-center items-start sm:items-center inline-flex mt-[1rem] sm:mt-[4rem] w-[20rem] sm:w-[32rem]">
          <div class="text-[#3d4245] sm:text-[2rem] text-[1rem] font-bold font-inter">
            Nuevo oficio policial
          </div>
          <div class="text-[#687073] sm:text-lg text-s font-medium font-inter">
            Ingresa un nuevo vehículo al corralón
          </div>
        </div>

        <div class="w-[20rem] sm:w-[32rem] h-[56.40px] flex-col justify-start items-start gap-1 inline-flex mb-5 sm:mb-10">
          <div class="self-stretch justify-start items-center inline-flex">
            <div class="w-[33.40px] h-[33.40px] p-[3.34px] bg-[#c5dfff] rounded-[33.40px] border-2 border-[#0477ad]"></div>
            <div class="grow shrink basis-0 h-[2.50px] bg-[#0477ad]"></div>
            <div class="w-10 h-10 p-[3.34px] rounded-[33.40px] border-2 border-[#0477ad]"></div>
            <div class="grow shrink basis-0 h-[2.50px] bg-[#0477ad]"></div>
            <div class="w-[33.40px] h-[33.40px] p-[3.34px] rounded-[33.40px] border-2 border-[#0477ad]"></div>
          </div>
          <div class="self-stretch px-1 justify-between items-start inline-flex">
            <div class="text-[#3d4245] text-base font-semibold font-inter">
              Acta
            </div>
            <div class="text-[#3d4245] text-base font-semibold font-inter">
              Detalles
            </div>
            <div class="text-[#3d4245] text-base font-semibold font-inter">
              Foto
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[20rem] sm:w-[32rem]  flex-col justify-start items-start gap-6 inline-flex">
            <div className="self-stretch  flex-col justify-start items-start gap-2 flex">
              <div className="text-[#0a5477] text-base font-bold font-inter uppercase">
                Vehículo
              </div>
              <div className="self-stretch flex-col justify-start items-start gap-3 flex">
                <div className="self-stretch justify-start items-start gap-2 inline-flex">
                  <div className="grow shrink basis-0  flex-col justify-start items-start gap-2 inline-flex">
                    <div className="text-[#3d4245] text-sm font-normal font-inter">
                      Patente
                    </div>

                    <input
                      name="dominio"
                      placeholder="Sin patente"
                      className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                      {...register("dominio", {
                        validate: (value) => {
                          // Validar si el campo está vacío, null o undefined
                          if (!value) {
                            return true; // Campo opcional
                          }

                          // Validar longitud máxima
                          if (value.length > 10) {
                            return "La patente no debe tener más de 10 caracteres";
                          }

                          // Validar formato (solo letras y números, sin caracteres especiales ni espacios)
                          const regex = /^[A-Z0-9]+$/i;
                          if (!regex.test(value)) {
                            return "La patente solo puede contener letras y números";
                          }
                          return true; // Válido
                        },
                      })}
                    />
                  </div>
                  <div className="grow shrink basis-0  flex-col justify-start items-start gap-2 inline-flex">
                    <div className="text-[#3d4245] text-sm font-normal font-inter">
                      Tipo
                    </div>
                    {/* <input
                      placeholder="Tipo"
                      className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                      onChange={(e) => {
                      setInput({ ...input, tipovh: e.target.value })
                    }}
                    /> */}
                    <select
                      className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                      defaultValue=""
                      {...register("tipovh", {
                        required: "Ingrese un tipo de vehículo por favor",
                      })}
                    >
                      <option value="" disabled>
                        Seleccionar tipo de vehículo
                      </option>
                      <option value="Automovil">Automovil</option>
                      <option value="Moto">Moto</option>
                      <option value="Camioneta">Camioneta</option>
                      <option value="Taxi-Remis">Taxi-Remis</option>
                      <option value="Autobus">Autobus</option>
                      <option value="Ciclomotor">Ciclomotor</option>
                      <option value="Camion">Camion</option>
                      <option value="Combi">Combi</option>
                      <option value="Cuatriciclo">Cuatriciclo</option>
                      <option value="Vehiculo desconocido">Otro</option>
                    </select>
                  </div>
                </div>
                <div className="self-stretch justify-start items-start gap-2 inline-flex">
                  <div className="grow shrink basis-0  flex-col justify-start items-start gap-2 inline-flex">
                    <div className="text-[#3d4245] text-sm font-normal font-inter">
                      Modelo
                    </div>
                    <input
                      name="modelovh"
                      placeholder="Modelo"
                      className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                      {...register("modelovh", {
                        validate: (value) => {
                          if (!value) {
                            return true; // Campo opcional
                          }

                          // Validar caracteres permitidos
                          const regex = /^[a-zA-Z0-9\s\-_/.,]+$/;
                          if (!regex.test(value)) {
                            return "El modelo solo puede contener letras, números y caracteres válidos como - _ / . ,";
                          }

                          // Validar longitud
                          if (value.length > 20) {
                            return "El modelo no debe tener más de 20 caracteres";
                          }

                          // Validar espacios consecutivos
                          if (/\s{2,}/.test(value)) {
                            return "El modelo no debe contener espacios consecutivos";
                          }

                          return true; // Válido
                        },
                        setValueAs: (value) => value?.trim(), // Eliminar espacios innecesarios
                      })}
                    />
                  </div>
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                    <div className="text-[#3d4245] text-sm font-normal font-inter">
                      Marca
                    </div>
                    <input
                      name="marcavh"
                      placeholder="Marca"
                      className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                      {...register("marcavh", {
                        validate: (value) => {
                          if (!value) {
                            return true; // Campo opcional
                          }

                          // Validar caracteres permitidos (solo letras, números, espacios y guiones)
                          const regex = /^[a-zA-Z0-9\s\-']+$/;
                          if (!regex.test(value)) {
                            return "La marca solo puede contener letras, números, espacios, guiones y apóstrofos.";
                          }

                          // Validar longitud
                          if (value.length > 15) {
                            return "La marca no debe tener más de 15 caracteres.";
                          }

                          // Validar espacios consecutivos
                          if (/\s{2,}/.test(value)) {
                            return "La marca no debe contener espacios consecutivos.";
                          }

                          return true; // Válido
                        },
                        setValueAs: (value) => value?.trim(), // Eliminar espacios al inicio o final
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="text-[#0a5477] text-base font-bold font-inter uppercase">
                Infractor
              </div>
              <div className="self-stretch  flex-col justify-start items-start gap-3 flex">
                <div className="self-stretch justify-start items-start gap-2 inline-flex">
                  <div className="grow shrink basis-0  flex-col justify-start items-start gap-2 inline-flex">
                    <div className="text-[#3d4245] text-sm font-normal font-inter">
                      Nombre y apellido
                    </div>
                    <input
                      placeholder="Nombre y apellido"
                      className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                      name="nombreCompleto"
                      {...register("nombreCompleto", {
                        validate: (value) => {
                          // Permitir valores vacíos
                          if (!value) {
                            return true; // Campo válido si está vacío
                          }

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
                  <div className="grow shrink basis-0  flex-col justify-start items-start gap-2 inline-flex">
                    <div className="text-[#3d4245] text-sm font-normal font-inter">
                      DNI
                    </div>
                    <input
                      placeholder="000000000"
                      className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                      type="number"
                      name="dni"
                      {...register("dni", {
                        validate: (value) => {
                          // Permitir valores vacíos
                          if (!value) {
                            return true; // Campo válido si está vacío
                          }

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
                <div className="self-stretch justify-start items-start gap-2 inline-flex">
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                    <div className="text-[#3d4245] text-sm font-normal font-inter">
                      CUIL
                    </div>
                    <input
                      placeholder="00000000000"
                      className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                      type="number"
                      name="cuil"
                      {...register("cuil", {
                        validate: (value) => {
                          // Permitir valores vacíos
                          if (!value) {
                            return true; // Campo válido si está vacío
                          }

                          // Limpiar el valor para validarlo (sin guiones ni espacios)
                          const cleanedValue = value.replace(/\D/g, "");

                          // Validar si tiene exactamente 11 dígitos después de limpiar
                          if (cleanedValue.length !== 11) {
                            return "El CUIL debe tener exactamente 11 dígitos.";
                          }

                          return true; // Si pasa la validación
                        },
                        setValueAs: (value) => {
                          if (!value) return value; // Si el valor es null o vacío, no lo modifica
                          const cleanedValue = value.replace(/\D/g, ""); // Elimina todos los caracteres no numéricos
                          if (cleanedValue.length === 11) {
                            // Formatear el CUIL con guiones
                            return `${cleanedValue.slice(
                              0,
                              2
                            )}-${cleanedValue.slice(
                              2,
                              10
                            )}-${cleanedValue.slice(10)}`;
                          }
                          return cleanedValue; // Si no tiene exactamente 11 dígitos, lo devuelve sin cambios
                        },
                      })}
                    />
                  </div>
                  <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                    <div className="text-[#3d4245] text-sm font-normal font-inter">
                      Sexo
                    </div>

                    <select
                      className="w-full text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                      defaultValue=""
                      {...register("sexo")}
                    >
                      <option value="" disabled>
                        Seleccionar sexo
                      </option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="NoBinario">No Binario</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="text-[#0a5477] text-base font-bold font-inter uppercase">
                Infracción
              </div>
              <div className="self-stretch flex-col justify-start items-start gap-2 flex">
                <div className="text-[#3d4245] text-sm font-normal font-inter">
                  Infracción
                </div>

                <select
                  className="w-full text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                  defaultValue=""
                  onChange={(e) => {
                    const selectedValue = e.target.value;

                    // Encuentra la infracción seleccionada por su descripción para tener el id
                    const selectedInfraccion = infracciones.find(
                      (infraccion) => infraccion.descrip === selectedValue
                    );

                    const currentInfracciones = getValues("infracciones") || [];

                    // Verifica si la infracción ya está seleccionada
                    if (
                      selectedInfraccion &&
                      !currentInfracciones.some(
                        (i) => i.descrip === selectedInfraccion.descrip
                      )
                    ) {
                      // Si no está seleccionada, agregamos la infracción al array
                      setInfraccionesSelected([
                        ...currentInfracciones,
                        selectedInfraccion,
                      ]);
                      setValue("infracciones", [
                        ...currentInfracciones,
                        selectedInfraccion,
                      ]);
                    }

                    // Limpiar el error de infracciones si se ha seleccionado alguna
                    clearErrors("infracciones");
                  }}
                >
                  <option value="" disabled>
                    Seleccionar infracción de tránsito
                  </option>
                  {infracciones.map((infraccion, index) => (
                    <option key={index} value={infraccion.descrip}>
                      {infraccion.descrip}
                    </option>
                  ))}
                </select>
                <div className="w-full">
                  {infraccionesSelected.length > 0 ? (
                    <ul className="space-y-2 w-full">
                      {infraccionesSelected.map((infraccion, index) => (
                        <li
                          key={index}
                          className="bg-white p-2 rounded-md shadow-sm text-sm font-medium flex justify-between "
                        >
                          <span>{infraccion.descrip}</span>
                          <button
                            type="button"
                            onClick={() => handleRemove(infraccion)}
                            className="text-red-500 hover:text-red-700 font-bold"
                          >
                            X
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className=" self-stretch h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center gap-1 inline-flex"
            >
              <span className="text-[#f6f5f5] text-base font-semibold font-inter">
                Siguiente
              </span>
            </button>
          </div>
        </form>
        <div className="gap-0  mb-[3rem] justify-center items-center text-center">
          {Object.values(errors).map((error, index) => (
            <p className="text-red-500" key={index}>
              {error.message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IngresoPolicialComponent;
