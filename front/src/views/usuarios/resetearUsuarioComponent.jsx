import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateContrasena } from "../../redux/actions";

function ResetearUsuarioComponent({ userId, onClose }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors }, // Accede a los errores del formulario
  } = useForm();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);

  // Para verificar la primera contraseña ingresada
  const contrasena = watch("contrasena");

  const onSubmit = async (data) => {
    // Agregar el campo id a los datos
    const finalData = { ...data, id: userId };
    await dispatch(updateContrasena(finalData));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[20rem] bg-white p-6 rounded-lg shadow-lg">
        <div className="text-2xl font-bold mb-4 text-center">
          Cambiar contraseña
        </div>
        {/* Contenido del formulario */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nueva contraseña
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Contraseña"
                className="w-full text-sm font-normal font-inter outline-none rounded-md   py-2"
                {...register("contrasena", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 7,
                    message: "La contraseña debe tener más de 6 caracteres",
                  },
                  maxLength: {
                    value: 15,
                    message: "La contraseña no debe exceder los 15 caracteres",
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
            <label className="block text-sm font-medium text-gray-700 my-2">
              Repita la contraseña
            </label>
            <div className="relative">
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
          <div className="flex flex-col justify-center gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[#0477AD] text-white rounded w-full font-inter"
            >
              Guardar
            </button>
            <button
              onClick={onClose} // Cierra el modal
              className="px-4 py-2 bg-white border border-[#0477AD] text-[#0477AD] font-inter rounded w-full"
            >
              Cancelar
            </button>
          </div>
        </form>
        {
          <div className="gap-0 mt-[1rem] mb-[1rem] justify-center items-center text-center">
            {Object.values(errors).map((error, index) => (
              <p className="text-red-500" key={index}>
                {error.message}
              </p>
            ))}
          </div>
        }
      </div>
    </div>
  );
}

export default ResetearUsuarioComponent;
