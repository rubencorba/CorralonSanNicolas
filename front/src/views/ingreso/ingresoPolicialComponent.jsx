import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbarComponent";

function IngresoPolicialComponent() {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] gap-8">
        <div class="flex flex-col justify-center items-start sm:items-center inline-flex mt-[1rem] sm:mt-[4rem] w-[20rem] sm:w-[32rem]">
          <div class="text-[#3d4245] sm:text-[2rem] text-[1rem] font-bold font-inter">
            Nuevo oficio policial
          </div>
          <div class="text-[#687073] sm:text-lg text-s font-medium font-inter">
            Ingresa un nuevo vehículo al corralón
          </div>
        </div>

        <div class="w-[20rem] sm:w-[32rem] h-[56.40px] flex-col justify-start items-start gap-1 inline-flex mb-5 sm:mb-10">
          <div class="self-stretch justify-start items-center inline-flex">
            <div class="w-[33.40px] h-[33.40px] p-[3.34px] bg-[#c5dfff] rounded-[33.40px] border-2 border-[#0477ad]"></div>
            <div class="grow shrink basis-0 h-[2.50px] bg-[#0477ad]"></div>
            <div class="w-10 h-10 p-[3.34px] rounded-[33.40px] border-2 border-[#0477ad]"></div>
            <div class="grow shrink basis-0 h-[2.50px] bg-[#0477ad]"></div>
            <div class="w-[33.40px] h-[33.40px] p-[3.34px] rounded-[33.40px] border-2 border-[#0477ad]"></div>
          </div>
          <div class="self-stretch px-1 justify-between items-start inline-flex">
            <div class="text-[#3d4245] text-base font-semibold font-inter">
              Acta
            </div>
            <div class="text-[#3d4245] text-base font-semibold font-inter">
              Detalles
            </div>
            <div class="text-[#3d4245] text-base font-semibold font-inter">
              Foto
            </div>
          </div>
        </div>

        <div className="w-[20rem] sm:w-[32rem]  flex-col justify-start items-start gap-6 inline-flex">
          <div className="self-stretch h-[189px] flex-col justify-start items-start gap-2 flex">
            <div className="text-[#0a5477] text-base font-bold font-inter uppercase">
              Vehículo
            </div>
            <div className="self-stretch h-[162px] flex-col justify-start items-start gap-3 flex">
              <div className="self-stretch justify-start items-start gap-2 inline-flex">
                <div className="grow shrink basis-0 h-[75px] flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-[#3d4245] text-sm font-normal font-inter">
                    Patente
                  </div>
                  <div className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex">
                    <div className="text-[#a3b8c1] text-sm font-normal font-inter">
                      00000
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 h-[75px] flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-[#3d4245] text-sm font-normal font-inter">
                    Tipo
                  </div>
                  <div className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex">
                    <div className="text-[#a3b8c1] text-sm font-normal font-inter">
                      Tipo
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-2 inline-flex">
                <div className="grow shrink basis-0 h-[75px] flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-[#3d4245] text-sm font-normal font-inter">
                    Modelo
                  </div>
                  <div className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex">
                    <div className="text-[#a3b8c1] text-sm font-normal font-inter">
                      Modelo
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 h-[75px] flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-[#3d4245] text-sm font-normal font-inter">
                    Marca
                  </div>
                  <div className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex">
                    <div className="text-[#a3b8c1] text-sm font-normal font-inter">
                      Marca
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch h-[189px] flex-col justify-start items-start gap-2 flex">
            <div className="text-[#0a5477] text-base font-bold font-inter uppercase">
              Infractor
            </div>
            <div className="self-stretch h-[162px] flex-col justify-start items-start gap-3 flex">
              <div className="self-stretch justify-start items-start gap-3 inline-flex">
                <div className="grow shrink basis-0 h-[75px] flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-[#3d4245] text-sm font-normal font-inter">
                    Nombre y apellido
                  </div>
                  <div className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex">
                    <div className="text-[#a3b8c1] text-sm font-normal font-inter">
                      Nombre y apellido
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 h-[75px] flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-[#3d4245] text-sm font-normal font-inter">
                    DNI
                  </div>
                  <div className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex">
                    <div className="text-[#a3b8c1] text-sm font-normal font-inter">
                      000000000
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-3 inline-flex">
                <div className="grow shrink basis-0 h-[75px] flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-[#3d4245] text-sm font-normal font-inter">
                    CUIL
                  </div>
                  <div className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex">
                    <div className="text-[#a3b8c1] text-sm font-normal font-inter">
                      000000000000
                    </div>
                  </div>
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-[#3d4245] text-sm font-normal font-inter">
                    Sexo
                  </div>
                  <div className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-between items-center inline-flex">
                    <div className="text-[#3d4245] text-sm font-normal font-inter">
                      Seleccionar sexo
                    </div>
                    <div className="w-6 h-6 relative" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch h-[102px] flex-col justify-start items-start gap-2 flex">
            <div className="text-[#0a5477] text-base font-bold font-inter uppercase">
              Infracción
            </div>
            <div className="self-stretch h-[75px] flex-col justify-start items-start gap-2 flex">
              <div className="text-[#3d4245] text-sm font-normal font-inter">
                Infracción
              </div>
              <div className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-between items-center inline-flex">
                <div className="text-[#3d4245] text-sm font-normal font-inter">
                  Seleccionar infracción de transito
                </div>
                <div className="w-6 h-6 relative" />
              </div>
            </div>
          </div>
          <Link to={`/ingreso_detalles`} className="self-stretch h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center gap-1 inline-flex  mb-[3rem]">
            <div className="text-[#f6f5f5] text-base font-semibold font-inter">
              Siguiente
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IngresoPolicialComponent;
