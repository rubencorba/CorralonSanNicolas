import axios from 'axios';

export const GET_ALL_USERS="GET_ALL_USERS"
export const POST_TRAMITE="POST_TRAMITE"
export const UPDATE_CURRENT_USER="UPDATE_CURRENT_USER"
export const GET_ALL_TRAMITES="GET_ALL_TRAMITES"
export const APROBAR_TRAMITE="APROBAR_TRAMITE"
export const RECHAZAR_TRAMITE="RECHAZAR_TRAMITE"
export const POST_USERS="POST_USERS"

export const getAllUsers=()=>{
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
        /* console.log(info) */
        /* info.UserId= 1; */
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
        /* console.log(info) */
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
        
}