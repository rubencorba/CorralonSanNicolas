
function ConfigurarUsuarioComponent({ closeConfiguracion, openContrasenaModal, openTipoModal, openEliminarModal }) {



  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 "
      onClick={closeConfiguracion} /* Cierra al hacer clic fuera */
    >
        <div
          className="w-[20rem] sm:w-[30rem] px-1 py-1 bg-white rounded-xl flex flex-col justify-center  gap-6 mx-5 overflow-y-auto my-[2rem]"
          onClick={(e) =>
            e.stopPropagation()
          } /* Evita que el clic dentro lo cierre */
        >
          <div className="my-[1rem]  flex-col justify-start items-start gap-3 inline-flex mx-[1rem]">
            <button
              onClick={openContrasenaModal}
              className="self-stretch px-4 py-7 bg-white rounded-lg border border-[#c5dfff] justify-start items-center "
            >
              <div className="flex-col justify-start items-start gap-1 inline-flex w-full">
                <div className="text-[#0477ad] text-lg font-bold font-inter">
                  Contraseña
                </div>
                <div className="text-[#687073] text-sm font-normal font-inter text-left">
                  Ingresar nueva contraseña para este usuario
                </div>
              </div>
            </button>
            <button
              onClick={openTipoModal}
              className="self-stretch px-4 py-7 bg-white rounded-lg border border-[#c5dfff] justify-start items-center gap-2.5 cursor-pointer"
            >
              <div className="flex-col justify-start items-start gap-1 inline-flex w-full">
                <div className="text-[#0477ad] text-lg font-bold font-inter">
                  Tipo
                </div>
                <div className="text-[#687073] text-sm font-normal font-inter text-left">
                  Cambiar el rol de este usuario
                </div>
              </div>
            </button>
            <button
              onClick={openEliminarModal}
              className="self-stretch px-4 py-7 bg-white rounded-lg border border-[#c5dfff] justify-start items-center gap-2.5"
            >

              <div className="flex-col justify-start items-start gap-1 inline-flex w-full">
                <div className="text-[#0477ad] text-lg font-bold font-inter">
                  Eliminar
                </div>
                <div className="text-[#687073] text-start text-sm font-normal font-inter text-left">
                  Suprimir este usuario
                </div>
              </div>
              <div className="p-0.5 justify-start items-center gap-2.5 flex" />
            </button>
          </div>
        </div>

    </div>

  );
}

export default ConfigurarUsuarioComponent;
