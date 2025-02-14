import React, { useRef, useState } from "react";
import Navbar from "../../components/navbar/navbarComponent";
import Webcam from "react-webcam";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ingresoFoto } from "../../redux/actions";

function SubirFotoComponent({imagen,handleBack}) {  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConfirmar = () => {
          dispatch(ingresoFoto(imagen))
          navigate('/ingreso_confirmacion')
  };



  return (
    <div>

      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF]">
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
                  onClick={handleBack}
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
export default SubirFotoComponent;
