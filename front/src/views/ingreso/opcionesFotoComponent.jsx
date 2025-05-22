import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbarComponent";
import { useState } from "react";
import SubirFotoComponent from "./subirFotoComponent";
import { useDispatch } from "react-redux";
import { limpiarFoto } from "../../redux/actions";

function OpcionesFotoComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [imagen, setImagen] = useState(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return; // Si no hay archivo, no hacer nada

    // Validar tipo de archivo (solo imágenes)
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecciona un archivo de imagen válido.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("La imagen es demasiado grande. Selecciona una de menos de 5MB.");
      return;
    }


    // Crear vista previa
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Guardar el archivo en el estado
    setImagen(file);

  };

  const handleBack = () => {
    setImagen(null);
  };

  const handleVolver = () => {
    navigate(-1);
  };
 
  //----Limpiar store si el secuestro se sube sin foto-----//
  const handlePostearSinFoto = async() => {
    await dispatch(limpiarFoto()); // Limpiar foto del store
    navigate("/ingreso_confirmacion");
  };

  return (
    <div>
      <Navbar />
      {!imagen ? (
        <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] gap-8 ">
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
              <div className="w-[33.40px] h-[33.40px] px-[5.01px] py-[6.68px] bg-[#0477ad] rounded-[33.40px] border-2 border-[#0477ad] justify-center items-center gap-[3.34px] flex">
                <div className="w-5 h-5 relative" />
              </div>
              <div className="grow shrink basis-0 h-[2.50px] bg-[#0477ad]" />
              <div className="w-[33.40px] h-[33.40px] p-[3.34px] bg-[#c5dfff] rounded-[33.40px] border-2 border-[#0477ad]" />
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

          <div className="my-[1rem]  flex-col justify-start items-start gap-3 inline-flex mx-[1rem]">
            <Link
              to="/ingreso_foto"
              className="self-stretch px-4 py-7 bg-white rounded-lg border border-[#c5dfff] justify-start items-center gap-2.5 inline-flex"
            >
              <div className="w-[49px] h-[49px] relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-18 stroke-[#0477ad]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                  />
                </svg>
              </div>
              <div className="flex-col justify-start items-start gap-1 inline-flex">
                <div className="text-[#0477ad] text-lg font-bold font-inter">
                  Tomar foto
                </div>
                <div className="text-[#687073] text-sm font-normal font-inter">
                  Capturar una foto del vehículo ingresado
                </div>
              </div>
            </Link>
            <label
              for="file-upload"
              htmlFor="file-upload"
              className="self-stretch px-4 py-7 bg-white rounded-lg border border-[#c5dfff] justify-start items-center gap-2.5 inline-flex cursor-pointer"
            >
              <div className="w-[49px] h-[49px] relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-18 stroke-[#0477ad]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </div>
              <div className="flex-col justify-start items-start gap-1 inline-flex">
                <div className="text-[#0477ad] text-lg font-bold font-inter">
                  Subir foto
                </div>
                <div className="text-[#687073] text-sm font-normal font-inter">
                  Cargar una foto del dispositivo
                </div>
              </div>

              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <button
              onClick={handlePostearSinFoto}
              className="self-stretch px-4 py-7 bg-white rounded-lg border border-[#c5dfff] justify-start items-center gap-2.5 inline-flex"
            >
              <div className="w-[49px] h-[49px] relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-18 stroke-[#0477ad]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                  />
                </svg>
              </div>
              <div className="flex-col justify-start items-start gap-1 inline-flex">
                <div className="text-[#0477ad] text-lg font-bold font-inter">
                  Saltar este paso
                </div>
                <div className="text-[#687073] text-sm font-normal font-inter">
                  Capturar una foto mas tarde
                </div>
              </div>
              <div className="p-0.5 justify-start items-center gap-2.5 flex" />
            </button>
            <button
              onClick={handleVolver}
              className="self-stretch px-4 py-7 bg-white rounded-lg border border-[#c5dfff] justify-start items-center gap-2.5 inline-flex"
            >
              <div className="w-[49px] h-[49px] relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-18 stroke-[#0477ad]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  />
                </svg>
              </div>
              <div className="flex-col justify-start items-start gap-1 inline-flex">
                <div className="text-[#0477ad] text-lg font-bold font-inter">
                  Volver atrás
                </div>
                <div className="text-[#687073] text-sm font-normal font-inter">
                  Regresar a los detalles del ingreso
                </div>
              </div>
            </button>
          </div>
        </div>
      ) : (
        /* Renderiza la imagen sólo en caso de subirla desde el dispositivo */
        <SubirFotoComponent imagen={imagen} preview={preview} handleBack={handleBack} />
      )}
    </div>
  );
}

export default OpcionesFotoComponent;
