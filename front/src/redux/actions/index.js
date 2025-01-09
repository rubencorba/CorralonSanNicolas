import axios from "axios";
import vehiculosSecuestrados from "../../utils/vehiculos";

export const UPDATE_PAGE = "UPDATE_PAGE";
export const GET_DETAIL_SECUESTRO = "GET_DETAIL_SECUESTRO";
export const GET_ALL_VEHICULOS = "GET_ALL_VEHICULOS";
export const GET_ALL_SECUESTROS = "GET_ALL_SECUESTROS";
export const GET_ALL_INFRACCIONES = "GET_ALL_INFRACCIONES";
export const OFICIO_POLICIAL = "OFICIO_POLICIAL";
export const INGRESO_DETALLES = "INGRESO_DETALLES";
export const INGRESO_FOTO = "INGRESO_FOTO";
export const POST_SECUESTRO = "POST_SECUESTRO";
export const SEARCH_ACTA = "SEARCH_ACTA";

/* export const getAllUsers=()=>{
    try {
        const endpoint='http://localhost:3001/user';
        return async (dispatch)=>{
            const {data}= await axios.get(endpoint);
            return dispatch({
                
                type:GET_ALL_USERS,
                payload:data
            })
           
        }
    } catch (error) {
        console.log(error);
    }
    
}
export const getAllTramites=()=>{
    try {
        const endpoint='http://localhost:3001/tramite';
        return async (dispatch)=>{
            const {data}= await axios.get(endpoint);
            return dispatch({
                
                type:GET_ALL_TRAMITES,
                payload:data
            })
           
        }
    } catch (error) {
        console.log(error);
    }
    
}

export const postTramite=(info)=>{
        info.estado= "pendiente";
        info.comentario='';
        info.domicilio= info.domicilio + ' ' + info.numero + ' ' + '(' + info.dptoPiso + ')' 
        try {
            const endpoint='http://localhost:3001/tramite';
            return async (dispatch)=>{
                const {data}= await axios.post(endpoint,info);
                
                return dispatch({
                    
                    type:POST_TRAMITE,
                    payload:data
                })
               
            }
        } catch (error) {
            console.log(error);
        }
        
}

export const updateTramiteAprobado=(comentario,id)=>{
        const info={
            comentario:comentario,
            estado:'aprobado',
            id:id
        }
        
        try {
            const endpoint='http://localhost:3001/tramite';
            return async (dispatch)=>{
                const {data}= await axios.put(endpoint,info);
                
                return dispatch({
                    
                    type:APROBAR_TRAMITE,
                    payload:data
                })
               
            }
        } catch (error) {
            console.log(error);
        }
        
}

export const updateTramiteRechazado=(comentario,id)=>{
        const info={
            comentario:comentario,
            estado:'rechazado',
            id:id
        }
        try {
            const endpoint='http://localhost:3001/tramite';
            return async (dispatch)=>{
                const {data}= await axios.put(endpoint,info);
                
                return dispatch({
                    
                    type:RECHAZAR_TRAMITE,
                    payload:data
                })
               
            }
        } catch (error) {
            console.log(error);
        }
        
}

export const updateCurrentUser=(currentUser)=>{
        
        return ({
                type:UPDATE_CURRENT_USER,
                payload:currentUser
        })
        
}
export const postUsers=()=>{
    const infoUser1={
        name: 'usuario',
        password: '123asd'
    }
    const infoUser2={
        name: 'usuario2',
        password: '123asd'
    }
    try {
        const endpoint='http://localhost:3001/user';
        return async (dispatch)=>{
             await axios.post(endpoint,infoUser1);
             await axios.post(endpoint,infoUser2);
            
            return dispatch({
                
                type:POST_USERS,
                
            })
           
        }
    } catch (error) {
        console.log(error);
    }
        
} */

export const updatePage = (page) => {
  try {
    const endpoint = `http://localhost:3001/secuestros/?page=${page}`;
    return async (dispatch) => {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: UPDATE_PAGE,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const getDetailSecuestro = (id) => {
  try {
    const endpoint = `http://localhost:3001/secuestros/${id}`;
    return async (dispatch) => {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_DETAIL_SECUESTRO,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const getAllVehiculos = () => {
  try {
    const endpoint = "http://localhost:3001/vehiculos";
    return async (dispatch) => {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_ALL_VEHICULOS,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const getAllSecuestros = () => {
  try {
    const endpoint = "http://localhost:3001/secuestros";
    return async (dispatch) => {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_ALL_SECUESTROS,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const getAllInfracciones = () => {
  try {
    const endpoint = "http://localhost:3001/infracciones";
    return async (dispatch) => {
      const { data } = await axios.get(endpoint);
      return dispatch({
        type: GET_ALL_INFRACCIONES,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const ingresoOficioPolicial = (data) => {
  try {
    return {
      type: OFICIO_POLICIAL,
      payload: data,
    };
  } catch (error) {
    console.log(error);
  }
};

export const ingresoDetalles = (info) => {
  return async (dispatch) => {
    try {
      const endpoint = `http://localhost:3001/secuestros/inventario/${info.nroInventario}`;
      const { data } = await axios.get(endpoint);
      if (data.isUnique) dispatch({ type: INGRESO_DETALLES, payload: info,});
        
      return data
      
    } catch (error) {
      console.log(error)
    }
  };
};

export const ingresoFoto = (data) => {
  try {
    return {
      type: INGRESO_FOTO,
      payload: data,
    };
  } catch (error) {
    console.log(error);
  }
};
export const postSecuestro = (info) => {
  try {
    const endpoint = "http://localhost:3001/secuestros";
    return async (dispatch) => {
      const { data } = await axios.post(endpoint, info);
      return dispatch({
        type: POST_SECUESTRO,
        payload: data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const searchActa = (nroActa) => {
  return async (dispatch) => {
    try {
      /* const endpoint = `http://localhost:3001/actas/${nroActa}`; */
      const endpoint = `https://actas.movisn.com/transito/actaByNro/${nroActa}`;
      const { data } = await axios.get(endpoint);
      if (!data.length) throw new Error("Ese número de acta no existe");
      if (data[0].infractor && data[0].infractor !== "-1") {
        const dataInfractor = await axios.get(
          `https://actas.movisn.com/transito/infractorById/${data[0].infractor}`
        );
        const info = {
          acta: data[0],
          infractor: dataInfractor.data[0],
        };
        dispatch({ type: SEARCH_ACTA, payload: info });
      } else {
        const info = {
          acta: data[0],
          infractor: null,
        };
        dispatch({ type: SEARCH_ACTA, payload: info });
      }
      /* dispatch({ type: SEARCH_ACTA, payload: info }); */

      return null; // No hay error
    } catch (error) {
      console.log(error.message /* || error */);
      return error; /* .message */ // Devuelve el error
    }
  };
};
