import React, { useRef, useState } from "react";
import Navbar from "../../components/navbar/navbarComponent";
import Webcam from "react-webcam";
import { Link, useNavigate } from "react-router-dom";

function LeerQRComponent () {
  const webcamRef = useRef(null);
  const [imagen, setImagen] = useState(null);

  const capturarFoto = () => {
    const captura = webcamRef.current.getScreenshot();
    setImagen(captura);
    console.log(captura);
  };

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Esto navega a la página anterior en el historial
  };

  return (
    <div >
      <div className="hidden lg:block">
      <Navbar />
      </div>



      <button
            onClick={handleBackClick}
            className="z-50 absolute sm:mt-[2.5rem] mt-[4rem] sm:ml-[5rem] lg:ml-[13rem] ml-[5rem] flex items-center justify-center p-2 rounded-full hover:drop-shadow-[3px_3px_5px_rgba(0,0,0,0.3)] transition ease-in-out duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="flex flex-start h-12 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]"
            >
              <defs>
                {/* <!-- Define the gradient for the arrow --> */}
                <linearGradient id="arrow-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="white" />
                  <stop offset="100%" stopColor="white" />
                </linearGradient>
              </defs>
              <circle cx="12" cy="12" r="8" fill="#0477AD" />
              <path
                fillRule="evenodd"
                fill="url(#arrow-gradient)"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                clipRule="evenodd"
              />
            </svg>
          </button>



      <div className="flex flex-col  items-center bg-[#F5FAFF]">

        {/* {imagen? (
          <div className="flex flex-col  items-center">
            <img src={imagen} alt="Captura" className="rotate-90 mt-[6rem] rounded-lg overflow-hidden"/>

        <div className=" mt-[5rem] justify-center items-center flex">
          <div className="w-[21.5rem] justify-center items-center gap-2 inline-flex">
            <button onClick={()=>setImagen(null)} className="w-full h-[50px] px-[10px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center  flex">
              <div className="text-[#0477ad] text-base font-semibold font-inter">Volver atrás</div>
            </button>
            <Link to={`/ingreso_confirmacion`} className="w-full  h-[50px] px-[10px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center  flex">
              <div className="text-[#f6f5f5] text-base font-semibold font-inter">Confirmar foto</div>      
            </Link>
          </div>
        </div>
        </div>
        ):( */}
        <div className="flex flex-col  items-center">
          <div className="rotate-90 sm:mt-[8rem] mt-[5rem] rounded-lg overflow-hidden">
            <Webcam
              audio={false}
          
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={500}

              className="sm:w-[500px] h-auto w-full h-screen"
            />
          </div>
          {/* <button onClick={capturarFoto} className="flex flex-col justify-center items-center"> */}
                {/* <div className="w-20 h-20 absolute bg-[#d84e4e] rounded-full border-8 border-white" /> */}
                <div className="flex flex-col justify-center items-center  mt-[4rem]   ">
                    <div className="text-[#3d4245] text-xl font-bold font-inter absolute bg-[#f5faff] rounded-lg px-[3rem] py-[1rem] shadow-[0px_4px_4px_0px_rgba(29,28,32,0.15)]">Apunta al QR</div>
                </div>
          {/* </button> */}



          {/* <div className=" mt-[5rem] justify-center items-center flex">
          <div className="w-[21.5rem] justify-center items-center gap-2 inline-flex">
            <div className="w-full h-[50px] px-[10px] py-[13px] bg-[#d2d2d2] rounded-lg  justify-center items-center  flex">
              <div className="text-[#f6f5f5] text-base font-semibold font-inter">Volver atrás</div>
            </div>
            <div className="w-full  h-[50px] px-[10px] py-[13px] bg-[#d2d2d2] rounded-lg justify-center items-center  flex">
              <div className="text-[#f6f5f5] text-base font-semibold font-inter">Confirmar foto</div>      
            </div>
          </div>
        </div> */}

        </div>
        {/* )} */}

        {/* {imagen && (
          <div>
            <h3>Foto Capturada:</h3>
            <img src={imagen} alt="Captura" className="rotate-90"/>
          </div>
        )} */}
      </div>
    </div>
    
  );
};
export default LeerQRComponent


