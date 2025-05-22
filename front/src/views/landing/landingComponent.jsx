import { useNavigate } from "react-router-dom";
import { useState } from "react";
import snLogo from "./sn-logo-blanco.png";
import snFondo from "./sn-imagen-fondo.jpeg";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../../redux/actions";

function Landing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    clearErrors("dni");
  };

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }, // Accede a los errores del formulario
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    data.contrasena = password.trim()

    const response = await dispatch(login(data));
    if (response.message) {
      setError("dni", {
        type: "server",
        message: response.message || "Error desconocido", // Muestra el mensaje del servidor
      });
    } else {
      navigate("/inicio");
    }

    setLoading(false);
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
                      const cleanedValue = value.replace(/\s+/g, ""); // Elimina todos los espacios

                      if (!/^\d+$/.test(cleanedValue)) {
                        return "El DNI solo puede contener números.";
                      }

                      if (cleanedValue.length < 6 || cleanedValue.length > 9) {
                        return "El DNI debe tener entre 6 y 9 dígitos.";
                      }

                      return true;
                    },
                    setValueAs: (value) => value?.replace(/\s+/g, ""), // Eliminar espacios innecesarios
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
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => {
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSubmit(onSubmit)();
                      }
                    }}
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
                className="w-full mt-1 py-[9px] bg-[#0477ad] rounded-lg flex justify-center items-center"
                disabled={loading} // Deshabilita el botón mientras carga
              >
                {loading ? (
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                ) : (
                  <span className="text-[#f6f5f5] text-sm font-semibold font-inter">
                    Iniciar sesión
                  </span>
                )}
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
