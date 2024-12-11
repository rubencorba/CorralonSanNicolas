import React, { useRef, useState } from "react";
import Navbar from "../../components/navbar/navbarComponent";
import Webcam from "react-webcam";
import { Link } from "react-router-dom";

function FotoComponent () {
  const webcamRef = useRef(null);
  const [imagen, setImagen] = useState(null);

  const capturarFoto = () => {
    const captura = webcamRef.current.getScreenshot();
    setImagen(captura);
    console.log(captura);
  };

  return (
    <div >
      <Navbar />
      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF]">

        
      <div className="rotate-90 mt-[6rem] rounded-lg overflow-hidden">
        <Webcam
          audio={false}
          height={700}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={450}
        />
        </div>
        <button onClick={capturarFoto} className="flex flex-col justify-center items-center">
                <div className="w-20 h-20 absolute bg-[#d84e4e] rounded-full border-8 border-white" />
        </button>

        <div className=" mt-[5rem] justify-center items-center flex">
        <div className="w-[21.5rem] justify-center items-center gap-2 inline-flex">
      <div className="w-full h-[50px] px-[10px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center  flex">
        <div className="text-[#0477ad] text-base font-semibold font-inter">Volver atrás</div>
      </div>
      <Link to={`/ingreso_foto`} className="w-full  h-[50px] px-[10px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center  flex">
        <div className="text-[#f6f5f5] text-base font-semibold font-inter">Confirmar foto</div>      
      </Link>
    </div>
    </div>

        {imagen && (
          <div>
            <h3>Foto Capturada:</h3>
            <img src={imagen} alt="Captura" className="rotate-90"/>
          </div>
        )}
      </div>
    </div>
    
  );
};
export default FotoComponent


