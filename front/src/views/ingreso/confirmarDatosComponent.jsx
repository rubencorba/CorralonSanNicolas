import Navbar from "../../components/navbar/navbarComponent";

function ConfirmarDatos() {
  return (
    <div>
      <Navbar />

      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] ">
        <div className="text-[#3d4245] text-[32px] font-bold font-inter my-[2rem]">
          Confirmar datos
        </div>
        <div className="w-[590px] h-[566px] flex-col justify-start items-start gap-4 inline-flex">
          <div className="self-stretch h-[500px] flex-col justify-start items-start gap-3 flex">
            <div className="self-stretch justify-start items-start gap-3 inline-flex">
              <div className="grow shrink basis-0 p-4 bg-white rounded-lg border border-[#c5dfff] flex-col justify-start items-start gap-3 inline-flex">
                <div className="text-[#0a5477] text-base font-bold font-inter uppercase">
                  ACTA
                </div>
                <div className="self-stretch h-[136px] flex-col justify-center items-start gap-2 flex">
                  <div className="justify-start items-end gap-1 inline-flex">
                    <div className="text-[#3d4245] text-lg font-bold font-inter">
                      №:
                    </div>
                    <div className="text-[#687073] text-base font-medium font-inter">
                      1
                    </div>
                  </div>
                  <div className="justify-start items-end gap-1 inline-flex">
                    <div className="text-[#3d4245] text-lg font-bold font-inter">
                      Inspector:
                    </div>
                    <div className="text-[#687073] text-base font-medium font-inter">
                      1
                    </div>
                  </div>
                  <div className="justify-start items-end gap-1 inline-flex">
                    <div className="text-[#3d4245] text-lg font-bold font-inter">
                      Lugar:
                    </div>
                    <div className="text-[#687073] text-base font-medium font-inter">
                      0
                    </div>
                  </div>
                  <div className="justify-start items-end gap-1 inline-flex">
                    <div className="text-[#3d4245] text-lg font-bold font-inter">
                      Fecha / hora:
                    </div>
                    <div className="text-[#687073] text-base font-medium font-inter">
                      02/04/2004
                    </div>
                  </div>
                </div>
              </div>
              <div className="grow shrink basis-0 p-4 bg-white rounded-lg border border-[#c5dfff] flex-col justify-start items-start gap-3 inline-flex">
                <div className="text-[#0a5477] text-base font-bold font-inter uppercase">
                  Infractor
                </div>
                <div className="self-stretch h-[136px] flex-col justify-center items-start gap-2 flex">
                  <div className="justify-start items-end gap-1 inline-flex">
                    <div className="text-[#3d4245] text-lg font-bold font-inter">
                      Nombre:
                    </div>
                    <div className="text-[#687073] text-base font-medium font-inter">
                      Aranda José maria
                    </div>
                  </div>
                  <div className="justify-start items-end gap-1 inline-flex">
                    <div className="text-[#3d4245] text-lg font-bold font-inter">
                      DNI:
                    </div>
                    <div className="text-[#687073] text-base font-medium font-inter">
                      32279263
                    </div>
                  </div>
                  <div className="justify-start items-end gap-1 inline-flex">
                    <div className="text-[#3d4245] text-lg font-bold font-inter">
                      CUIL:
                    </div>
                    <div className="text-[#687073] text-base font-medium font-inter">
                      20322792631
                    </div>
                  </div>
                  <div className="justify-start items-end gap-1 inline-flex">
                    <div className="text-[#3d4245] text-lg font-bold font-inter">
                      Sexo:
                    </div>
                    <div className="text-[#687073] text-base font-medium font-inter">
                      Masculino
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-[197px] p-4 bg-white rounded-lg border border-[#c5dfff] flex-col justify-start items-start gap-3 flex">
              <div className="text-[#0a5477] text-sm font-bold font-inter uppercase">
                vehículo
              </div>
              <div className="self-stretch h-[136px] flex-col justify-center items-start gap-2 flex">
                <div className="justify-start items-end gap-1 inline-flex">
                  <div className="text-[#3d4245] text-lg font-bold font-inter">
                    Dominio:
                  </div>
                  <div className="text-[#687073] text-base font-medium font-inter">
                    123213123
                  </div>
                </div>
                <div className="justify-start items-end gap-1 inline-flex">
                  <div className="text-[#3d4245] text-lg font-bold font-inter">
                    Tipo de vehículo:
                  </div>
                  <div className="text-[#687073] text-base font-medium font-inter">
                    Automóvil
                  </div>
                </div>
                <div className="justify-start items-end gap-1 inline-flex">
                  <div className="text-[#3d4245] text-lg font-bold font-inter">
                    Marca:
                  </div>
                  <div className="text-[#687073] text-base font-medium font-inter">
                    Fiat
                  </div>
                </div>
                <div className="justify-start items-end gap-1 inline-flex">
                  <div className="text-[#3d4245] text-lg font-bold font-inter">
                    Modelo:
                  </div>
                  <div className="text-[#687073] text-base font-medium font-inter">
                    600
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch h-20 p-4 bg-white rounded-lg border border-[#c5dfff] flex-col justify-start items-start gap-1 flex">
              <div className="text-[#0a5477] text-sm font-bold font-inter uppercase">
                Infracción
              </div>
              <div className="text-[#687073] text-base font-medium font-inter">
                Art. 25 Inc. C.- Por estacionar en lugar prohibido
              </div>
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-2 inline-flex">
            <div className="grow shrink basis-0 h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 flex">
              <div className="text-[#0477ad] text-base font-semibold font-inter">
                Volver atrás
              </div>
            </div>
            <div className="grow shrink basis-0 h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center gap-1 flex">
              <div className="text-[#f6f5f5] text-base font-semibold font-inter">
                Guardar e imprimir código
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmarDatos;
