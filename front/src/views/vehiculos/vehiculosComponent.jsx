import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbarComponent";
import { useSelector } from "react-redux";

function VehiculosComponent() {

  const tipoCurrentUser = useSelector((state) => state.tipoCurrentUser);

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] ">

        <div className="text-[#3d4245] text-[28px] font-bold font-inter sm:my-[3rem] my-[1rem]">
          Vehículos
        </div>

        <div className=" mb-[3rem] flex-col justify-start items-start gap-3 inline-flex mx-[1rem]">
          {/* <Link to='/ingreso' className="self-stretch px-4 py-7 bg-white rounded-lg border border-[#c5dfff] justify-start items-center gap-2.5 inline-flex">
          <div className="w-[49px] h-[49px] relative" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-18 stroke-[#0477ad]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
        </svg>
          </div>
          <div className="flex-col justify-start items-start gap-1 inline-flex">
            <div className="text-[#0477ad] text-lg font-bold font-inter">
              Nuevo ingreso
            </div>
            <div className="text-[#687073] text-sm font-normal font-inter">
              Ingresa un nuevo vehículo al corralón municipal.
            </div>
          </div>
        </Link> */}
          <Link to='/leerQR' className="self-stretch px-4 py-7 bg-white rounded-lg border border-[#c5dfff] justify-start items-center gap-2.5 inline-flex">
            <div className="w-[49px] h-[49px] relative" >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="size-18 stroke-[#0477ad]">
                <path fillRule="evenodd" d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875-.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM6 16.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm9.75 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm-3 3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-col justify-start items-start gap-1 inline-flex">
              <div className="text-[#0477ad] text-lg font-bold font-inter">
                Leer QR
              </div>
              <div className="text-[#687073] text-sm font-normal font-inter">
                Lee los datos de un vehículo que ingresa o egresa del corralón.
              </div>
            </div>
            <div className="p-0.5 justify-start items-center gap-2.5 flex" />
          </Link>
          <Link to='/buscar' className="self-stretch px-4 py-7 bg-white rounded-lg border border-[#c5dfff] justify-start items-center gap-2.5 inline-flex">
            <div className="w-[49px] h-[49px] relative" >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-18 stroke-[#0477ad]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <div className="flex-col justify-start items-start gap-1 inline-flex">
              <div className="text-[#0477ad] text-lg font-bold font-inter">
                Buscar vehículo
              </div>
              <div className="text-[#687073] text-sm font-normal font-inter">
                Busque vehículos por patente, numero de acta o de inventario.
              </div>
            </div>
          </Link>
          <Link to='/registros' className="self-stretch px-4 py-7 bg-white rounded-lg border border-[#c5dfff] justify-start items-center gap-2.5 inline-flex">
            <div className="w-[49px] h-[49px] relative" >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-18 stroke-[#0477ad]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
              </svg>
            </div>
            <div className="flex-col justify-start items-start gap-1 inline-flex">
              <div className="text-[#0477ad] text-lg font-bold font-inter">
                Tabla de registros
              </div>
              <div className="text-[#687073] text-sm font-normal font-inter">
                Movimientos dentro de la plataforma
              </div>
            </div>
          </Link>
          <Link to='/levantamientos' className="self-stretch px-4 py-7 bg-white rounded-lg border border-[#c5dfff] justify-start items-center gap-2.5 inline-flex">
            <div className="w-[49px] h-[49px] relative" >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-18 stroke-[#0477ad]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <div className="flex-col justify-start items-start gap-1 inline-flex">
              <div className="text-[#0477ad] text-lg font-bold font-inter">
                Levantamientos
              </div>
              <div className="text-[#687073] text-sm font-normal font-inter">
                Vehículos en corralón que pueden ser entregados
              </div>
            </div>
          </Link>
          {(tipoCurrentUser !== "viewer") &&
            <Link to='/compactacion' className="self-stretch px-4 py-7 bg-white rounded-lg border border-[#c5dfff] justify-start items-center gap-2.5 inline-flex">
              <div className="w-[49px] h-[49px] relative" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-18 stroke-[#0477ad]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                </svg>
              </div>
              <div className="flex-col justify-start items-start gap-1 inline-flex">
                <div className="text-[#0477ad] text-lg font-bold font-inter">
                  Compactar vehículo
                </div>
                <div className="text-[#687073] text-sm font-normal font-inter">
                  Lista de vehículos a compactar
                </div>
              </div>
            </Link>
          }
          {/* <Link to='/stock_actual' className="self-stretch px-4 py-7 bg-white rounded-lg border border-[#c5dfff] justify-start items-center gap-2.5 inline-flex">
            <div className="w-[49px] h-[49px] relative" >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-18 stroke-[#0477ad]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
              </svg>
            </div>
            <div className="flex-col justify-start items-start gap-1 inline-flex">
              <div className="text-[#0477ad] text-lg font-bold font-inter">
                Stock actual
              </div>
              <div className="text-[#687073] text-sm font-normal font-inter">
                Lista de vehículos a ingresados
              </div>
            </div>
          </Link> */}
        </div>

      </div>
    </div>
  );
}

export default VehiculosComponent;

