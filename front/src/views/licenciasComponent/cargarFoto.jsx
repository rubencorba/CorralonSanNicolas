import { useState } from "react";
import UpToUpdateFotoLicencia from "./upToUpdateFoto";


function CargarFotoLicencia({ closeCargarFoto, openTakeFotoToUpdate, id }) {

  const [imagen, setImagen] = useState(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

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


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 "
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeCargarFoto();
        }
      }}
    >
      {!imagen ? (
        <div
          className="w-[20rem] sm:w-[30rem] px-1 py-1 bg-white rounded-xl flex flex-col justify-center  gap-6 mx-5 overflow-y-auto my-[2rem]"
          onClick={(e) =>
            e.stopPropagation()
          } /* Evita que el clic dentro lo cierre */
        >
          <div className="my-[1rem]  flex-col justify-start items-start gap-3 inline-flex mx-[1rem]">
            <button
              onClick={openTakeFotoToUpdate}
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
                <div className="text-[#687073] text-start text-sm font-normal font-inter">
                  Capturar una foto de la licencia
                </div>
              </div>
            </button>
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
          </div>
        </div>
      ) : (
        <UpToUpdateFotoLicencia imagen={imagen} preview={preview} handleBack={handleBack} id={id} />
      )}
    </div>
  );
}

export default CargarFotoLicencia;
