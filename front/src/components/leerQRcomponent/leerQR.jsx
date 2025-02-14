import React, { useRef, useState ,useCallback, useEffect} from "react";
import Navbar from "../../components/navbar/navbarComponent";
import Webcam from "react-webcam";
import { Link, useNavigate } from "react-router-dom";

import jsQR from "jsqr";

function LeerQRComponent() {
  const webcamRef = useRef(null);
  const [qrData, setQrData] = useState(null);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Esto navega a la página anterior en el historial
  };

  const captureAndScan = useCallback(() => {
    const canvas = document.createElement("canvas");
    const video = webcamRef.current?.video;

    if (video && video.readyState === 4) {
      const { videoWidth, videoHeight } = video;
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
      const imageData = ctx.getImageData(0, 0, videoWidth, videoHeight);

      const qrCode = jsQR(imageData.data, videoWidth, videoHeight);
      if (qrCode) {
        setQrData(qrCode.data);
        navigate(qrCode.data); // Redirige al enlace del QR escaneado
      }
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(captureAndScan, 1000); // Escanea cada 1s
    return () => clearInterval(interval);
  }, [captureAndScan]);

  return (
    <div className="bg-[#F5FAFF] h-screen">
      <div className="hidden lg:block">
        <Navbar />
      </div>

      <button
        onClick={handleBackClick}
        className="z-50 absolute sm:mt-[2.5rem] mt-[4rem] sm:ml-[5rem] lg:ml-[13rem] ml-[3rem] flex items-center justify-center p-2 rounded-full hover:drop-shadow-[3px_3px_5px_rgba(0,0,0,0.3)] transition ease-in-out duration-200"
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

      <div className="flex flex-col justify-center items-center ">
        <div className="flex flex-col justify-center ">
          <div className="justify-center mt-[5rem] rounded-lg overflow-hidden">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={500}
              className="sm:w-[500px] w-full "
            />
          </div>
          <div className="flex flex-col justify-center items-center     ">
            <div className="text-[#3d4245] text-xl font-bold font-inter absolute bg-[#f5faff] rounded-lg px-[3rem] py-[1rem] shadow-[0px_4px_4px_0px_rgba(29,28,32,0.15)]">
            {qrData ? `Código Detectado: ${qrData}` : "Apunta al QR"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LeerQRComponent;
