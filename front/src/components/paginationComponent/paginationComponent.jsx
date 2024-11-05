import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {useDispatch,useSelector} from "react-redux"
import { updatePage } from '../../redux/actions';

function PaginationComponent() {

  const dispatch= useDispatch();

  const currentPagina= useSelector((state)=>state.pagina);

  const handlePage =(p)=>{
    dispatch(updatePage(p))
  }
  const handlePrev =()=>{
    if (currentPagina==1) return
    const p= currentPagina-1
    dispatch(updatePage(p))
  }
  const handleNext =()=>{
    /* if (currentPagina==1) return */
    const p= currentPagina+1
    dispatch(updatePage(p))
  }

  
    
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          {/* <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">97</span> results
            </p>
          </div> */}
          <div>
            <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <button onClick={()=>handlePrev()}>
              <a
                /* href="#" */
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
              </a>
              </button>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              <button onClick={()=>handlePage(1)}>
              <a
                /* href="#" */
                aria-current="page"
                className={`
                 ${
                  currentPagina === 1 ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }`}
              >
                1
              </a>
              </button>
              <button onClick={()=>handlePage(2)}>
              <a
                /* href="#" */
                className={`
                 ${
                  currentPagina === 2 ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }`}
              >
                2
              </a>
              </button>
              <button onClick={()=>handlePage(3)}>
              <a
                /* href="#" */
                className={`
                 ${
                  currentPagina === 3 ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }`}
              >
                3
              </a>
              </button>
              <button onClick={()=>handlePage(4)}>
              <a
                /* href="#" */
                className={`
                 ${
                  currentPagina === 4 ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }`}
              >
                4
              </a>
              </button>
              <button onClick={()=>handlePage(5)}>
              <a
                /* href="#" */
                className={`
                 ${
                  currentPagina === 5 ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }`}
              >
                5
              </a>
              </button>
              <button onClick={()=>handlePage(6)}>
              <a
                /* href="#" */
                className={`
                 ${
                  currentPagina === 6 ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }`}
              >
                6
              </a>
              </button>
              
              
              <button onClick={()=>handleNext()}>
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
              </a>
              </button>
            </nav>
          </div>
        </div>
      </div>

       
       
    );
}
  
export default PaginationComponent;