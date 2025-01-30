import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {useDispatch,useSelector} from "react-redux"
/* import { updatePage } from '../../redux/actions'; */
import { useState } from 'react';
import { getSecuestros } from '../../redux/actions';

function PaginationComponent() {

  const dispatch= useDispatch();

  const filter= useSelector((state)=>state.selectedFilter);
  const currentPagina= useSelector((state)=>state.currentPage);
  /* const [currentPagina, setCurrentPagina]= useState(1); */

  const handlePage =(page)=>{
    dispatch(getSecuestros(page,filter))
    /* setCurrentPagina(page) */
  }
  const handlePrev =()=>{
    if (currentPagina===1) return
    const page=currentPagina-1
    dispatch(getSecuestros(page,filter))
    /* setCurrentPagina(currentPagina-1) */
  }
  const handleNext =()=>{
    const page=currentPagina+1
    dispatch(getSecuestros(page,filter))
    /* setCurrentPagina(currentPagina+1) */
  }

  
    
    return (
        <div className="flex items-center justify-center  px-4 py-6">
        
        
          {/* <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">97</span> results
            </p>
          </div> */}
          
            <div  className=" inline-flex -space-x-px  shadow-sm bg-white border-2 border-[#0477AD]">
              <button onClick={()=>handlePrev()}>
              <div
                
                className="relative inline-flex items-center  px-2 py-2 text-gray-400 border-r border-1 border-[#0477AD] hover:bg-gray-50 focus:z-20 focus:outline-offset-0 "
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5 text-[#0477AD]" />
              </div>
              </button>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              <button onClick={()=>handlePage(1)} >
              <div
                
                
                className={`
                 ${
                  currentPagina === 1 ? "border-1 border-[#0477AD]   inline-flex items-center bg-[#0477AD] px-4 py-2 text-sm font-semibold text-white focus:z-20  " : "text-[#0477AD] border-r border-1 border-[#0477AD] relative inline-flex items-center px-4 py-2 text-sm font-semibold   "
                }`}
              >
                1
              </div>
              </button>
              <button onClick={()=>handlePage(2)}>
              <div
                
                className={`
                 ${
                  currentPagina === 2 ? "border-1 border-[#0477AD]   inline-flex items-center bg-[#0477AD] px-4 py-2 text-sm font-semibold text-white focus:z-20  " : "text-[#0477AD] border-r border-1 border-[#0477AD] relative inline-flex items-center px-4 py-2 text-sm font-semibold"
                }`}
              >
                2
              </div>
              </button>
              <button onClick={()=>handlePage(3)}>
              <div
                
                className={`
                 ${
                  currentPagina === 3 ? "border-1 border-[#0477AD]   inline-flex items-center bg-[#0477AD] px-4 py-2 text-sm font-semibold text-white focus:z-20  " : "text-[#0477AD] border-r border-1 border-[#0477AD] relative inline-flex items-center px-4 py-2 text-sm font-semibold"
                }`}
              >
                3
              </div>
              </button>
              <button onClick={()=>handlePage(4)}>
              <div
                
                className={`
                 ${
                  currentPagina === 4 ? "border-1 border-[#0477AD]   inline-flex items-center bg-[#0477AD] px-4 py-2 text-sm font-semibold text-white focus:z-20  " : "text-[#0477AD] border-r border-1 border-[#0477AD] relative inline-flex items-center px-4 py-2 text-sm font-semibold"
                }`}
              >
                4
              </div>
              </button>
              <button onClick={()=>handlePage(5)}>
              <div
                
                className={`
                 ${
                  currentPagina === 5 ? "border-1 border-[#0477AD]   inline-flex items-center bg-[#0477AD] px-4 py-2 text-sm font-semibold text-white focus:z-20  " : "text-[#0477AD] border-r border-1 border-[#0477AD] relative inline-flex items-center px-4 py-2 text-sm font-semibold "
                }`}
              >
                5
              </div>
              </button>
              <button onClick={()=>handlePage(6)}>
              <div
                
                className={`
                 ${
                  currentPagina === 6 ? "border-1 border-[#0477AD]   inline-flex items-center bg-[#0477AD] px-4 py-2 text-sm font-semibold text-white focus:z-20  " : "text-[#0477AD] border-r border-1 border-[#0477AD] relative inline-flex items-center px-4 py-2 text-sm font-semibold"
                }`}
              >
                6
              </div>
              </button>
              
              
              <button onClick={()=>handleNext()}>
              <div
                
                className="relative inline-flex items-center  px-2 py-2 text-gray-400 border-l border-1 border-[#0477AD] hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5 text-[#0477AD]" />
              </div>
              </button>
            </div>
          
        
      </div>

       
       
    );
}
  
export default PaginationComponent;