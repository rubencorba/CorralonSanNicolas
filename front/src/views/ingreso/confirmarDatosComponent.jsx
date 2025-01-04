import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/navbarComponent";
import { useEffect, useState } from "react";
import { postSecuestro } from "../../redux/actions";

function ConfirmarDatos() {

  const dispatch = useDispatch();

  const oficioPolicial = useSelector((state) => state.oficioPolicial);
  const ingresoDetalles = useSelector((state) => state.ingresoDetalles);
  const ingresoFoto = useSelector((state) => state.ingresoFoto);
  const acta = useSelector((state) => state.acta);
  console.log(oficioPolicial)
  console.log(ingresoDetalles)
  console.log(ingresoFoto)
  console.log(acta)

  /* --------------------Formateando fecha y hora de Acta----------------------------- */

  const [formattedDate, setFormattedDate] = useState('');

  // Declarar formatter fuera de useEffect para reutilizarlo
  const formatter = new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Argentina/Buenos_Aires',
  });

  useEffect(() => {
    if (acta?.fecha_hora) {
      const date = new Date(acta.fecha_hora);
      setFormattedDate(formatter.format(date));
    }
  }, [acta, formatter]);

 /*  ------------------------------------------------------------------- */

  const [data, setData] = useState({})

  useEffect(() => {
    setData({
      ...oficioPolicial,
      ...ingresoDetalles,
      foto: ingresoFoto,
    });
  }, [oficioPolicial, ingresoDetalles, ingresoFoto]);

  const handleConfirm = (event) => {
      /* event.preventDefault(); */ // Evita el comportamiento por defecto
      dispatch(postSecuestro(data))
      
      console.log(data)
      /* navigate('/ingreso_detalles') */
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
                    {acta.nro}
                    </div>
                  </div>
                  <div className="justify-start items-center gap-1 inline-flex">
                    <div className="text-[#3d4245] text-lg font-bold font-inter">
                      Inspector:
                    </div>
                    <div className="text-[#687073] text-base font-medium font-inter">
                    {acta.inspector}
                    </div>
                  </div>
                  <div className="justify-start items-center gap-1 inline-flex">
                    <div className="text-[#3d4245] text-lg font-bold font-inter">
                      Lugar:
                    </div>
                    <div className="text-[#687073] text-base font-medium font-inter">
                    {acta.lugar}
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
                      {oficioPolicial.nombreCompleto}
                    </div>
                  </div>
                  <div className="justify-start items-center gap-1 inline-flex">
                    <div className="text-[#3d4245] text-lg font-bold font-inter">
                      DNI:
                    </div>
                    <div className="text-[#687073] text-base font-medium font-inter">
                    {oficioPolicial.dni}
                    </div>
                  </div>
                  <div className="justify-start items-center gap-1 inline-flex">
                    <div className="text-[#3d4245] text-lg font-bold font-inter">
                      CUIL:
                    </div>
                    <div className="text-[#687073] text-base font-medium font-inter">
                    {oficioPolicial.cuil}
                    </div>
                  </div>
                  <div className="justify-start items-center gap-1 inline-flex">
                    <div className="text-[#3d4245] text-lg font-bold font-inter">
                      Sexo:
                    </div>
                    <div className="text-[#687073] text-base font-medium font-inter">
                    {oficioPolicial.sexo}
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
                  {oficioPolicial.dominio}
                  </div>
                </div>
                <div className="justify-start items-center gap-1 inline-flex">
                  <div className="text-[#3d4245] text-lg font-bold font-inter">
                    Tipo de vehículo:
                  </div>
                  <div className="text-[#687073] text-base font-medium font-inter">
                  {oficioPolicial.tipovh}
                  </div>
                </div>
                <div className="justify-start items-center gap-1 inline-flex">
                  <div className="text-[#3d4245] text-lg font-bold font-inter">
                    Marca:
                  </div>
                  <div className="text-[#687073] text-base font-medium font-inter">
                  {oficioPolicial.marcavh}
                  </div>
                </div>
                <div className="justify-start items-center gap-1 inline-flex">
                  <div className="text-[#3d4245] text-lg font-bold font-inter">
                    Modelo:
                  </div>
                  <div className="text-[#687073] text-base font-medium font-inter">
                  {oficioPolicial.modelovh}
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch  p-4 bg-white rounded-lg border border-[#c5dfff] flex-col justify-start items-start gap-1 flex">
              <div className="text-[#0a5477] text-sm font-bold font-inter uppercase">
                Infracción
              </div>
              <div className="text-[#687073] text-base font-medium font-inter">
              {oficioPolicial.infracciones?.map((infr) => (
                  <div className="divide-y divide-[#61ABCF] px-4 py-2 ">
                    {infr.digesto}
                    {infr.descrip}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="self-stretch mb-[2rem] items-center gap-2 inline-flex ">
            <div className="grow  basis-0 h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 flex">
              <div className="text-[#0477ad] text-base font-semibold font-inter">
                Volver atrás
              </div>
            </div>
            <button onClick={()=>handleConfirm()} className="grow  basis-0 h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center gap-1 flex">
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
