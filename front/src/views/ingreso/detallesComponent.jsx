import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbarComponent";

function DetallesComponent() {

  const navigate = useNavigate();

  const handleback =()=>{
    navigate(-1)
    }



  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] gap-8">
        <div class="flex flex-col justify-center items-start sm:items-center inline-flex mt-[1rem] sm:mt-[4rem] w-[20rem] sm:w-[32rem]">
          <div class="text-[#3d4245] sm:text-[2rem] text-[1rem] font-bold font-inter">
            Nuevo ingreso
          </div>
          <div class="text-[#687073] sm:text-lg text-s font-medium font-inter">
            Ingresa un nuevo vehículo al corralón
          </div>
        </div>

        <div className="w-[20rem] sm:w-[32rem] h-[56.40px] flex-col justify-start items-start gap-1 inline-flex">
          <div className="self-stretch justify-start items-center inline-flex">
            <div className="w-[33.40px] h-[33.40px] px-[5.01px] py-[6.68px] bg-[#0477ad] rounded-[33.40px] border-2 border-[#0477ad] justify-center items-center gap-[3.34px] flex">
              <div className="w-5 h-5 relative" />
            </div>
            <div className="grow shrink basis-0 h-[2.50px] bg-[#0477ad]" />
            <div className="w-[33.40px] h-[33.40px] p-[3.34px] bg-[#c5dfff] rounded-[33.40px] border-2 border-[#0477ad]" />
            <div className="grow shrink basis-0 h-[2.50px] bg-[#0477ad]" />
            <div className="w-[33.40px] h-[33.40px] p-[3.34px] rounded-[33.40px] border-2 border-[#0477ad]" />
          </div>
          <div className="self-stretch px-1 justify-between items-start inline-flex">
            <div className="text-[#3d4245] text-base font-semibold font-inter">
              Acta
            </div>
            <div className="text-[#3d4245] text-base font-semibold font-inter">
              Detalles
            </div>
            <div className="text-[#3d4245] text-base font-semibold font-inter">
              Foto
            </div>
          </div>
        </div>

        <div className="h-[319px] w-[20rem] sm:w-[23rem] flex-col justify-start items-start gap-5 inline-flex">
          <div className="self-stretch h-[249px] flex-col justify-start items-start gap-3 flex">
            <div className="self-stretch h-[75px] flex-col justify-start items-start gap-2 flex">
              <div className="text-[#3d4245] text-sm font-normal font-inter">
                Sector
              </div>
              {/* <div className="self-stretch h-[50px] p-2 bg-white rounded-md border border-[#687073] justify-between items-center inline-flex">
          <div className="text-[#3d4245] text-sm font-normal font-inter">A</div>
          
        </div> */}
              <select
                className="w-full text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                defaultValue=""
                /* onChange={(e) => {
                      setInput({ ...input, sexo: e.target.value })
                    }} */
              >
                {Array.from({ length: 26 }, (_, i) => {
                  const letter = String.fromCharCode(65 + i); // 65 es el código ASCII de 'A'
                  return (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="self-stretch h-[75px] flex-col justify-start items-start gap-2 flex">
              <div className="text-[#3d4245] text-sm font-normal font-inter">
                N° Inventario (si corresponde)
              </div>
              {/* <div className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex">
                <div className="text-[#a3b8c1] text-sm font-normal font-inter">
                  0
                </div>
              </div> */}
              <input
                    placeholder="0"
                    className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                    /* onChange={(e) => {
                      setInput({ ...input, cuil: e.target.value })
                    }} */
                  />
            </div>
            <div className="self-stretch h-[75px] flex-col justify-start items-start gap-2 flex">
              <div className="text-[#3d4245] text-sm font-normal font-inter">
                Fecha y hora de ingreso
              </div>
              {/* <div className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-between items-center inline-flex">
                <div className="text-[#a3b8c1] text-sm font-normal font-inter">
                  00/00/0000
                </div>
                <div className="w-6 h-6 relative" />
              </div> */}
              <input
                    placeholder="0"
                    type="datetime-local"
                    className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4  py-2 h-[50px]"
                    /* onChange={(e) => {
                      setInput({ ...input, cuil: e.target.value })
                    }} */
                  />
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-2 inline-flex">
            <button
              onClick={()=>handleback()} className="grow shrink basis-0 h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 flex">
              <div className="text-[#0477ad] text-base font-semibold font-inter">
                Volver atrás
              </div>
            </button>
            <Link
              to={`/ingreso_foto`}
              className="grow shrink basis-0 h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center gap-1 flex"
            >
              <div className="text-[#f6f5f5] text-base font-semibold font-inter">
                Siguiente
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetallesComponent;
