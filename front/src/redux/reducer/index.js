import {  GET_ALL_VEHICULOS, GET_DETAIL_VEHICULO, UPDATE_PAGE } from "../actions";

const initialState={
    /* allUsers:[],
    allTramites:[],
    currentUser: 0, */

    vehiculos: [],
    pagina: 1,
    detail: {}
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_PAGE:
        return { ...state, pagina: action.payload };
      case GET_DETAIL_VEHICULO:
        return { ...state, detail: action.payload };

       case GET_ALL_VEHICULOS:
        
        return { ...state, vehiculos: action.payload}; 
      /* case GET_ALL_USERS:
        
        return { ...state }; 
        
      case APROBAR_TRAMITE:
        
        return { ...state }; 
      
      case RECHAZAR_TRAMITE:
        
        return { ...state }; 
      
        
    case GET_ALL_TRAMITES:
        
        return { ...state, allTramites: action.payload };
            
    case UPDATE_CURRENT_USER:
        
        return { ...state, currentUser: action.payload };
    case POST_USERS:
        
        return { ...state }; */
              
      default:
        return { ...state };
    }
  };