import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NavBar2() {

  const tipoCurrentUser = useSelector((state) => state.tipoCurrentUser);

  return (
    <div className="flex justify-center items-center sm:gap-[2rem] gap-[1rem] my-[25px] mx-[1rem]">
      <Link
        to="/ingreso"
        class="w-[12rem] h-[50px] px-[18px] py-[13px] bg-[#0477AD] rounded-[8px] overflow-hidden justify-center items-center gap-[4px] flex"
      >
        <button class="text-[#F6F5F5] text-[16px] font-inter font-semibold break-words">
          Nuevo ingreso
        </button>
      </Link>
    {tipoCurrentUser !== "user" ? (
      <Link
        to="/ingreso_policial"
        class="flex w-[12rem] h-[50px] px-[18px] py-[13px] bg-white rounded-[8px] overflow-hidden border border-[#0477AD] justify-center items-center gap-[4px]"
      >
        <button class="text-[#0477AD] text-[16px] font-inter font-semibold break-words">
          Nuevo oficio policial
        </button>
      </Link>
      ):(null)}
    </div>
  );
}

export default NavBar2;
