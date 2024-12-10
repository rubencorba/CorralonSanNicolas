import { useEffect } from "react";


function EgresarVehiculoComponent({ onCloseEgresar }) {

    

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

        <div className="min-w-[20rem] px-5 py-8 bg-white rounded-xl flex flex-col justify-center  gap-6 mx-5 overflow-y-auto">
        {/* Título */}
        <div className="sm:text-left text-center text-[#3d4245] text-2xl font-bold font-inter">
          Egresar vehículo
        </div>
  
        {/* Contenido principal */}
        <div className="self-stretch h-[414px] flex flex-col justify-start items-start gap-4">
          {/* Apellidos y Nombres / DNI */}
          <div className="self-stretch flex justify-start items-start gap-3 sm:flex-row flex-col">
  <div className="flex-grow flex flex-col justify-start items-start gap-2 w-full">
    <label 
       
      className="text-[#3d4245] text-sm font-normal font-inter">
      Apellidos y Nombres
    </label>
    <input 
      
      type="text" 
      placeholder="Apellidos y Nombres" 
      className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] text-[#a3b8c1] text-sm font-normal font-inter w-full flex-grow"
    />
  </div>
  <div className="flex-grow flex flex-col justify-start items-start gap-2 w-full">
    <label 
       
      className="text-[#3d4245] text-sm font-normal font-inter">
      DNI
    </label>
    <input 
      
      type="text" 
      placeholder="DNI" 
      className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] text-[#a3b8c1] text-sm font-normal font-inter w-full flex-grow"
    />
  </div>
</div>
  

          {/* Domicilio / Lic. Conducir */}
          <div className="self-stretch flex justify-start items-start gap-3 sm:flex-row flex-col">
  <div className="flex-grow flex flex-col justify-start items-start gap-2 w-full">
    <label 
      htmlFor="address" 
      className="text-[#3d4245] text-sm font-normal font-inter">
      Domicilio
    </label>
    <input 
      id="address"
      type="text" 
      placeholder="Domicilio" 
      className="h-[50px] p-2 rounded-md border border-[#687073] text-[#3d4245] text-sm font-normal font-inter w-full flex-grow"
    />
  </div>
  <div className="flex-grow flex flex-col justify-start items-start gap-2 w-full">
    <label 
      htmlFor="license" 
      className="text-[#3d4245] text-sm font-normal font-inter">
      Lic. Conducir
    </label>
    <input 
      id="license"
      type="text" 
      placeholder="Lic. Conducir" 
      className="h-[50px] p-2 rounded-md border border-[#687073] text-[#3d4245] text-sm font-normal font-inter w-full flex-grow"
    />
  </div>
</div>

  
          {/* Tarj. Verde / B. Pago */}
          <div className="self-stretch flex justify-start items-start gap-3 sm:flex-row flex-col">
  <div className="flex-grow flex flex-col justify-start items-start gap-2 w-full">
    <label 
      htmlFor="green-card" 
      className="text-[#3d4245] text-sm font-normal font-inter">
      Tarj. Verde
    </label>
    <input 
      id="green-card"
      type="text" 
      placeholder="Tarj. Verde" 
      className="h-[50px] p-2 rounded-md border border-[#687073] text-[#3d4245] text-sm font-normal font-inter w-full flex-grow"
    />
  </div>
  <div className="flex-grow flex flex-col justify-start items-start gap-2 w-full">
    <label 
      htmlFor="payment-slip" 
      className="text-[#3d4245] text-sm font-normal font-inter">
      B. Pago
    </label>
    <input 
      id="payment-slip"
      type="text" 
      placeholder="B. Pago" 
      className="h-[50px] p-2 rounded-md border border-[#687073] text-[#3d4245] text-sm font-normal font-inter w-full flex-grow"
    />
  </div>
</div>

  
          {/* Observaciones / Fecha y hora */}
          <div className="self-stretch flex justify-start items-start gap-3 sm:flex-row flex-col">
  {/* Campo Observaciones */}
  <div className="flex-grow flex flex-col justify-start items-start gap-2 w-full">
    <label 
       
      className="text-[#3d4245] text-sm font-normal font-inter">
      Observaciones
    </label>
    
    <input 
      
      type="text" 
      placeholder="Observaciones" 
      className="h-[50px] p-2 rounded-md border border-[#687073] text-[#3d4245] text-sm font-normal font-inter flex-grow w-full"
    />
  </div>
  {/* Campo Fecha y hora de salida */}
  <div className="flex-grow flex flex-col justify-start items-start gap-2 w-full">
    <label 
       
      className="text-[#3d4245] text-sm font-normal font-inter">
      Fecha y hora de salida
    </label>
    <div className="flex items-center gap-2 w-full">
    <input 
      
      type="datetime-local" 
      className="h-[50px] p-2 rounded-md border border-[#687073] text-[#3d4245] text-sm font-normal font-inter  flex-grow "
      
    />
    </div>
  </div>
</div>

  
          {/* Botones */}
          <div className="self-stretch flex justify-start items-start gap-3 sm:flex-row flex-col">
            <button className="w-full h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg flex justify-center items-center gap-1 flex-grow">
              <div className="text-[#f6f5f5] text-base font-semibold font-inter">
                Egresar vehículo
              </div>
            </button>
            <button onClick={onCloseEgresar} className="w-full flex-grow h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] flex justify-center items-center gap-1 sm:mb-0 mb-5">
              <div className="text-[#0477ad] text-base font-semibold font-inter">
                Cancelar
              </div>
            </button>
          </div>
        </div>
      </div>
      </div>
      
  
    );
  }
  
  export default EgresarVehiculoComponent;
  
  