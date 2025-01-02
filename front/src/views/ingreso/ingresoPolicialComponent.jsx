import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbarComponent";
import { useDispatch, useSelector } from "react-redux";
import { getAllInfracciones, ingresoOficioPolicial } from "../../redux/actions";
import { useEffect, useState } from "react";

function IngresoPolicialComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const infracciones = useSelector((state) => state.infracciones);

  const [input, setInput] = useState({})

  useEffect(() => {
    dispatch(getAllInfracciones());
  }, []);

  const [infraccionesSelected, setInfraccionesSelected] = useState([]);

  /* const handleChange = (event) => {
    console.log(infraccionesSelected)
    if (!infraccionesSelected.includes(event.target.value)) {
      setInfraccionesSelected([...infraccionesSelected, event.target.value]);
      console.log(infraccionesSelected)
      setInput({ ...input, infracciones: infraccionesSelected })
    }
  }; */

  const handleRemove = (infraccionToRemove) => {
    setInfraccionesSelected((prev) =>
      prev.filter((infraccion) => infraccion !== infraccionToRemove)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto
    dispatch(ingresoOficioPolicial(input))
    
    /* console.log(input) */
    navigate('/ingreso_detalles')
  };

  useEffect(() => {
    setInput({ 
      ...input,
      infracciones: infraccionesSelected })
  }, [infraccionesSelected]);

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col  items-center bg-[#F5FAFF] gap-8">
        <div class="flex flex-col justify-center items-start sm:items-center inline-flex mt-[1rem] sm:mt-[4rem] w-[20rem] sm:w-[32rem]">
          <div class="text-[#3d4245] sm:text-[2rem] text-[1rem] font-bold font-inter">
            Nuevo oficio policial
          </div>
          <div class="text-[#687073] sm:text-lg text-s font-medium font-inter">
            Ingresa un nuevo vehículo al corralón
          </div>
        </div>

        <div class="w-[20rem] sm:w-[32rem] h-[56.40px] flex-col justify-start items-start gap-1 inline-flex mb-5 sm:mb-10">
          <div class="self-stretch justify-start items-center inline-flex">
            <div class="w-[33.40px] h-[33.40px] p-[3.34px] bg-[#c5dfff] rounded-[33.40px] border-2 border-[#0477ad]"></div>
            <div class="grow shrink basis-0 h-[2.50px] bg-[#0477ad]"></div>
            <div class="w-10 h-10 p-[3.34px] rounded-[33.40px] border-2 border-[#0477ad]"></div>
            <div class="grow shrink basis-0 h-[2.50px] bg-[#0477ad]"></div>
            <div class="w-[33.40px] h-[33.40px] p-[3.34px] rounded-[33.40px] border-2 border-[#0477ad]"></div>
          </div>
          <div class="self-stretch px-1 justify-between items-start inline-flex">
            <div class="text-[#3d4245] text-base font-semibold font-inter">
              Acta
            </div>
            <div class="text-[#3d4245] text-base font-semibold font-inter">
              Detalles
            </div>
            <div class="text-[#3d4245] text-base font-semibold font-inter">
              Foto
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="w-[20rem] sm:w-[32rem]  flex-col justify-start items-start gap-6 inline-flex">
          <div className="self-stretch  flex-col justify-start items-start gap-2 flex">
            <div className="text-[#0a5477] text-base font-bold font-inter uppercase">
              Vehículo
            </div>
            <div className="self-stretch h-[162px] flex-col justify-start items-start gap-3 flex">
              <div className="self-stretch justify-start items-start gap-2 inline-flex">
                <div className="grow shrink basis-0  flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-[#3d4245] text-sm font-normal font-inter">
                    Patente
                  </div>

                  <input
                    placeholder="00000"
                    className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                    onChange={(e) => {
                      setInput({ ...input, dominio: e.target.value })
                    }}
                  />

                
                </div>
                <div className="grow shrink basis-0  flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-[#3d4245] text-sm font-normal font-inter">
                    Tipo
                  </div>
                  <input
                    placeholder="Tipo"
                    className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                    onChange={(e) => {
                      setInput({ ...input, tipovh: e.target.value })
                    }}
                  />
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-2 inline-flex">
                <div className="grow shrink basis-0  flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-[#3d4245] text-sm font-normal font-inter">
                    Modelo
                  </div>
                  <input
                    placeholder="Modelo"
                    className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                    onChange={(e) => {
                      setInput({ ...input, modelovh: e.target.value })
                    }}
                  />
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-[#3d4245] text-sm font-normal font-inter">
                    Marca
                  </div>
                  <input
                    placeholder="Marca"
                    className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                    onChange={(e) => {
                      setInput({ ...input, marcavh: e.target.value })
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex-col justify-start items-start gap-2 flex">
            <div className="text-[#0a5477] text-base font-bold font-inter uppercase">
              Infractor
            </div>
            <div className="self-stretch  flex-col justify-start items-start gap-3 flex">
              <div className="self-stretch justify-start items-start gap-3 inline-flex">
                <div className="grow shrink basis-0  flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-[#3d4245] text-sm font-normal font-inter">
                    Nombre y apellido
                  </div>
                  <input
                    placeholder="Nombre y apellido"
                    className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                    onChange={(e) => {
                      setInput({ ...input, nombreCompleto: e.target.value })
                    }}
                  />
                </div>
                <div className="grow shrink basis-0  flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-[#3d4245] text-sm font-normal font-inter">
                    DNI
                  </div>
                  <input
                    placeholder="000000000"
                    className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                    onChange={(e) => {
                      setInput({ ...input, dni: e.target.value })
                    }}
                  />
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-3 inline-flex">
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-[#3d4245] text-sm font-normal font-inter">
                    CUIL
                  </div>
                  <input
                    placeholder="000000000000"
                    className="w-full  text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                    onChange={(e) => {
                      setInput({ ...input, cuil: e.target.value })
                    }}
                  />
                </div>
                <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-[#3d4245] text-sm font-normal font-inter">
                    Sexo
                  </div>
                  
                  <select
                    className="w-full text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                    defaultValue=""
                    onChange={(e) => {
                      setInput({ ...input, sexo: e.target.value })
                    }}
                  >
                    <option value="" disabled>
                      Seleccionar sexo
                    </option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="X">No Binario</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex-col justify-start items-start gap-2 flex">
            <div className="text-[#0a5477] text-base font-bold font-inter uppercase">
              Infracción
            </div>
            <div className="self-stretch flex-col justify-start items-start gap-2 flex">
              <div className="text-[#3d4245] text-sm font-normal font-inter">
                Infracción
              </div>
              
              <select
                className="w-full text-sm font-normal font-inter outline-none rounded-md pl-4 pr-10 py-2 h-[50px]"
                defaultValue=""
                /* onChange={handleChange} */
                onChange={(e) => {
                  if (!infraccionesSelected.includes(e.target.value)) {
                    setInfraccionesSelected([...infraccionesSelected, e.target.value]);
                  }
                }}
              >
                <option value="" disabled>
                  Seleccionar infracción de transito
                </option>
                {infracciones.map((infraccion, index) => (
                  <option key={index} value={infraccion.descrip}>
                    {infraccion.descrip}
                  </option>
                ))}
              </select>
              <div className="w-full">
        {infraccionesSelected.length > 0 ? (
          <ul className="space-y-2 w-full">
            {infraccionesSelected.map((infraccion, index) => (
              <li
                key={index}
                className="bg-white p-2 rounded-md shadow-sm text-sm font-medium flex justify-between "
              >
                <span>{infraccion}</span>
                <button
                  onClick={() => handleRemove(infraccion)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
            </div>
          </div>
          <button
            type="submit"
            
            className=" self-stretch h-[50px] px-[18px] py-[13px] bg-[#0477ad] rounded-lg justify-center items-center gap-1 inline-flex  mb-[3rem]"
          >
            <span  className="text-[#f6f5f5] text-base font-semibold font-inter">
              Siguiente
            </span>
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default IngresoPolicialComponent;
