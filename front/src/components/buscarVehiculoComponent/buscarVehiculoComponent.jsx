import Navbar from "../navbar/navbarComponent";

function BuscarVehiculoComponent() {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] gap-8">
        <div class="flex flex-col justify-center items-start sm:items-center inline-flex mt-[1rem] sm:mt-[4rem] w-[20rem] lg:w-[41rem] sm:w-[35rem]">
          <div class="text-[#3d4245] sm:text-[2rem] text-[1rem] font-bold font-inter">
            Buscar vehículo
          </div>
          <div class="text-[#687073] sm:text-lg text-s font-medium font-inter ">
            Buscar un vehículo aplicando los filtros de patente, numero de acta
            o inventario
          </div>
        </div>

        <div className="w-[20rem] sm:w-[28rem] p-4 bg-white rounded-lg shadow-[1px_2px_8px_1px_rgba(220,220,220,0.45)] flex-col justify-start items-start gap-10 inline-flex overflow-hidden">
          <div className="self-stretch  flex-col justify-end items-center gap-2 flex">
            <div className="self-stretch  flex-col justify-start items-start gap-2 flex">
              <div className="text-[#3d4245] text-sm font-normal font-inter">
                Patente
              </div>
              <div className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex">
                <div className="text-[#a3b8c1] text-sm font-normal font-inter">
                  00000000000
                </div>
              </div>
            </div>
            <div className="self-stretch h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 inline-flex overflow-hidden">
              <div className="text-[#0477ad] text-base font-semibold font-inter">
                Buscar por patente{" "}
              </div>
            </div>
          </div>
          <div className="self-stretch h-[133px] flex-col justify-end items-center gap-2 flex">
            <div className="self-stretch h-[75px] flex-col justify-start items-start gap-2 flex">
              <div className="text-[#3d4245] text-sm font-normal font-inter">
                N° acta
              </div>
              <div className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex">
                <div className="text-[#a3b8c1] text-sm font-normal font-inter">
                  00000000000
                </div>
              </div>
            </div>
            <div className="self-stretch h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 inline-flex overflow-hidden">
              <div className="text-[#0477ad] text-base font-semibold font-inter">
                Buscar por N° acta{" "}
              </div>
            </div>
          </div>
          <div className="self-stretch h-[133px] flex-col justify-end items-center gap-2 flex">
            <div className="self-stretch h-[75px] flex-col justify-start items-start gap-2 flex">
              <div className="text-[#3d4245] text-sm font-normal font-inter">
                N° inventario
              </div>
              <div className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex">
                <div className="text-[#a3b8c1] text-sm font-normal font-inter">
                  00000000000
                </div>
              </div>
            </div>
            <div className="self-stretch h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 inline-flex overflow-hidden">
              <div className="text-[#0477ad] text-base font-semibold font-inter">
                Buscar por inventario{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuscarVehiculoComponent;
