import React, { useRef, useState } from "react";
import Navbar from "../../components/navbar/navbarComponent";
import Webcam from "react-webcam";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ingresoFoto } from "../../redux/actions";

function FotoComponent () {
  const webcamRef = useRef(null);
  const [imagen, setImagen] = useState(null);

  const capturarFoto = () => {
    const captura = webcamRef.current.getScreenshot();
    setImagen(captura);
    console.log(captura);

  };


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConfirmar = (/* event */) => {
      /* event.preventDefault(); */ // Evita el comportamiento por defecto
      dispatch(ingresoFoto(imagen))
      
      /* console.log(input) */
      navigate('/ingreso_confirmacion')
    };

    const handleback =()=>{
      navigate(-1)
      }




  return (
    <div >
      <Navbar />
      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF]">

        
      

        {imagen? (
          <div className="flex flex-col  items-center">
            <img src={imagen} alt="Captura" className="rotate-90 mt-[6rem] rounded-lg overflow-hidden"/>

        <div className=" mt-[5rem] justify-center items-center flex">
          <div className="w-[21.5rem] justify-center items-center gap-2 inline-flex">
            <button onClick={()=>setImagen(null)} className="w-full h-[50px] px-[10px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center  flex">
              <div className="text-[#0477ad] text-base font-semibold font-inter">Volver atrás</div>
            </button>
            <button
            onClick={()=>handleConfirmar()} className="w-full  h-[50px] px-[10px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center  flex">
              <div className="text-[#f6f5f5] text-base font-semibold font-inter">Confirmar foto</div>      
            </button>
          </div>
        </div>
        </div>
        ):(
        <div className="flex flex-col  items-center">
          <div className="rotate-90 mt-[6rem] rounded-lg overflow-hidden">
            <Webcam
              audio={false}
          
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={500}
            />
          </div>
          <button onClick={capturarFoto} className="flex flex-col justify-center items-center">
                <div className="w-20 h-20 absolute bg-[#d84e4e] rounded-full border-8 border-white" />
          </button>



          <div className=" mt-[5rem] justify-center items-center flex">
          <div className="w-[21.5rem] justify-center items-center gap-2 inline-flex">
            <button onClick={()=>handleback()} className="w-full h-[50px] px-[10px] py-[13px] bg-[#d2d2d2] rounded-lg  justify-center items-center  flex">
              <div className="text-[#f6f5f5] text-base font-semibold font-inter">Volver atrás</div>
            </button>
            <div className="w-full  h-[50px] px-[10px] py-[13px] bg-[#d2d2d2] rounded-lg justify-center items-center  flex">
              <div className="text-[#f6f5f5] text-base font-semibold font-inter">Confirmar foto</div>      
            </div>
          </div>
        </div>

        </div>
        )}

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
export default FotoComponent


