import { useState } from "react";
import Navbar from "../navbar/navbarComponent";
import ACompactarComponent from "../aCompactarComponent/aCompactarComponent";
import CompactadosComponent from "../compactadosComponent/compactadosComponent";
import { useSelector } from "react-redux";

const CompactacionComponent = () => {
  const tipoCurrentUser = useSelector((state) => state.tipoCurrentUser);

  const isAdmin = tipoCurrentUser === "admin" || tipoCurrentUser === "super_admin";
  const isUser = tipoCurrentUser === "user" || tipoCurrentUser === "super_admin";

  const [activeTab, setActiveTab] = useState(isAdmin ? "tab1" : "tab2");

  return (
    <div className="bg-[#F5FAFF] flex flex-col justify-center">
            <Navbar />
            <div className="min-h-screen">
            <div className="flex  flex-col items-center w-full h-full gap-8">
                    <div className="flex flex-col justify-center items-start items-center text-center inline-flex mt-[2rem] w-full">
                        <div className="text-[#3d4245] text-[2rem]  font-bold font-inter">
                            Compactaciones
                        </div>
                    </div>
                </div>

    <div className="w-full max-w-xl mx-auto mt-8 px-[1rem]">
      {/* Solapas */}
      <div className="flex border-b border-gray-200">
      {isAdmin && (
        <button
          className={`px-4 py-2 font-semibold text-sm ${
            activeTab === "tab1"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          Ingresados
        </button>
        )}
        {isUser && (
        <button
          className={`px-4 py-2 font-semibold text-sm ${
            activeTab === "tab2"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          A compactar
        </button>
        )}
      </div>

      {/* Contenido de solapas */}
      <div className=" bg-white border border-t-0 border-gray-200 rounded-b-lg">
        {activeTab === "tab1" && (
          <div>
            {/*Contenido de Ingresados */}
            <ACompactarComponent/>
          </div>
        )}
        {activeTab === "tab2" && (
          <div>
            {/* Contenido de A compactar*/}
            <CompactadosComponent/>
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default CompactacionComponent;
