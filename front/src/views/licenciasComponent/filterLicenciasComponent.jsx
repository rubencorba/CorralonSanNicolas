import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLicencias } from "../../redux/actions";

function FilterLicenciasComponent() {
  const dispatch = useDispatch();
  const [currentFilter, setCurrentFilter] = useState("todas");
  const [message, setMessage] = useState("");
  const filters = ["todas", "ingresadas", "egresadas"];

  const buttonStyles = (type) =>
    currentFilter === type
      ? "bg-[#0a5477] text-white"
      : "bg-[#d7eaff] text-[#0477ad]";

  const setFilter = async (type) => {
    setCurrentFilter(type);

    const filter = type;
    await dispatch(getLicencias(1, filter));


  };

  useEffect(() => {

    if (currentFilter === "todas") {
      setMessage("")
    } else if (currentFilter === "ingresadas") {
      setMessage("Licencias que se encuentran actualmente en el corralón")
    } else if (currentFilter === "egresadas") {
      setMessage("Licencias que ya se entregaron")
    }
  }, [currentFilter]);



  return (
    <div>

      <div className="flex gap-2 justify-center sm:justify-start items-center p-4">
        {filters.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded-sm inline-flex justify-center items-center sm:w-[7rem] w-[4.5rem] ${buttonStyles(
              type
            )}`}
          >
            <div className="font-semibold font-inter sm:text-[1rem] text-[0.7rem] whitespace-nowrap">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
          </button>
        ))}
      </div>

      <div class="text-[#687073] sm:text-[1.1rem] text-s font-medium font-inter justify-center text-center px-4">
        {message}
      </div>
    </div>
  );
}

export default FilterLicenciasComponent;
