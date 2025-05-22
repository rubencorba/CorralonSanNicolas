import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/navbarComponent";
import { getAllUsers } from "../../redux/actions";
import ResetearUsuarioComponent from "./resetearUsuarioComponent";
import ConfigurarUsuarioComponent from "./configurarUsuarioComponent";
import CambiarTipoUsuarioComponent from "./cambiarTipoUsuarioComponent";
import EliminarUsuarioComponent from "./eliminarUsuarioComponent";

function UsuariosComponent() {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  /*   const formatDate = (isoDate) => {
      if (!isoDate) return ""; // Manejar casos donde la fecha no exista
      const date = new Date(isoDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Mes de 1 a 12
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }; */

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await dispatch(getAllUsers());
        if (Array.isArray(response)) {
          // Convertir las fechas al formato deseado
          /* const formattedUsers = response.map(user => ({
            ...user,
            fecha: formatDate(user.fecha), // Formatear fecha
          })); */

          setUsers(response);
        }
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [dispatch]);

  
  const [isConfiguracionOpen, setIsConfiguracionOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  
  const openConfiguracion = (id) => {
    setSelectedUserId(id);
    setIsConfiguracionOpen(true);
  };
  
  const closeConfiguracion = () => {
    setIsConfiguracionOpen(false);
  };
  
  
  const [isModalContrasenaOpen, setIsModalContrasenaOpen] = useState(false);

  const openContrasenaModal = () => {
    setIsModalContrasenaOpen(true);
    closeConfiguracion()
  };

  const closeContrasenaModal = () => {
    setIsModalContrasenaOpen(false)
    setSelectedUserId(null);
  };
  
  const [isModalTipoOpen, setIsModalTipoOpen] = useState(false);

  const openTipoModal = () => {
    setIsModalTipoOpen(true);
    closeConfiguracion()
  };

  const closeTipoModal = () => {
    setIsModalTipoOpen(false)
    setSelectedUserId(null);
  };
  
  
  const [isModalEliminarOpen, setIsModalEliminarOpen] = useState(false);

  const openEliminarModal = () => {
    setIsModalEliminarOpen(true);
    closeConfiguracion()
  };

  const closeEliminarModal = () => {
    setIsModalEliminarOpen(false)
    setSelectedUserId(null);
  };

  return (
    <div>
      <Navbar />


      {/* Render condicional del modal Configuración */}
      {isConfiguracionOpen && <ConfigurarUsuarioComponent userId={selectedUserId} closeConfiguracion={closeConfiguracion}  openContrasenaModal={openContrasenaModal} openTipoModal={openTipoModal} openEliminarModal={openEliminarModal}/>}
      {/* Render condicional del modal Contraseña */}
      {isModalContrasenaOpen && <ResetearUsuarioComponent userId={selectedUserId} onClose={closeContrasenaModal} />}
      {/* Render condicional del modal Tipo */}
      {isModalTipoOpen && <CambiarTipoUsuarioComponent userId={selectedUserId} onClose={closeTipoModal} />}
      {/* Render condicional del modal Eliminar */}
      {isModalEliminarOpen && <EliminarUsuarioComponent userId={selectedUserId} onClose={closeEliminarModal} />}


      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] ">
        <div className="text-[#3d4245] text-[28px] font-bold font-inter sm:my-[3rem] my-[1rem]">
          Usuarios
        </div>

        <div className="sm:w-[40rem]  flex-col justify-start items-start gap-3 inline-flex sm:mx-[1rem] mb-[4rem]">
          <Link
            to="/nuevo_usuario"
            className="self-stretch px-4 py-7 bg-white rounded-lg border border-[#c5dfff] justify-start items-center gap-2.5 inline-flex"
          >
            <div className="w-[49px] h-[49px] relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-18 stroke-[#0477ad]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>
            </div>
            <div className="flex-col justify-start items-start gap-1 inline-flex">
              <div className="text-[#0477ad] text-lg font-bold font-inter">
                Nuevo usuario
              </div>
              <div className="text-[#687073] text-sm font-normal font-inter">
                Registrar un nuevo usuario
              </div>
            </div>
          </Link>


          <div className="self-stretch rounded-lg border border-[#c5dfff] flex-col flex overflow-hidden">
            {/* Encabezados */}
            <div className="self-stretch bg-[#c5dfff] flex items-center h-[3.5rem] px-4">
              <div className="text-[#0a5477] text-xs font-bold font-inter uppercase flex-1 text-left">
                Nombre y apellido
              </div>
              <div className="text-[#0a5477] text-xs font-bold font-inter uppercase flex-1 text-center">
                Tipo
              </div>
              {/* <div className="text-[#0a5477] text-xs font-bold font-inter uppercase flex-1 text-center">
          Registro
        </div> */}
              <div className="text-[#0a5477] text-xs font-bold font-inter uppercase flex-1 text-right pr-4">
                Acción
              </div>
            </div>

            {/* Cuerpo de la tabla */}
            {loading ? (
              <div className="text-center py-4">Cargando usuarios...</div>
            ) : (
              users.map(({ nombreCompleto, tipo, id }, index) => (
                <div
                  key={index}
                  className="h-20 bg-white border-b border-[#c5dfff] flex items-center px-4"
                >
                  <div className="text-[#3d4245] text-base font-semibold font-inter flex-1 text-left">
                    {nombreCompleto}
                  </div>
                  <div className="text-[#3d4245] text-base font-semibold font-inter flex-1 text-center">
                    {tipo}
                  </div>
                  {/* <div className="text-[#3d4245] text-base font-semibold font-inter flex-1 text-center">
              {fecha}
            </div> */}
                  <div className="flex-1 text-right">
                    <button
                      type="button"
                      onClick={() => openConfiguracion(id)}
                      className="px-4 py-2 bg-white rounded-lg border border-[#0477ad] text-[#0477ad] text-sm font-medium font-inter"
                    >
                      Configurar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>


        </div>
      </div>
    </div>
  );
}

export default UsuariosComponent;


