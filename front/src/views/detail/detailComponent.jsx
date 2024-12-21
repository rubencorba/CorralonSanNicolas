/* import {getDetailCountry} from '../../redux/actions/index' */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbarComponent";
import { getDetailSecuestro } from "../../redux/actions";
import CambiarSectorComponent from "../../components/cambiarSectorComponent/cambiarSectorComponent";
import EgresarVehiculoComponent from "../../components/egresarVehiculoComponent/egresarVehiculoComponent";

function DetailComponent() {
  const detail = useSelector((state) => state.detail);

  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getDetailSecuestro(id));
  }, [id]);

  const foto = detail.foto?.replace(".png", ".jpg");

  const date = new Date(detail.Acta?.fecha_hora); // Fecha en UTC
  // Ajustar a zona horaria de Argentina
  const options = { timeZone: "America/Argentina/Buenos_Aires", hour12: false };

  // Extraer el valor del campo "$numberInt"
  const numeroInventario = detail.inventario
    ? parseInt(JSON.parse(detail.inventario)["$numberInt"], 10)
    : null;

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Esto navega a la página anterior en el historial
  };

  // Estado para controlar los modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEgresoOpen, setIsModalEgresoOpen] = useState(false);
  // Abrir y cerrar modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openModalEgreso = () => setIsModalEgresoOpen(true);
  const closeModalEgreso = () => setIsModalEgresoOpen(false);

  return (
    <div>
      <Navbar></Navbar>

      {/* Render condicional del modal */}
      {isModalOpen && <CambiarSectorComponent onClose={closeModal} />}
      {isModalEgresoOpen && (
        <EgresarVehiculoComponent onCloseEgresar={closeModalEgreso} />
      )}

      <div className=" flex flex-col items-center justify-center bg-[#F5FAFF]">
        <div className="flex items-center max-w-[65rem] px-2.5 w-full my-5">
          <button
            onClick={handleBackClick}
            className="flex items-center justify-center p-2 rounded-full hover:drop-shadow-[3px_3px_5px_rgba(0,0,0,0.3)] transition ease-in-out duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="flex flex-start h-12 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]"
            >
              <defs>
                {/* <!-- Define the gradient for the arrow --> */}
                <linearGradient id="arrow-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="white" />
                  <stop offset="100%" stopColor="white" />
                </linearGradient>
              </defs>
              <circle cx="12" cy="12" r="8" fill="#0477AD" />
              <path
                fillRule="evenodd"
                fill="url(#arrow-gradient)"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="text-3xl mx-auto font-semibold text-gray-900 text-center font-inter text-[#687073]">
            {detail.Vehiculo?.tipovh},{detail.Vehiculo?.dominio}
          </div>
        </div>

        <div className="mb-9 px-2.5 my-2 max-w-[65rem] gap-[1rem]  grid grid-cols-1 mid:grid-cols-3 custom:grid-cols-2">
          <div>
            <div class="flex justify-center items-center gap-[0.5rem] mb-[1rem] ">
              <button class="w-full h-[45px] px-[4px] py-[6px] bg-[#0477AD] rounded-[8px] overflow-hidden justify-center items-center flex text-[#F6F5F5] text-[16px] font-inter font-semibold gap-[4px]">
                Imprimir QR
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                  />
                </svg>
              </button>

              <button
                onClick={openModalEgreso}
                class="flex w-full h-[45px] px-[4px] py-[6px] bg-white rounded-[8px] overflow-hidden border border-[#0477AD] justify-center items-center text-[#0477AD] text-[16px] font-inter font-semibold flex gap-[4px]"
              >
                Egreso
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
              </button>
            </div>

            <div className=" items-center flex justify-center">
              <img
                class="object-cover  h-[500px] w-full rounded-[12px]"
                src={`https://corralon.movisn.com/api${foto}`}
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="   sm:gap-4  bg-white rounded-[8px]  border border-[#61ABCF] divide-y divide-[#61ABCF]">
              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className=" text-sm/6 font-bold text-[#036395] font-inter">
                  SECUESTRO
                </dt>
                <dd className="text-sm/6 text-gray-700"></dd>
              </div>

              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className="text-sm/6 font-medium text-gray-900 col-start-1 flex items-center">
                  Sector
                </dt>
                <dd className=" text-sm/6 text-gray-700 justify-between  flex items-center">
                  {detail.sector}
                  <button
                    type="button"
                    onClick={openModal}
                    class="px-2 py-2 text-xs ml-3 text-center text-white bg-[#0477AD] rounded-lg "
                  >
                    Cambiar sector
                  </button>
                </dd>
              </div>

              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className="text-sm/6 font-medium text-gray-900 sm:col-start-1">
                  Inventario
                </dt>
                <dd className=" text-sm/6 text-gray-700  sm:mt-0">
                  {numeroInventario}
                </dd>
              </div>
            </div>

            <div className="sm:gap-4 bg-white rounded-[8px]  border border-[#61ABCF] divide-y divide-[#61ABCF]">
              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className=" text-sm/6 font-bold text-[#036395] font-inter">
                  ACTA
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0"></dd>
              </div>
              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className="text-sm/6 font-medium text-gray-900">Nro.</dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                  {detail.Acta?.nro}
                </dd>
              </div>
              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className="text-sm/6 font-medium text-gray-900">Lugar</dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                  {detail.Acta?.lugar}
                </dd>
              </div>
              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Inspector
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                  {detail.Acta?.inspector}
                </dd>
              </div>
              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Fecha y Hora
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                  {/* <span>{detail.fecha}</span>
          <span className="ml-4">{detail.hora}</span> */}
                  <span>{date.toLocaleString("es-AR", options)}</span>
                </dd>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="sm:gap-4 bg-white rounded-[8px]  border border-[#61ABCF] divide-y divide-[#61ABCF]">
              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className=" text-sm/6 font-bold text-[#036395] font-inter">
                  VEHICULO
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0"></dd>
              </div>
              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className="text-sm/6 font-medium text-gray-900">Dominio</dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                  {detail.Vehiculo?.dominio}
                </dd>
              </div>
              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className="text-sm/6 font-medium text-gray-900">Tipo</dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                  {detail.Vehiculo?.tipovh}
                </dd>
              </div>
              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className="text-sm/6 font-medium text-gray-900">Marca</dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                  {detail.Vehiculo?.marcavh}
                </dd>
              </div>
              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className="text-sm/6 font-medium text-gray-900">Modelo</dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                  {detail.Vehiculo?.modelovh}
                </dd>
              </div>
            </div>

            <div className="sm:gap-4 bg-white rounded-[8px]  border border-[#61ABCF] divide-y divide-[#61ABCF]">
              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className=" text-sm/6 font-bold text-[#036395] font-inter">
                  INFRACTOR
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0"></dd>
              </div>
              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className="text-sm/6 font-medium text-gray-900">
                  Apellido y Nombres
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                  {detail.Infractore?.nombreCompleto}
                </dd>
              </div>
              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className="text-sm/6 font-medium text-gray-900">DNI</dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                  {detail.Infractore?.dni}
                </dd>
              </div>
              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className="text-sm/6 font-medium text-gray-900">Sexo</dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                  {detail.Infractore?.sexo}
                </dd>
              </div>
              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className="text-sm/6 font-medium text-gray-900">CUIL</dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0">
                  {detail.Infractore?.cuil}
                </dd>
              </div>
            </div>

            <div className="sm:gap-4 bg-white rounded-[8px]  border border-[#61ABCF] divide-y divide-[#61ABCF]">
              <div className="flex flex-col py-2 grid grid-cols-2 px-4">
                <dt className="text-sm/6 font-bold text-[#036395] font-inter">
                  INFRACCIÓN/ES
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0"></dd>
              </div>
              <div className="flex flex-col divide-y divide-[#61ABCF]">
                {detail.infracciones?.map((infr) => (
                  <div className="divide-y divide-[#61ABCF] px-4 py-2 ">
                    {infr.Infraccione.descrip}
                    {infr.Infraccione.digesto}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailComponent;
