

function CambiarSectorComponent({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="w-[20rem] bg-white p-6 rounded-lg shadow-lg">
      <div className="text-2xl font-bold mb-4 text-center">Cambiar Sector</div>
      <div className="mb-4">
        {/* Contenido del formulario */}
        <label className="block text-sm font-medium text-gray-700 mb-2">Sector</label>
        <select className="w-full p-2 border rounded">
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
      <div className="flex flex-col justify-center gap-4">
        <button className="px-4 py-2 bg-[#0477AD] text-white rounded w-full font-inter">Guardar</button>
        <button
          onClick={onClose} // Cierra el modal
          className="px-4 py-2 bg-white border border-[#0477AD] text-[#0477AD] font-inter rounded w-full"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
    

  );
}

export default CambiarSectorComponent;

{/* <div className="w-[1440px] h-[1024px] relative bg-[#687073]">
<div className="w-[1440px] h-[1024px] left-0 top-0 absolute bg-[#635c5c]/90" />
<div className="h-[316px] px-5 py-8 left-[534px] top-[354px] absolute bg-white rounded-xl flex-col justify-start items-center gap-6 inline-flex">
<div className="self-stretch text-center text-[#3d4245] text-2xl font-bold font-['Inter']">Cambiar sector</div>
<div className="self-stretch h-[199px] flex-col justify-start items-start gap-4 flex">
<div className="self-stretch h-[75px] flex-col justify-start items-start gap-2 flex">
<div className="text-[#3d4245] text-sm font-normal font-['Inter']">Sector</div>
<div className="self-stretch h-[50px] p-2 rounded-md border border-[#687073] justify-between items-center inline-flex">
<div className="text-[#3d4245] text-sm font-normal font-['Inter']">A</div>
<div className="w-6 h-6 relative" />
</div>
</div>
<div className="self-stretch h-[108px] flex-col justify-start items-start gap-2 flex">
<div className="self-stretch h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center gap-1 inline-flex">
<div className="text-[#f6f5f5] text-base font-semibold font-['Inter']">Guardar</div>
</div>
<div className="self-stretch h-[50px] px-[18px] py-[13px] bg-white rounded-lg border border-[#0477ad] justify-center items-center gap-1 inline-flex">
<div className="text-[#0477ad] text-base font-semibold font-['Inter']">Cancelar</div>
</div>
</div>
</div>
</div>
</div> */}