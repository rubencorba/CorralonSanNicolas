import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/navbarComponent";
import { useEffect, useState } from "react";
import { postSecuestro } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

function ConfirmarDatos() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ingresoDetalles = useSelector((state) => state.ingresoDetalles);
  const ingresoFoto = useSelector((state) => state.ingresoFoto);
  const datosConfirmarIngreso = useSelector((state) => state.datosConfirmarIngreso);
  const userId = useSelector((state) => state.currentUserId);

  console.log(userId);

  /* --------------------Formateando fecha y hora de Acta----------------------------- */

  const [formattedDate, setFormattedDate] = useState("");

  // Declarar formatter fuera de useEffect para reutilizarlo
  const formatter = new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Argentina/Buenos_Aires",
  });

  useEffect(() => {
    if (datosConfirmarIngreso?.actaFecha_hora) {
      const date = new Date(datosConfirmarIngreso.actaFecha_hora);
      setFormattedDate(formatter.format(date));
    }
  }, [datosConfirmarIngreso, formatter]);

  /*  ------------------------------------------------------------------- */

  const [data, setData] = useState({});

  useEffect(() => {
    setData({
      ...datosConfirmarIngreso,
      ...ingresoDetalles,
      userId,
      foto: ingresoFoto,
    });
  }, [ingresoDetalles, ingresoFoto, userId]);

  const handleConfirm = () => {
    dispatch(postSecuestro(data));

    console.log(data);
  };

  const handleback = () => {
    navigate(-1);
  };

  return (
    <div>
      <Navbar />

      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] ">
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
                      {datosConfirmarIngreso.actaNro}
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
                      {formattedDate}
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
              onClick={() => handleConfirm()}
              className="grow  basis-0 h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center gap-1 flex"
            >
              <div className="text-[#f6f5f5] text-center font-semibold font-inter">
                Guardar e imprimir código
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmarDatos;
