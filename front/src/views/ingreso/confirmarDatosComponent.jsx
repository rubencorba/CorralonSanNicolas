import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/navbarComponent";
import { useEffect, useState } from "react";
import { postSecuestro } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { generatePdf } from "./generatePdfComponent";

function ConfirmarDatos() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ingresoDetalles = useSelector((state) => state.ingresoDetalles);
  const ingresoFoto = useSelector((state) => state.ingresoFoto);
  const datosConfirmarIngreso = useSelector((state) => state.datosConfirmarIngreso);
  const userId = useSelector((state) => state.currentUserId);
  const tipoCurrentUser = useSelector((state) => state.tipoCurrentUser);


  /* --------------------Formateando fecha y hora de Acta----------------------------- */

  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("es-AR", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "America/Argentina/Buenos_Aires",
    });
  
    if (datosConfirmarIngreso?.actaFecha_hora) {
      // Convertir "15/10/2024, 12:50:00" a formato válido para Date
      const [fecha, hora] = datosConfirmarIngreso.actaFecha_hora.split(", ");
      const [dia, mes, anio] = fecha.split("/");
      const dateString = `${anio}-${mes}-${dia}T${hora}`; // Formato ISO válido
  
      const date = new Date(dateString);
      setFormattedDate(formatter.format(date));
    }
  }, [datosConfirmarIngreso]);

  /*  ------------------------------------------------------------------- */

  const [data, setData] = useState({});
  const [nroActa, setNroActa] = useState("Sin acta");

  useEffect(() => {
    setData({
      ...datosConfirmarIngreso,
      ...ingresoDetalles,
      userId,
      foto: ingresoFoto,
    });

    if (datosConfirmarIngreso?.actaNro) {
      setNroActa(datosConfirmarIngreso.actaNro);
    } else {
      setNroActa("Sin acta");
    }
  }, [datosConfirmarIngreso, ingresoDetalles, ingresoFoto, userId]);


  const [loading, setLoading] = useState(false);


  const handleConfirm = async () => {
    setLoading(true);
    const formData = new FormData();
  
    // Agregar los datos al FormData
    for (const key in data) {
      if (key === "foto" && data[key]) {
        formData.append("foto", data[key]); // Agregar la imagen
      } else {
        formData.append(key, data[key]);
      }
    }
  
    try {
      // Posteo el secuestro
      const newSecuestro = await dispatch(postSecuestro(formData));
  
      // PDF
      const pdfResponse = await generatePdf({ idSecuestro: newSecuestro.id, nroActa });
      if (pdfResponse !== "PDF generado con éxito") {
        throw new Error(pdfResponse); // Si la respuesta de generatePdf no es de éxito, lanzamos un error
      }
      
      alert("PDF descargado con éxito");
    } catch (error) {
      console.error("Error:", error);
      if (error.message.includes("PDF")) {
        alert("El secuestro se guardó correctamente, pero hubo un error al generar el PDF.");
      } else {
        alert("Hubo un error al guardar el secuestro. Por favor, intenta nuevamente.");
      }
    } finally {
      setLoading(false); // Desactivar el spinner al finalizar
      navigate("/inicio")
    }
  };

  const handleback = () => {
    navigate(-1);
  };

  return (
    <div>
      <Navbar />
        <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF]">
          <div className="text-[#3d4245] text-[32px] font-bold font-inter my-[2rem]">
            Confirmar datos
          </div>
          <div className="sm:w-[40rem] w-[20rem] flex-col justify-start items-start gap-4 inline-flex">
            <div className="sm:w-[40rem] w-[20rem] flex-col justify-start items-start gap-3 flex">
              <div className="sm:w-[40rem] w-[20rem] justify-start items-start gap-3 inline-flex   flex-col sm:flex-row">
                <div className="w-full grow  basis-0 p-4 bg-white rounded-lg border border-[#c5dfff] flex-col justify-start items-start gap-3 inline-flex">
                  <div className="text-[#0a5477] text-base font-bold font-inter uppercase">
                    ACTA
                  </div>
                  <div className=" flex-col justify-center items-start gap-2 flex">
                    <div className="justify-start items-center gap-1 inline-flex">
                      <div className="text-[#3d4245] text-lg font-bold font-inter">
                        №:
                      </div>
                      <div className="text-[#687073] text-base font-medium font-inter">
                        {/* {datosConfirmarIngreso.actaNro} */}{nroActa}
                      </div>
                    </div>
                    <div className="justify-start items-center gap-1 inline-flex">
                      <div className="text-[#3d4245] text-lg font-bold font-inter">
                        Inspector:
                      </div>
                      <div className="text-[#687073] text-base font-medium font-inter">
                        {datosConfirmarIngreso.actaInspector}
                      </div>
                    </div>
                    <div className="justify-start items-center gap-1 inline-flex">
                      <div className="text-[#3d4245] text-lg font-bold font-inter">
                        Lugar:
                      </div>
                      <div className="text-[#687073] text-base font-medium font-inter">
                        {datosConfirmarIngreso.actaLugar}
                      </div>
                    </div>
                    <div className="justify-start items-center gap-1 inline-flex">
                      <div className="text-[#3d4245] text-lg font-bold font-inter">
                        Fecha / hora:
                      </div>
                      <div className="text-[#687073] text-base font-medium font-inter">
                        {formattedDate}{/* {datosConfirmarIngreso.actaFecha_hora} */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grow w-full basis-0 p-4 bg-white rounded-lg border border-[#c5dfff] flex-col justify-start items-start gap-3 inline-flex">
                  <div className="text-[#0a5477] text-base font-bold font-inter uppercase">
                    Infractor
                  </div>
                  <div className=" flex-col justify-center items-start gap-2 flex">
                    <div className="justify-start items-center gap-1 inline-flex">
                      <div className="text-[#3d4245] text-lg font-bold font-inter">
                        Nombre:
                      </div>
                      <div className="text-[#687073] text-base font-medium font-inter">
                        {datosConfirmarIngreso.infractorNombre}
                      </div>
                    </div>
                    <div className="justify-start items-center gap-1 inline-flex">
                      <div className="text-[#3d4245] text-lg font-bold font-inter">
                        DNI:
                      </div>
                      <div className="text-[#687073] text-base font-medium font-inter">
                        {datosConfirmarIngreso.infractorDni}
                      </div>
                    </div>
                    <div className="justify-start items-center gap-1 inline-flex">
                      <div className="text-[#3d4245] text-lg font-bold font-inter">
                        CUIL:
                      </div>
                      <div className="text-[#687073] text-base font-medium font-inter">
                        {datosConfirmarIngreso.infractorCuil}
                      </div>
                    </div>
                    <div className="justify-start items-center gap-1 inline-flex">
                      <div className="text-[#3d4245] text-lg font-bold font-inter">
                        Sexo:
                      </div>
                      <div className="text-[#687073] text-base font-medium font-inter">
                        {datosConfirmarIngreso.infractorSexo}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch  p-4 bg-white rounded-lg border border-[#c5dfff] flex-col justify-start items-start gap-3 flex">
                <div className="text-[#0a5477] text-sm font-bold font-inter uppercase">
                  vehículo
                </div>
                <div className="self-stretch flex-col justify-center items-start gap-2 flex">
                  <div className="justify-start items-center gap-1 inline-flex">
                    <div className="text-[#3d4245] text-lg font-bold font-inter">
                      Dominio:
                    </div>
                    <div className="text-[#687073] text-base font-medium font-inter">
                      {datosConfirmarIngreso.vehiculoDominio}
                    </div>
                  </div>
                  <div className="justify-start items-center gap-1 inline-flex">
                    <div className="text-[#3d4245] text-lg font-bold font-inter">
                      Tipo de vehículo:
                    </div>
                    <div className="text-[#687073] text-base font-medium font-inter">
                      {datosConfirmarIngreso.vehiculoTipo}
                    </div>
                  </div>
                  <div className="justify-start items-center gap-1 inline-flex">
                    <div className="text-[#3d4245] text-lg font-bold font-inter">
                      Marca:
                    </div>
                    <div className="text-[#687073] text-base font-medium font-inter">
                      {datosConfirmarIngreso.vehiculoMarca}
                    </div>
                  </div>
                  <div className="justify-start items-center gap-1 inline-flex">
                    <div className="text-[#3d4245] text-lg font-bold font-inter">
                      Modelo:
                    </div>
                    <div className="text-[#687073] text-base font-medium font-inter">
                      {datosConfirmarIngreso.vehiculoModelo}
                    </div>
                  </div>
                </div>
              </div>
              {datosConfirmarIngreso.infracciones ? (
                <div className="self-stretch  p-4 bg-white rounded-lg border border-[#c5dfff] flex-col justify-start items-start gap-1 flex">
                  <div className="text-[#0a5477] text-sm font-bold font-inter uppercase">
                    Infracciones
                  </div>
                  <div className="text-[#687073] text-base font-medium font-inter">
                    {datosConfirmarIngreso.infracciones?.map((infr) => (
                      <div className="divide-y divide-[#61ABCF] px-4 py-2 ">
                        {infr.digesto}
                        {infr.descrip}
                      </div>
                    ))}
                  </div>
                </div>
              ) : ("")}
            </div>
            <div className="self-stretch mb-[2rem] items-center gap-2 inline-flex ">
              <button
                onClick={() => handleback()}
                className="grow  basis-0 h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 flex"
              >
                <div className="text-[#0477ad] text-base font-semibold font-inter">
                  Volver atrás
                </div>
              </button>

              <button
                onClick={handleConfirm}
                disabled={loading || tipoCurrentUser === "viewer"}
                className={`grow basis-0 h-[50px] px-[18px] py-[13px] rounded-lg justify-center items-center gap-1 flex 
                  ${loading || tipoCurrentUser === "viewer" ? "bg-gray-400 cursor-not-allowed" : "bg-[#0477ad]"
                  }`}
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
                  <div className="text-[#f6f5f5] text-center font-semibold font-inter">
                    Guardar e imprimir código
                  </div>
                )}
              </button>
            </div>


          </div>
        </div>
    </div>
  );
}

export default ConfirmarDatos;
