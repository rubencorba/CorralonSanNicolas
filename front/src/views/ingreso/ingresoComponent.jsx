import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbarComponent";
import { searchActa } from "../../redux/actions";
import { useForm } from "react-hook-form";

function IngresoComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }, // Accede a los errores del formulario
  } = useForm();

  const [secuestroId, setSecuestroId] = useState("");

  const onSubmit = async (data) => {
    const error = await dispatch(searchActa(data.nroActa));
    console.log(error)
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
    }
  };

  const handleVerIngreso = async () => {
    navigate(`/detail/${secuestroId}`);
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          /* action="" */ class="w-[20rem] sm:w-[32rem] h-[75px] justify-start items-end gap-2 inline-flex"
        >
          <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
            <div class="text-[#3d4245] text-sm font-normal font-inter">
              N° acta
            </div>

            <input
              name="nroActa"
              type="number"
              className=" w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
              {...register("nroActa", {
                required: "Ingrese un número de acta por favor",
                validate: (value) => {
                  if (isNaN(value)) return "Debe ser un número válido";
                  if (!/^\d+$/.test(value))
                    return "Debe ser un número válido y entero";
                  if (Number(value) <= 0) return "El número debe ser mayor a 0";
                  if (value.length > 10)
                    return "El número es demasiado largo para ser válido";
                  return true; // Válido
                },
              })}
              placeholder="0"
              style={{
                MozAppearance: "textfield",
                WebkitAppearance: "none",
              }}
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
        {errors.nroActa && (
          <p className="text-red-500">{errors.nroActa.message}</p>
        )}
        {errors.nroActa?.message ==
            "Este número de acta ya fue ingresado al corralón" && (
            <button
              onClick={handleVerIngreso}
              className="text-blue-500 justify-center items-center text-center"
            >
              Ver ingreso
            </button>
          )}
      </div>
    </div>
  );
}

export default IngresoComponent;
