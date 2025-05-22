import React from "react";
import { useDispatch } from "react-redux";
import { setFotoLicencia } from "../../redux/actions";

function SubirFotoLicencia({ imagen, preview, handleBack, openConfirmarDatosLicencia }) {
  const dispatch = useDispatch();

  const handleConfirmar = async () => {
    await dispatch(setFotoLicencia(imagen))
    openConfirmarDatosLicencia()
  };

  return (
    <div>
      <div className="flex min-h-screen flex-col  items-center bg-black/90 inset-0 z-50 fixed">
        {preview ? (
          <div className="flex flex-col  items-center">
            <img
              src={preview}
              alt="Imagen"
              className="w-[20rem] my-[3rem] rounded-lg overflow-hidden"
            />

            <div className="justify-center items-center flex">
              <div className="w-[21.5rem] justify-center items-center gap-2 inline-flex">
                <button
                  onClick={handleBack}
                  className="w-full h-[50px] px-[10px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center  flex"
                >
                  <div className="text-[#0477ad] text-base font-semibold font-inter">
                    Cancelar
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
export default SubirFotoLicencia;
