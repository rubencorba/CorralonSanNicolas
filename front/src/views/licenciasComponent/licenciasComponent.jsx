import Navbar from "../../components/navbar/navbarComponent";
import { useState } from "react";
import LicenciasCardsComponent from "./licenciasCards";
import IngresarLicenciaComponent from "./ingresarLicencia";
import LicenciaFinderComponent from "./licenciaFinder";
import LicenciaFoundComponent from "./licenciaFound";
import LicenciasPaginationComponent from "./licenciasPagination";
import OpcionesFotoLicencia from "./opcionesFotoLicencia";
import TakeFotoLicencia from "./takeFotoLicencia";
import ConfirmarDatosLicencia from "./confirmarDatos";
import SuccessModal from "../../components/modalsComponent/successModal";
import { useNavigate } from "react-router-dom";
import FilterLicenciasComponent from "./filterLicenciasComponent";

function LicenciasComponent() {
  const navigate= useNavigate()


  const [isModalIngresarOpen, setIsModalIngresarOpen] = useState(false);
  const openModalIngresar = () => setIsModalIngresarOpen(true);
  const closeModalIngresar = () => setIsModalIngresarOpen(false);

  const [isFotoOpcionesOpen, setIsFotoOpcionesOpen] = useState(false);
  const openOpcionesFotoLicencia = () => {
    setIsFotoOpcionesOpen(true);
    closeModalIngresar(); // Para cerrar el modal
  };
  const closeOpcionesFotoLicencia = () => setIsFotoOpcionesOpen(false);

  const [isTakeFotoOpen, setIsTakeFotoOpen] = useState(false);
  const openTakeFotoLicencia = () => {
    setIsTakeFotoOpen(true);
    closeOpcionesFotoLicencia(); // Para cerrar el modal
  };
  const closeTakeFotoLicencia = () => {
    setIsTakeFotoOpen(false);
    setIsFotoOpcionesOpen(true);
  };


  const [confirmarDatosOpen, setConfirmarDatosOpen] = useState(false);
  const openConfirmarDatosLicencia = () => {
    setConfirmarDatosOpen(true);
    setIsTakeFotoOpen(false);
    setIsFotoOpcionesOpen(false);
  };
  const closeConfirmarDatosLicencia = () => {
    setConfirmarDatosOpen(false);
  };

  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const openSuccessModal = () => setSuccessModalOpen(true);
  const closeSuccessModal = () => {
    setSuccessModalOpen(false);
    navigate(0);
  };

  return (
    <div className="bg-[#F5FAFF] min-h-screen">
      <Navbar />

      {/* Render condicional para formulario de ingreso de licencia */}
      {isModalIngresarOpen && (
        <IngresarLicenciaComponent closeModalIngresar={closeModalIngresar} openOpcionesFotoLicencia={openOpcionesFotoLicencia} />
      )}
      {/* Render condicional para opciones de foto */}
      {isFotoOpcionesOpen && <OpcionesFotoLicencia closeOpcionesFotoLicencia={closeOpcionesFotoLicencia} openTakeFotoLicencia={openTakeFotoLicencia} openConfirmarDatosLicencia={openConfirmarDatosLicencia} openOpcionesFotoLicencia={openOpcionesFotoLicencia} />}

      {/* Render condicional para tomar foto */}
      {isTakeFotoOpen && <TakeFotoLicencia closeTakeFotoLicencia={closeTakeFotoLicencia} openConfirmarDatosLicencia={openConfirmarDatosLicencia} />}

      {/* Render condicional para confirmar datos */}
      {confirmarDatosOpen && <ConfirmarDatosLicencia closeConfirmarDatosLicencia={closeConfirmarDatosLicencia} openSuccessModal={openSuccessModal}/>}

      {/* Render condicional modal de éxito */}
      {successModalOpen && <SuccessModal closeSuccessModal={closeSuccessModal} />}


      <div className="flex  flex-col  items-center bg-[#F5FAFF] gap-8">

        <div className="flex flex-col md:flex-row items-center md:items-start bg-[#F5FAFF] gap-4 md:gap-32 pt-[4rem] ">
          <div className="flex w-full md:w-auto">
            <button
              onClick={openModalIngresar}
              className="w-full md:w-auto bg-white border border-[#0477AD] h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center gap-1 flex"
            >
              <div className="text-[#0477AD] text-base font-semibold font-inter">
                Ingresar nueva licencia
              </div>
            </button>
          </div>

          <div className="flex flex-col w-full md:self-start md:w-auto">
            <LicenciaFinderComponent />
          </div>
        </div>
        <LicenciaFoundComponent></LicenciaFoundComponent>


        <FilterLicenciasComponent></FilterLicenciasComponent>
        <LicenciasCardsComponent></LicenciasCardsComponent>
        <LicenciasPaginationComponent />
      </div>
    </div>
  );
}

export default LicenciasComponent;
