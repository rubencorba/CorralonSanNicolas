import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useDispatch } from "react-redux";
import { updateFotoLicencia } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

function TakeFotoToUpdate({ closeTakeFotoToUpdate, id }) {
  const webcamRef = useRef(null);
  const [imagen, setImagen] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const capturarFoto = async () => {
    const captura = webcamRef.current.getScreenshot();

    if (captura) {
      // Convertir Base64 a Blob
      const blob = await fetch(captura).then(res => res.blob());

      // Crear un objeto File
      const file = new File([blob], `foto_${Date.now()}.jpeg`, { type: "image/jpeg" });

      setImagen(file);
    }
  };

  const [loading, setLoading] = useState(false);

  const handleConfirmar = async () => {
    setLoading(true);
    if (imagen) {
      // Crear un FormData
      const formData = new FormData();

      formData.append("foto", imagen); // Usamos 'imagen' como el archivo
      formData.append("id", id);

      const response = await dispatch(updateFotoLicencia(formData));
      if (response) {
        alert("Foto subida con éxito.");
      } else {
        alert("Hubo un error al subir la foto.");
      }
      setLoading(false);
      closeTakeFotoToUpdate(); // Cerrar el modal o componente después de la subida
      navigate(0); // Recarga la página completamente
    } else {
      console.error("No hay imagen capturada");
    }
  };


  // Para la imagen
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (imagen) {
      const objectUrl = URL.createObjectURL(imagen);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imagen]);

  return (
    <div>
      <div
        className="flex min-h-screen flex-col  items-center bg-black/90 inset-0 z-50 fixed"
        onClick={closeTakeFotoToUpdate} /* Cierra al hacer clic fuera */
      >
        {imagen ? (
          <div
            className="flex flex-col  items-center"
            onClick={(e) =>
              e.stopPropagation()
            } /* Evita que el clic dentro lo cierre */
          >
            <img
              src={preview}
              alt="Captura"
              className="mt-[6rem] rounded-lg overflow-hidden"
            />

            <div className=" mt-[5rem] justify-center items-center flex">
              <div className="w-[21.5rem] justify-center items-center gap-2 inline-flex">
                <button
                  onClick={() => setImagen(null)}
                  className="w-full h-[50px] px-[10px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center  flex"
                >
                  <div className="text-[#0477ad] text-base font-semibold font-inter">
                    Volver atrás
                  </div>
                </button>
                <button
                  onClick={() => handleConfirmar()}
                  disabled={loading}
                  className="w-full  h-[50px] px-[10px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center  flex"
                >
                  {loading ? (
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
                  ) : (
                    <div className="text-[#f6f5f5] text-base font-semibold font-inter">
                      Confirmar foto
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col  items-center"
            onClick={(e) =>
              e.stopPropagation()
            } /* Evita que el clic dentro lo cierre */
          >
            <div className="mt-[6rem] rounded-lg overflow-hidden">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={500}
                videoConstraints={{
                  facingMode: { exact: "environment" } // Usa la cámara trasera
                }}
              />
            </div>
            <button
              onClick={capturarFoto}
              className="flex flex-col justify-center items-center"
            >
              <div className="w-20 h-20 absolute bg-[#d84e4e] rounded-full border-8 border-white" />
            </button>

            <div className=" mt-[5rem] justify-center items-center flex">
              <div className="w-[21.5rem] justify-center items-center gap-2 inline-flex">
                <button
                  onClick={() => closeTakeFotoToUpdate()}
                  className="w-full h-[50px] px-[10px] py-[13px] bg-white rounded-lg border-[#0477ad] border justify-center items-center  flex"
                >
                  <div className="text-[#0477ad] text-base font-semibold font-inter">
                    Cancelar
                  </div>
                </button>
                <div className="w-full  h-[50px] px-[10px] py-[13px] bg-[#d2d2d2] rounded-lg justify-center items-center  flex">
                  <div className="text-[#f6f5f5] text-base font-semibold font-inter">
                    Confirmar foto
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default TakeFotoToUpdate;
