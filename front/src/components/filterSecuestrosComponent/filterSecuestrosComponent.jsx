import { useState } from "react";
import { getSecuestros } from "../../redux/actions";
import { useDispatch } from "react-redux";

function FilterSecuestrosComponent() {
  const dispatch = useDispatch();
  const [currentFilter, setCurrentFilter] = useState("todos");
  const filters = ["todos", "a entregar", "egresados", "compactados"];

  const buttonStyles = (type) =>
    currentFilter === type
      ? "bg-[#0a5477] text-white"
      : "bg-[#d7eaff] text-[#0477ad]";

  const setFilter = async (type) => {
    setCurrentFilter(type);

    if (type === "a entregar") {
      const filter = "ingresados";
      await dispatch(getSecuestros(1,filter));
    } else {
        const filter = type;
      await dispatch(getSecuestros(1,filter));
    }
  };

  return (
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
  );
}

export default FilterSecuestrosComponent;
