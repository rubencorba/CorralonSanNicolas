import React, { useRef, useState } from "react";
import Navbar from "../../components/navbar/navbarComponent";
import Webcam from "react-webcam";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actualizarFoto } from "../../redux/actions";

function TakeFotoToDetailComponent({ id, closeTakeFoto }) {
  const webcamRef = useRef(null);
  const [imagen, setImagen] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //------------Capturar foto------------//
  const capturarFoto = () => {
    const captura = webcamRef.current.getScreenshot();
    setImagen(captura);
  };

  const handleConfirmar = () => {
    const info = {
      foto: imagen,
      id: id,
    };
    dispatch(actualizarFoto(info));

    navigate(0); // Recarga la página completamente
  };

  return (
    <div>
      <div
        className="flex min-h-screen flex-col  items-center bg-black/90 inset-0 z-50 fixed"
        onClick={closeTakeFoto} /* Cierra al hacer clic fuera */
      >
        {imagen ? (
          <div
            className="flex flex-col  items-center"
            onClick={(e) =>
              e.stopPropagation()
            } /* Evita que el clic dentro lo cierre */
          >
            <img
              src={imagen}
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
                  onClick={() => closeTakeFoto()}
                  className="w-full h-[50px] px-[10px] py-[13px] bg-white rounded-lg border-[#0477ad] border justify-center items-center  flex"
                >
                  <div className="text-[#0477ad] text-base font-semibold font-inter">
                    Volver atrás
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
export default TakeFotoToDetailComponent;
