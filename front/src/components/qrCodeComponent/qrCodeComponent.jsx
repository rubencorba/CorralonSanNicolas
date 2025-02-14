import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef } from "react";

const QRCodeComponent = ({ idSecuestro }) => {
  const qrRef = useRef(null);

  useEffect(() => {
    if (idSecuestro) {
      printQRCode(idSecuestro);
    }
  }, [idSecuestro]);

  const printQRCode = (idSecuestro) => {
    if (!qrRef.current) return;

    // Convertimos el QR en una imagen base64
    const canvas = qrRef.current.querySelector("canvas");
    const qrImage = canvas?.toDataURL("image/png");

    if (!qrImage) return;

    const qrWindow = window.open("", "_blank");
    if (qrWindow) {
      qrWindow.document.write(`
        <html>
          <head>
            <title>Imprimir Código QR</title>
            <style>
            @media print {
              @page { margin: 0; size: A6; } 
              body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 99vh; font-family: Arial, sans-serif; }
              h2 { margin-bottom: 10px; font-size: 20px; }
              img { max-width: 100%; }
            }
          </style>
          </head>
          <body>
            <h2>Secuestro ID: ${idSecuestro}</h2>
            <img src="${qrImage}" alt="Código QR" />
            <script>
              setTimeout(() => { window.print(); window.close(); }, 500);
            </script>
          </body>
        </html>
      `);
    }
  };

  if (!idSecuestro) return null;

  return (
    <div className="mb-8 flex flex-col items-center justify-center text-center h-full mx-auto" ref={qrRef}>
      <div className="text-[#3d4245] text-[32px] font-bold font-inter my-[2rem]">
          Secuestro ingresado correctamente
        </div>
      <p className="text-lg font-bold">Código QR del secuestro</p>
      <QRCodeCanvas value={`/detail/${idSecuestro}`} size={200} />
    </div>
  );
};

export default QRCodeComponent;
