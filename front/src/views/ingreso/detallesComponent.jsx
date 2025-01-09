import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbarComponent";
import { useState } from "react";
import { ingresoDetalles } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function DetallesComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }, // Accede a los errores del formulario
  } = useForm();

  const handleback = () => {
    navigate(-1);
  };


  const onSubmit = async (data) => {
    const resp =  await dispatch(ingresoDetalles(data));
    
    if (resp.isUnique) {
      navigate("/ingreso_foto");
    } else {
      setError("nroInventario", {
        type: "server",
        message: resp.message || "Error desconocido", // Muestra el mensaje del servidor
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] gap-8">
        <div class="flex flex-col justify-center items-start sm:items-center inline-flex mt-[1rem] sm:mt-[4rem] w-[20rem] sm:w-[32rem]">
          <div class="text-[#3d4245] sm:text-[2rem] text-[1rem] font-bold font-inter">
            Nuevo ingreso
          </div>
          <div class="text-[#687073] sm:text-lg text-s font-medium font-inter">
            Ingresa un nuevo vehículo al corralón
          </div>
        </div>

        <div className="w-[20rem] sm:w-[32rem] h-[56.40px] flex-col justify-start items-start gap-1 inline-flex">
          <div className="self-stretch justify-start items-center inline-flex">
            <div className="w-[33.40px] h-[33.40px] px-[5.01px] py-[6.68px] bg-[#0477ad] rounded-[33.40px] border-2 border-[#0477ad] justify-center items-center gap-[3.34px] flex">
              <div className="w-5 h-5 relative" />
            </div>
            <div className="grow shrink basis-0 h-[2.50px] bg-[#0477ad]" />
            <div className="w-[33.40px] h-[33.40px] p-[3.34px] bg-[#c5dfff] rounded-[33.40px] border-2 border-[#0477ad]" />
            <div className="grow shrink basis-0 h-[2.50px] bg-[#0477ad]" />
            <div className="w-[33.40px] h-[33.40px] p-[3.34px] rounded-[33.40px] border-2 border-[#0477ad]" />
          </div>
          <div className="self-stretch px-1 justify-between items-start inline-flex">
            <div className="text-[#3d4245] text-base font-semibold font-inter">
              Acta
            </div>
            <div className="text-[#3d4245] text-base font-semibold font-inter">
              Detalles
            </div>
            <div className="text-[#3d4245] text-base font-semibold font-inter">
              Foto
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="h-[319px] w-[20rem] sm:w-[23rem] flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch h-[249px] flex-col justify-start items-start gap-3 flex">
              <div className="self-stretch h-[75px] flex-col justify-start items-start gap-2 flex">
                <div className="text-[#3d4245] text-sm font-normal font-inter">
                  Sector
                </div>

                <select
                  className="w-full text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                  defaultValue=""
                  {...register("sector", {
                    required: "Ingrese un sector por favor",
                  })}
                >
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
              <div className="self-stretch h-[75px] flex-col justify-start items-start gap-2 flex">
                <div className="text-[#3d4245] text-sm font-normal font-inter">
                  N° Inventario (si corresponde)
                </div>

                <input
                  name="nroInventario"
                  type="number"
                  {...register("nroInventario", {
                    validate: (value) => {
                      if (value === "" || value === undefined) {
                        // Si el campo está vacío, no ejecutar más validaciones
                        return true;
                      }
                      if (isNaN(value))
                        return "El número de inventario debe ser válido";
                      if (!/^\d+$/.test(value))
                        return "El número de inventario debe ser válido y entero";
                      if (Number(value) <= 0)
                        return "El número de inventario debe ser mayor a 0";
                      if (value.length > 10)
                        return "El número de inventario no debe ser demasiado largo";
                      return true; // Válido
                    },
                  })}
                  placeholder="0"
                  style={{
                    MozAppearance: "textfield",
                    WebkitAppearance: "none",
                  }}
                  className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                />
              </div>
              <div className="self-stretch h-[75px] flex-col justify-start items-start gap-2 flex">
                <div className="text-[#3d4245] text-sm font-normal font-inter">
                  Fecha y hora de ingreso
                </div>

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
                  className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4  py-2 h-[50px]"
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
            <div className="self-stretch justify-start items-center gap-2 inline-flex">
              <button
                onClick={() => handleback()}
                className="grow shrink basis-0 h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 flex"
              >
                <div className="text-[#0477ad] text-base font-semibold font-inter">
                  Volver atrás
                </div>
              </button>
              <button
                type="submit"
                className="grow shrink basis-0 h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center gap-1 flex"
              >
                <div className="text-[#f6f5f5] text-base font-semibold font-inter">
                  Siguiente
                </div>
              </button>
            </div>
          </div>
        </form>

        {Object.values(errors).map((error, index) => (
          <p className="text-red-500" key={index}>
            {error.message}
          </p>
        ))}
      </div>
    </div>
  );
}

export default DetallesComponent;
