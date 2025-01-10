import Navbar from "../navbar/navbarComponent";

function NuevoUsuarioComponent() {
  return (
    <div>
      <Navbar />

      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] ">
        <div className="text-[#3d4245] sm:text-[28px] text-[20px] font-bold font-inter sm:my-[3rem] my-[1rem] sm:my-[3rem]">
          Nuevo usuario
        </div>

        <div className="w-[20rem] sm:w-[32rem] flex-col justify-start items-start gap-6 inline-flex">
          <div className="self-stretch  flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="text-[#3d4245] text-sm font-normal font-inter">
                Nombre y apellido
              </div>
              <div className="self-stretch p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex">
                <div className="text-[#a3b8c1] text-sm font-normal font-inter">
                  Nombre y apellido
                </div>
              </div>
            </div>
            <div className="self-stretch  flex-col justify-start items-start gap-2 flex">
              <div className="text-[#3d4245] text-sm font-normal font-inter">
                DNI
              </div>
              <div className="self-stretch p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex">
                <div className="text-[#a3b8c1] text-sm font-normal font-inter">
                  0000000000
                </div>
              </div>
            </div>
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="text-[#3d4245] text-sm font-normal font-inter">
                Tipo de usuario
              </div>
              <div className="self-stretch p-2 rounded-md border border-[#687073] justify-start items-center gap-1 inline-flex">
                <div className="text-[#a3b8c1] text-sm font-normal font-inter">
                  Tipo de usuario
                </div>
              </div>
            </div>
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="text-[#3d4245] text-sm font-normal font-inter">
                Contraseña
              </div>

              <div className="relative w-[20rem] sm:w-[32rem]">
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="w-full text-[#a3b8c1] text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 "
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="text-[#3d4245] text-sm font-normal font-inter">
                Confirmación de contraseña
              </div>

              <div className="relative w-[20rem] sm:w-[32rem]">
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="w-full text-[#a3b8c1] text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 "
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="self-stretch justify-center items-center gap-2 sm:inline-flex ">
            <div className="grow shrink basis-0 h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center gap-1 flex overflow-hidden sm:mb-0 mb-[0.5rem]">
              <div className="text-[#f6f5f5] text-center font-semibold font-inter">
                Registrar usuario
              </div>
            </div>
            <div className="grow shrink basis-0 h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 flex overflow-hidden">
              <div className="text-[#0477ad] text-base font-semibold font-inter">
                Cancelar
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuevoUsuarioComponent;
