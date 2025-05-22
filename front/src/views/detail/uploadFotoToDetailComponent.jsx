import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actualizarFoto } from "../../redux/actions";

function UploadFotoToDetailComponent({ id, imagen, closeUploadFoto }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConfirmar = async () => {
    try {
      const formData = new FormData();
      // Convertir la imagen de base64 a un archivo Blob
      const blob = await fetch(imagen).then((res) => res.blob());
      const file = new File([blob], `foto_${Date.now()}.jpeg`, {
        type: "image/jpeg",
      });

      formData.append("foto", file);
      formData.append("id", id);

      const response = await dispatch(actualizarFoto(formData));

      if (response) {
        alert("Foto subida con éxito.");
      } else {
        alert("Hubo un error al subir la foto.");
      }

      closeUploadFoto(); 
      navigate(0);
    } catch (error) {
      console.error("Error al subir la foto:", error);
      alert("Hubo un error al intentar subir la foto.");
    }
  };

  return (
    <div>
      <div className="flex min-h-screen flex-col  items-center bg-black/90 inset-0 z-50 fixed">
        {imagen ? (
          <div className="flex flex-col  items-center">
            <img
              src={imagen}
              alt="Imagen"
              className="w-[20rem] my-[3rem] rounded-lg overflow-hidden"
            />

            <div className="justify-center items-center flex">
              <div className="w-[21.5rem] justify-center items-center gap-2 inline-flex">
                <button
                  onClick={closeUploadFoto}
                  className="w-full h-[50px] px-[10px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center  flex"
                >
                  <div className="text-[#0477ad] text-base font-semibold font-inter">
                    Volver atrás
                  </div>
                </button>
                <button
                  onClick={() => handleConfirmar()}
                  className="w-full  h-[50px] px-[10px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center  flex"
                >
                  <div className="text-[#f6f5f5] text-base font-semibold font-inter">
                    Confirmar foto
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>Hubo un problema al cargar la foto</div>
        )}
      </div>
    </div>
  );
}
export default UploadFotoToDetailComponent;
