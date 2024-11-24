import {Link, Route,Routes, useLocation} from "react-router-dom";


function NavBar2() {


    let location=useLocation();
    


    {/* <nav class=" p-4 flex justify-around items-center"> */}
  return (
    <div className="flex justify-center items-center sm:gap-[2rem] gap-[1rem] my-[25px] mx-[1rem]">

      <div class="w-[12rem] h-[50px] px-[18px] py-[13px] bg-[#0477AD] rounded-[8px] overflow-hidden justify-center items-center gap-[4px] flex">
        <Link to='/ingreso'>
          <button class="text-[#F6F5F5] text-[16px] font-inter font-semibold break-words">
            Nuevo ingreso
          </button>
        </Link>
      </div>

      <div class="flex w-[12rem] h-[50px] px-[18px] py-[13px] bg-white rounded-[8px] overflow-hidden border border-[#0477AD] justify-center items-center gap-[4px]">
        <button class="text-[#0477AD] text-[16px] font-inter font-semibold break-words">
          Nuevo oficio policial
        </button>
      </div>

      </div>
  );
}

export default NavBar2;
