import { APROBAR_TRAMITE, GET_ALL_TRAMITES, GET_ALL_USERS, POST_USERS, RECHAZAR_TRAMITE, UPDATE_CURRENT_USER } from "../actions";

const initialState={
    allUsers:[],
    allTramites:[],
    currentUser: 0,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_USERS:
        
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
        
        return { ...state };
              
      default:
        return { ...state };
    }
  };