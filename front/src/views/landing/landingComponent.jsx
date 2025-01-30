import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import snLogo from "./sn-logo-blanco.png";
import snFondo from "./sn-imagen-fondo.jpeg";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../../redux/actions";

/* Luego descomentar required para que sea un campo requerido!!!! */

function Landing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }, // Accede a los errores del formulario
  } = useForm();

  const onSubmit = async (data) => {

    const response = await dispatch(login(data));
    if (response.message) {
      setError("dni", {
        type: "server",
        message: response.message || "Error desconocido", // Muestra el mensaje del servidor
      });
    } else {
      navigate("/inicio");
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="w-full h-screen  flex flex-col justify-start items-center gap-[6rem]">
      {/* Encabezado */}
      <div className="w-full h-[5rem]  py-[1rem] bg-[#0477ad] shadow flex items-center">
        <div className="relative w-full h-full justify-start items-center flex">
          <img
            src={snLogo}
            alt="Logo San Nicolas"
            className="w-[3rem] ml-[1.5rem]"
          />
          <div className=" w-[39px] border border-[#f6f5f5]  rotate-90" />
          <div className=" text-[#f6f5f5] text-sm font-normal font-inter">
            Corralón San Nicolás
          </div>
        </div>
      </div>

      <img
        src={snFondo}
        alt=""
        className="absolute w-full h-full object-cover top-0 left-0 -z-10"
      />

      {/* Contenedor principal */}
      <div className="sm:w-full max-w-[22rem] mx-5 sm:px-6 px-8 py-3 bg-white rounded-lg shadow flex flex-col justify-center items-center ">
        <div className="py-5 flex flex-col justify-center items-center gap-7 sm:w-[18rem]">
          {/* Título */}
          <div className="text-[#3d4245] text-xl font-bold font-inter text start w-full">
            Inicio de sesión
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-start items-start gap-5">
              {/* Campo DNI */}
              <div className=" flex flex-col justify-start items-start gap-1">
                <label className="text-[#3d4245] text-sm font-normal font-inter">
                  DNI
                </label>

                <input
                  name="dni"
                  type="text"
                  placeholder="0000000000000"
                  className="sm:w-[18rem] w-[14rem] text-sm font-normal font-inter outline-none rounded-md"
                  {...register("dni", {
                    required: "Ingrese el número de DNI por favor",
                    validate: (value) => {
                      // Validar que solo contenga números
                      if (!/^\d+$/.test(value)) {
                        return "El DNI solo puede contener números.";
                      }

                      // Validar longitud permitida (6 a 9 dígitos)
                      if (value.length < 6 || value.length > 9) {
                        return "El DNI debe tener entre 6 y 9 dígitos.";
                      }

                      return true; // Válido
                    },
                    setValueAs: (value) => value?.trim(), // Eliminar espacios innecesarios
                  })}
                />
              </div>

              {/* Campo Contraseña */}
              <div className=" flex flex-col justify-start items-start gap-1">
                <label className="text-[#3d4245] text-sm font-normal font-inter">
                  Contraseña
                </label>
                <div className="relative sm:w-[18rem] w-[14rem] ">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Contraseña"
                    className="w-full text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 "
                    {...register("contrasena", {
                      required: "Ingrese la contraseña por favor",
                      minLength: {
                        value: 7,
                        message: "La contraseña debe tener más de 6 caracteres",
                      },
                      maxLength: {
                        value: 15,
                        message:
                          "La contraseña no debe exceder los 15 caracteres",
                      },
                    })}
                    onChange={
                      // Limpiar el error al corregir
                      () => clearErrors("dni")
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {isPasswordVisible ? (
                      // Ícono para ocultar contraseña
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      // Ícono para mostrar contraseña
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="w-full mt-1 py-[9px] bg-[#0477ad] rounded-lg flex justify-center items-center "
              >
                <span className="text-[#f6f5f5] text-sm font-semibold font-inter">
                  Iniciar sesión
                </span>
              </button>
            </div>
          </form>
          <div className="gap-0  justify-center items-center text-center">
            {Object.values(errors).map((error, index) => (
              <p className="text-red-500" key={index}>
                {error.message}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
