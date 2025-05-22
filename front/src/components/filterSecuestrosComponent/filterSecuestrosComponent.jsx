import { useEffect, useState } from "react";
import { getSecuestros } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function FilterSecuestrosComponent() {
  const dispatch = useDispatch();
  const [currentFilter, setCurrentFilter] = useState("todos");
  const [vehicleType, setVehicleType] = useState("todos");
  const [message, setMessage] = useState("");
  const totalSecuestros = useSelector((state) => state.totalSecuestros);
  const filters = ["todos", "ingresados", "egresados", "compactados"];

  const buttonStyles = (type) =>
    currentFilter === type
      ? "bg-[#0a5477] text-white"
      : "bg-[#d7eaff] text-[#0477ad]";

  const setFilter = async (type) => {
    setCurrentFilter(type);

    const filter = type;
    await dispatch(getSecuestros(1, filter, vehicleType));

  };

  const handleVehicleTypeChange = async (event) => {
    const selectedType = event.target.value;
    setVehicleType(selectedType);
    await dispatch(getSecuestros(1, currentFilter, selectedType));
  };

  useEffect(() => {

    if (currentFilter === "todos") {
      setMessage("")
    } else if (currentFilter === "ingresados") {
      setMessage("Vehículos que se encuentran actualmente en el corralón")
    } else if (currentFilter === "egresados") {
      setMessage("Vehículos que ya se entregaron")
    } else if (currentFilter === "compactados") {
      setMessage("Vehículos que se compactaron")
    }
  }, [currentFilter]);



  return (
    <div>
      <div className="flex mid:grid mid:grid-cols-2 sm:flex-row flex-col items-center custom:flex-col-reverse flex-col-reverse">

        <div className="flex gap-2 justify-center sm:justify-start items-center p-4">
          {filters.map((type) => {
  const isSelected = currentFilter === type;
  const isIngresados = type === "ingresados";
  const showTotal = isSelected && isIngresados;

  return (
    <button
      key={type}
      onClick={() => setFilter(type)}
      className={`px-3 py-1 rounded-sm inline-flex justify-center items-center transition-all duration-200
        ${buttonStyles(type)}
        ${showTotal ? "min-w-[9rem] sm:min-w-[10rem] px-4" : "sm:w-[7rem] w-[4.5rem]"}
      `}
    >
      <div className="font-semibold font-inter sm:text-[1rem] text-[0.7rem] whitespace-nowrap">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
      {showTotal && (
        <div className="ml-2 text-[0.8rem] sm:text-[0.95rem] font-bold text-white bg-[#044a69] px-2 py-[2px] rounded-sm">
          ({totalSecuestros})
        </div>
      )}
    </button>
  );
})}
        </div>

        <div className="flex sm:pr-6 justify-center items-center mid:order-none custom:order-2 order-2 gap-3 font-inter text-[#3d4245] font-semibold">
          Tipo de vehículo:
          <select
            className=" text-sm font-normal font-inter outline-none rounded-md sm:text-[1rem] text-[0.7rem] border border-[#0477AD] text-[#0477AD] font-semibold focus:outline-none focus:ring-0"
            defaultValue="todos"
            value={vehicleType}
            onChange={handleVehicleTypeChange}
          >
            <option value="todos">Todos</option>
            <option value="Automóvil">Automóvil</option>
            <option value="Moto">Moto</option>
            <option value="Otro">Otro</option>

          </select>
        </div>

      </div>

      <div class="text-[#687073] sm:text-[1.1rem] text-s font-medium font-inter justify-center text-center px-4">
        {message}
      </div>
    </div>
  );
}

export default FilterSecuestrosComponent;
