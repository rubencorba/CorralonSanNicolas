import { useDispatch } from "react-redux";
import Navbar from "../navbar/navbarComponent";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  getSecuestroByDominio,
  getSecuestroByNroActa,
} from "../../redux/actions";

function BuscarVehiculoComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmitDominio = async (data, event) => {
  event.preventDefault();
  const response = await dispatch(getSecuestroByDominio(data.dominio));

  if (!response?.success) {
    setError("dominio", {
      type: "server",
      message: response?.message || "Error desconocido",
    });
  } else {
    navigate(`/detail/${response.data}`);
  }
};
  
  const onSubmitActa = async (data, event) => {
    event.preventDefault();
    const response = await dispatch(getSecuestroByNroActa(data.nroActa));
    
    if (!response.success) {
    setError("nroActa", {
      type: "server",
      message: response.message || "No se encontró vehículo con ese número de acta",
    });
  } else {
    navigate(`/detail/${response.data}`);
  }
};

/*   const onSubmitInventario = async (data, event) => {
    event.preventDefault();
    const response = await dispatch(
      getSecuestroByNroInventario(data.nroInventario)
    );
    if (response.isUnique) {
      setError("nroInventario", {
        type: "server",
        message: "No se encontró vehículo con ese número de inventario",
      });
    } else {
      navigate(`/detail/${response.secuestroId}`);
    }
  }; */

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] gap-8">
        <div class="flex flex-col justify-center items-start sm:items-center inline-flex mt-[1rem] sm:mt-[4rem] w-[20rem] lg:w-[41rem] sm:w-[35rem]">
          <div class="text-[#3d4245] sm:text-[2rem] text-[1rem] font-bold font-inter">
            Buscar vehículo
          </div>
          <div class="text-[#687073] sm:text-lg text-s font-medium font-inter ">
            Buscar un vehículo aplicando los filtros de patente, numero de acta
            o inventario
          </div>
        </div>

        <div className="w-[20rem] sm:w-[28rem] p-4 bg-white rounded-lg shadow-[1px_2px_8px_1px_rgba(220,220,220,0.45)] flex-col justify-start items-start gap-10 inline-flex overflow-hidden mb-[3rem]">
          <form
            onSubmit={handleSubmit(onSubmitDominio)}
            className="self-stretch  flex-col justify-end items-center gap-2 flex"
          >
            <div className="self-stretch  flex-col justify-start items-start gap-2 flex">
              <div className="text-[#3d4245] text-sm font-normal font-inter">
                Patente
              </div>
              <input
                name="dominio"
                placeholder="AAA000 / AA000AA"
                className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex"
                {...register("dominio", {
                  validate: (value) => {
                    if (!value) {
                      return true;
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

            {errors.dominio && (
              <span className="text-red-500 text-sm">
                {errors.dominio.message}
              </span>
            )}

            <button
              type="submit"
              className="self-stretch h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 inline-flex overflow-hidden"
            >
              <div className="text-[#0477ad] text-base font-semibold font-inter">
                Buscar por patente{" "}
              </div>
            </button>
          </form>
          <form
            onSubmit={handleSubmit(onSubmitActa)}
            className="self-stretch flex-col justify-end items-center gap-2 flex"
          >
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="text-[#3d4245] text-sm font-normal font-inter">
                N° acta
              </div>
              <input
                name="nroActa"
                type="number"
                className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex"
                {...register("nroActa", {
                  validate: (value) => {
                    if (value === "" || value === undefined) {
                      return true;
                    }
                    if (isNaN(value)) return "Debe ser un número válido";
                    if (!/^\d+$/.test(value))
                      return "Debe ser un número válido y entero";
                    if (Number(value) <= 0)
                      return "El número debe ser mayor a 0";
                    if (value.length > 10)
                      return "El número es demasiado largo para ser válido";
                    return true;
                  },
                })}
                placeholder="00000"
                style={{
                  MozAppearance: "textfield",
                  WebkitAppearance: "none",
                }}
              />
            </div>
            {errors.nroActa && (
              <span className="text-red-500 text-sm">
                {errors.nroActa.message}
              </span>
            )}
            <button
              type="submit"
              className="self-stretch h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 inline-flex overflow-hidden"
            >
              <div className="text-[#0477ad] text-base font-semibold font-inter">
                Buscar por N° acta
              </div>
            </button>
          </form>

          {/* <form
            onSubmit={handleSubmit(onSubmitInventario)}
            className="self-stretch flex-col justify-end items-center gap-2 flex"
          >
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="text-[#3d4245] text-sm font-normal font-inter">
                N° inventario
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
                placeholder="00000"
                style={{
                  MozAppearance: "textfield",
                  WebkitAppearance: "none",
                }}
                className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex"
              />
            </div>
            {errors.nroInventario && (
              <span className="text-red-500 text-sm">
                {errors.nroInventario.message}
              </span>
            )}
            <button
              type="submit"
              className="self-stretch h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 inline-flex overflow-hidden"
            >
              <div className="text-[#0477ad] text-base font-semibold font-inter">
                Buscar por inventario
              </div>
            </button>
          </form> */}
        </div>
      </div>
    </div>
  );
}

export default BuscarVehiculoComponent;
