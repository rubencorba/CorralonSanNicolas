import React from "react";

const IngresadoRow = ({ actaNro, marcaModelo, dominio, checked, onCheck }) => {
  return (
    <div className="h-20 bg-white border-b border-[#c5dfff] flex items-center px-4">
      <div className="text-[#3d4245] text-base font-semibold font-inter flex-[0.5]">
        {actaNro}
      </div>
      <div className="text-[#3d4245] text-base font-semibold font-inter flex-1 text-center">
        {marcaModelo}
      </div>
      <div className="text-[#3d4245] text-base font-semibold font-inter flex-1 text-center">
        {dominio}
      </div>
      <div className="flex justify-center flex-[0.5]">
        <input
          type="checkbox"
          checked={checked}
          onChange={onCheck}
          className="cursor-pointer w-7 h-7 rounded border-2 border-[#0477ad] bg-white focus:outline-none focus:ring-0"
        />
      </div>
    </div>
  );
};

export default IngresadoRow;