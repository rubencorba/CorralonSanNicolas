import { useDispatch } from "react-redux";
import Navbar from "../navbar/navbarComponent";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postNewUser } from "../../redux/actions";

function NuevoUsuarioComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors }, // Accede a los errores del formulario
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    // Generar fecha y hora actual en el formato deseado
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
      now.getSeconds()
    ).padStart(2, "0")}`;

    // Agregar el campo "fecha" a los datos
    const finalData = { ...data, fecha: formattedDate };

    const resp = await dispatch(postNewUser(finalData));

    if (resp.error) {
      setError("dni", {
        type: "server",
        message: resp.error || "Error desconocido", // Muestra el mensaje del servidor
      })
    } else {
      alert("Usuario ingresado con éxito");
      navigate("/usuarios");
    }

    setLoading(false);
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);

  // Para verificar la primera contraseña ingresada
  const contrasena = watch("contrasena");

  const handleback = (e) => {
    e.preventDefault();
    navigate(-1)
  }

  return (
    <div>
      <Navbar />

      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] ">
        <div className="text-[#3d4245] sm:text-[28px] text-[20px] font-bold font-inter sm:my-[3rem] my-[1rem] sm:my-[3rem]">
          Nuevo usuario
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[20rem] sm:w-[32rem] flex-col justify-start items-start gap-6 inline-flex">
            <div className="self-stretch  flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch flex-col justify-start items-start gap-2 flex">
                <div className="text-[#3d4245] text-sm font-normal font-inter">
                  Nombre y apellido
                </div>

                <input
                  placeholder="Nombre y apellido"
                  className="self-stretch p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex  text-sm font-normal font-inter"
                  name="nombreCompleto"
                  {...register("nombreCompleto", {
                    required: "Ingrese el nombre y apellido por favor",
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
                {/* </div> */}
              </div>
              <div className="self-stretch  flex-col justify-start items-start gap-2 flex">
                <div className="text-[#3d4245] text-sm font-normal font-inter">
                  DNI
                </div>

                <input
                  placeholder="000000000"
                  className="self-stretch p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex text-sm font-normal font-inter"
                  type="number"
                  name="dni"
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
              <div className="self-stretch flex-col justify-start items-start gap-2 flex">
                <div className="text-[#3d4245] text-sm font-normal font-inter">
                  Tipo de usuario
                </div>
                <select
                  className="self-stretch p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex text-sm font-normal font-inter"
                  defaultValue=""
                  {...register("tipo", {
                    required: "Ingrese un tipo de usuario por favor",
                  })}
                >
                  <option value="" disabled>
                    Seleccionar tipo de usuario
                  </option>
                  <option value="super_admin">Super admin</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <div className="self-stretch flex-col justify-start items-start gap-2 flex">
                <div className="text-[#3d4245] text-sm font-normal font-inter">
                  Contraseña
                </div>

                <div className="relative w-[20rem] sm:w-[32rem]">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Contraseña"
                    className="w-full text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2"
                    {...register("contrasena", {
                      required: "La contraseña es obligatoria",
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
              <div className="self-stretch flex-col justify-start items-start gap-2 flex">
                <div className="text-[#3d4245] text-sm font-normal font-inter">
                  Confirmación de contraseña
                </div>

                <div className="relative w-[20rem] sm:w-[32rem]">
                  <input
                    type={isPasswordVisible2 ? "text" : "password"}
                    placeholder="Contraseña"
                    className="w-full text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2"
                    {...register("contrasena2", {
                      required: "Confirme la contraseña por favor",
                      validate: (value) =>
                        value === contrasena || "Las contraseñas no coinciden",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible2(!isPasswordVisible2)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {isPasswordVisible2 ? (
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
            </div>

            {Object.values(errors).map((error, index) => (
            <p className="text-red-500" key={index}>
              {error.message}
            </p>
          ))}
            <div className="self-stretch justify-center items-center gap-2 sm:inline-flex mb-[1rem]">


              
              <button
                type="submit"
                className="w-full grow shrink basis-0 h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center gap-1 flex overflow-hidden sm:mb-0 mb-[0.5rem]"
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
                  <div className="text-[#f6f5f5] text-center font-semibold font-inter">
                    Registrar usuario
                  </div>
                )}
              </button>


              <button onClick={handleback} className="w-full grow shrink basis-0 h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 flex overflow-hidden">
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

export default NuevoUsuarioComponent;
