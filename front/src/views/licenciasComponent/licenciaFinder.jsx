import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { searchLicencia } from "../../redux/actions";

function LicenciaFinderComponent() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }, // Accede a los errores del formulario
  } = useForm();


  const onSubmit = async (data) => {

    const response = await dispatch(searchLicencia(data.dni));

    if (response === null) {
      setError("dni", {
        type: "server",
        message: "La licencia con ese DNI no fue ingresada" || "Error desconocido",
      });
    };
  };


  return (
    <div>
      <div className="flex w-full flex-col  items-center bg-[#F5FAFF]">

        <form
          onSubmit={handleSubmit(onSubmit)}
          class=" justify-start items-end gap-2 inline-flex"
        >
          <div class=" flex-col justify-start items-start inline-flex">

            <input
              placeholder="Nro de documento"
              className=" w-full  text-sm font-normal font-inter outline-none rounded-md  h-[50px]"
              type="number"
              name="dni"
              {...register("dni", {
                required: "Ingrese un número de dni por favor",
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
              onChange={() => clearErrors("dni")}
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

        <div className="justify-center items-center text-center min-h-[30px]">
          {errors.dni && (
            <p className="text-red-500  text-center">
              {errors.dni.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LicenciaFinderComponent;
