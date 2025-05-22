import axios from "axios";
import axiosInstance from "./axiosInstance";

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
export const POST_USER = "POST_USER";
export const LOGIN = "LOGIN";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const UPDATE_CONTRASENA = "UPDATE_CONTRASENA";
export const GET_SECUESTRO_BY_DOMINIO = "GET_SECUESTRO_BY_DOMINIO";
export const GET_SECUESTRO_BY_NRO_ACTA = "GET_SECUESTRO_BY_NRO_ACTA";
export const GET_SECUESTRO_BY_NRO_INVENTARIO ="GET_SECUESTRO_BY_NRO_INVENTARIO";
export const UPDATE_SECTOR = "UPDATE_SECTOR";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const FILTER_SECUESTRO = "FILTER_SECUESTRO";
export const FETCH_SECUESTROS = "FETCH_SECUESTROS";
export const GET_REGISTRO = "GET_REGISTRO";
export const UPDATE_FOTO = "UPDATE_FOTO";
export const POST_EGRESO = "POST_EGRESO";
export const GET_EGRESO = "GET_EGRESO";
export const GET_ACTAS_JUZGADO = "GET_ACTAS_JUZGADO";
export const UP_ACTA = "UP_ACTA";
export const UPDATE_ESTADO = "UPDATE_ESTADO";
export const POST_COMPACTADO = "POST_COMPACTADO";
export const SEARCH_LICENCIA = "SEARCH_LICENCIA";
export const FETCH_LICENCIAS = "FETCH_LICENCIAS";
export const POST_LICENCIA = "POST_LICENCIA";
export const GET_TOTAL_SECUESTROS = "GET_TOTAL_SECUESTROS";
export const GET_TOTAL_LICENCIAS = "GET_TOTAL_LICENCIAS";
export const UPDATE_PAGE_LICENCIAS = "UPDATE_PAGE_LICENCIAS";
export const GET_INFO_EGRESO = "GET_INFO_EGRESO";
export const POST_LICENCIA_EGRESO = "POST_LICENCIA_EGRESO";
export const GET_VEHICULOS_COMPACTAR = "GET_VEHICULOS_COMPACTAR";
export const LIMPIAR_FOTO = "LIMPIAR_FOTO";
export const UPDATE_TOTAL_PAGES = "UPDATE_TOTAL_PAGES";
export const GET_EGRESO_LICENCIA = "GET_EGRESO_LICENCIA";
export const INGRESO_LICENCIA = "INGRESO_LICENCIA";
export const FOTO_LICENCIA = "FOTO_LICENCIA";
export const LIMPIAR_FOTO_LICENCIA = "LIMPIAR_FOTO_LICENCIA";
export const UPDATE_FOTO_LICENCIA = "UPDATE_FOTO_LICENCIA";
export const FILTER_LICENCIA = "FILTER_LICENCIA";
export const GET_LEVANTAMIENTOS = "GET_LEVANTAMIENTOS";
export const VEHICLE_TYPE = "VEHICLE_TYPE";
export const GET_ALL_INGRESADOS = "GET_ALL_INGRESADOS";
export const PUT_ESTADOS_INGRESADOS = "PUT_ESTADOS_INGRESADOS";
export const UPDATE_TIPO_USUARIO = "UPDATE_TIPO_USUARIO";
export const CONSULTAR_COMPACTACION = "CONSULTAR_COMPACTACION";
export const UPDATE_ACOMPACTAR = "UPDATE_ACOMPACTAR";
export const UPDATE_COMPACTADOS = "UPDATE_COMPACTADOS";
export const UPDATE_TOTAL_SECUESTROS = "UPDATE_TOTAL_SECUESTROS";


export const getSecuestros = (page = 1, filter = "todos", vehicleType = "todos") => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(
        `/secuestros/?page=${page}&filter=${filter}&vehicleType=${vehicleType}`
      );

      // Petición para obtener el total de secuestros con el filtro aplicado
      const totalResponse = await axiosInstance.get(`/secuestros/total?filter=${filter}&vehicleType=${vehicleType}`);
      const totalSecuestros = totalResponse.data.total;

      dispatch({ type: FETCH_SECUESTROS, payload: data });
      dispatch({ type: FILTER_SECUESTRO, payload: filter });
      dispatch({ type: VEHICLE_TYPE, payload: vehicleType });
      dispatch({ type: UPDATE_PAGE, payload: page });
      dispatch({ type: UPDATE_TOTAL_PAGES, payload: Math.ceil(totalSecuestros / 9) });
      dispatch({ type: UPDATE_TOTAL_SECUESTROS, payload: totalSecuestros });

    } catch (error) {
      console.error("Error al obtener los secuestros:", error.response?.data || error.message);
    }
  };
};

export const getDetailSecuestro = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/secuestros/${id}`);
      return dispatch({
        type: GET_DETAIL_SECUESTRO,
        payload: data,
      });
    } catch (error) {
      console.error(
        "Error al obtener los detalles del secuestro:",
        error.response?.data || error.message
      );
    }
  };
};

export const getAllVehiculos = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get("/vehiculos");
      return dispatch({
        type: GET_ALL_VEHICULOS,
        payload: data,
      });
    } catch (error) {
      console.error(
        "Error al obtener los vehiculos:",
        error.response?.data || error.message
      );
    }
  };
};

export const getAllInfracciones = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get("/infracciones");
      return dispatch({
        type: GET_ALL_INFRACCIONES,
        payload: data,
      });
    } catch (error) {
      console.error(
        "Error al obtener las infracciones:",
        error.response?.data || error.message
      );
    }
  };
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
    try {

      //ESTO SE ELIMINA PORQUE YA NO SE INGRESA NRO DE INVENTARIO
      /* // Si no se proporciona un nroInventario, solo hace el dispatch
      if (info.nroInventario === "") {
        dispatch({ type: INGRESO_DETALLES, payload: info });
        return;
      }

      // Llama al backend para validar el nroInventario
      const { data } = await axiosInstance.get(
        `/secuestros/inventario/${info.nroInventario}`
      );

      // Si el número de inventario es único, realiza el dispatch
      if (data.isUnique) {
        dispatch({ type: INGRESO_DETALLES, payload: info });
      }

      return data; // Devuelve la respuesta del backend */

      return {
        type: INGRESO_DETALLES,
        payload: info,
      };
    } catch (error) {
      console.error(
        "Error al validar el nroInventario:",
        error.response?.data || error.message
      );
    }
  };

  export const ingresoFoto = (data) => {
    return {
      type: INGRESO_FOTO,
      payload: data,
    };
  };
  export const limpiarFoto = () => {
    return {
      type: LIMPIAR_FOTO
    };
  };

export const postSecuestro = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.post("/secuestros", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({
        type: POST_SECUESTRO,
        payload: data,
      });

      return data;
    } catch (error) {
      console.error(
        "Error al registrar el secuestro:",
        error.response?.data || error.message
      );
    }
  };
};

export const upActa = (infoActa) => {
  try {
    return {
      type: UP_ACTA,
      payload: infoActa,
    };
  } catch (error) {
    console.log(error);
  }
};

export const searchActa = (nroActa) => {
  return async (dispatch) => {
    try {

      //Verifico si el acta no fue ingresada al corralón
      const ingresada = await axiosInstance.get(`/actas/${nroActa}`);
      if (ingresada.data !== "") return ingresada.data;

      //Busco el acta en juzgado
      const { data } = await axiosInstance.get(`/actas/detailActaJuzgado/${nroActa}`);
      
      dispatch({ type: UP_ACTA, payload:  data.data[0]  });
      return null;
    } catch (error) {
      
      console.log(error);
      const mensaje=error.response.data.error;
      return mensaje;
    }
  };
};


export const postNewUser = (info) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.post("/users", info);
      
      return dispatch({
        type: POST_USER,
        payload: data,
      });
    } catch (error) {
      console.error(
        "Error al registrar un nuevo usuario:",
        error.response?.data || error.message
      );

      return { error: error.response?.data?.error || "Error desconocido" };
    }
  };
};
 
export const login = (info) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        info
      );

      // Guardar el token en localStorage
      localStorage.setItem("token", data.token);

      dispatch({
        type: LOGIN,
        payload: {
          userId: data.userId,
          tipo: data.tipo,
        },
      });

      dispatch({
        type: SET_AUTHENTICATED,
        payload: true,
      });

      return data;
    } catch (error) {
      console.error(
        "Error al iniciar sesión:",
        error.response?.data || error.message
      );
    }
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get("/users");
      dispatch({
        type: GET_ALL_USERS,
        payload: data,
      });
      return data; 
    } catch (error) {
      console.error(
        "Error al obtener los usuarios:",
        error.response?.data || error.message
      );
    }
  };
};

export const updateContrasena = (info) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.put("/users", info);
      dispatch({
        type: UPDATE_CONTRASENA,
        payload: data,
      });
      return data;
    } catch (error) {
      console.error(
        "Error al actualizar la contraseña:",
        error.response?.data || error.message
      );
    }
  };
};

export const getSecuestroByDominio = (dominio) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/vehiculos/${dominio}`);
      dispatch({
        type: GET_SECUESTRO_BY_DOMINIO,
        payload: data,
      });
      return data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error al buscar el dominio",
      };
    }
  };
};

export const getSecuestroByNroActa = (nroActa) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/actas/${nroActa}`);
      
      dispatch({
        type: GET_SECUESTRO_BY_NRO_ACTA,
        payload: data,
      });

      return data;
    } catch (error) {
      return { message: error.response?.data?.message || "Error al obtener los datos del servidor."};
    }
  };
};

export const getSecuestroByNroInventario = (nroInventario) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(
        `/secuestros/inventario/${nroInventario}`
      );
      dispatch({
        type: GET_SECUESTRO_BY_NRO_INVENTARIO,
        payload: data,
      });
      return data;
    } catch (error) {
      console.error(
        "Error al obtener secuestro por número de inventario:",
        error.response?.data || error.message
      );
    }
  };
};

export const updateSector = (info) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.put("/secuestros", info);
      dispatch({
        type: UPDATE_SECTOR,
        payload: data,
      });
      return data;
    } catch (error) {
      console.error(
        "Error al actualizar el sector:",
        error.response?.data || error.message
      );
    }
  };
};
export const updateEstado = (info) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.put("/secuestros/estado", info);
      dispatch({
        type: UPDATE_ESTADO,
        payload: data,
      });
      return data;
    } catch (error) {
      console.error(
        "Error al actualizar el estado:",
        error.response?.data || error.message
      );
    }
  };
};

export const actualizarFoto = (formData) => {
  
  return async (dispatch) => {
    try {
    
      // Verificar FormData antes de enviarlo
/*       console.log("FormData antes de enviar2:", formData);
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      } */

      const { data } = await axiosInstance.put("/secuestros/foto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({
        type: UPDATE_FOTO,
        payload: data,
      });

      return data; 
    } catch (error) {
      console.error("Error al actualizar la foto:", error.response?.data || error.message);
      throw error;
    }
  };
};

export const getRegistro = (info) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get("/secuestros/registro",{params :info});

      dispatch({
        type: GET_REGISTRO,
        payload: data,
      });
      return data

    } catch (error) {
      console.error(
        "Error al obtener los registros:",
        error.response?.data || error.message
      );
    }
  };
};

export const postEgreso = (formData) => {
  /* for (let [key, value] of formData.entries()) {
    console.log(key, value);
  } */
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.post("/egresos", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });

      dispatch({
        type: POST_EGRESO,
        payload: data,
      });
      
      return data;

    } catch (error) {
      console.error("Error al registrar el egreso:", error.response?.data || error.message);
      throw error;
    }
  };
};
export const postCompactado = (info) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.post("/compactados", info);
      dispatch({
        type: POST_COMPACTADO,
        payload: data,
      });
      return data
    } catch (error) {
      console.error(
        "Error al registrar la compactación:",
        error.response?.data || error.message
      );
    }
  };
};

export const getEgreso = (idSecuestro) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/egresos/${idSecuestro}`);
      dispatch({
        type: GET_EGRESO,
        payload: data,
      });
      return data
    } catch (error) {
      console.error(
        "Error al obtener los detalles del egreso:",
        error.response?.data || error.message
      );
    }
  };
};

export const getActasJuzgado = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/actas/juzgado`);
      dispatch({
        type: GET_ACTAS_JUZGADO,
        payload: data,
      });
      return data
    } catch (error) {
      console.error(
        "Error al obtener las actas de juzgado:",
        error.response?.data || error.message
      );
    }
  };
};
export const getTotalOfSecuestros = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/secuestros/total`);
      dispatch({
        type: GET_TOTAL_SECUESTROS,
        payload: data,
      });
      return data
    } catch (error) {
      console.error(
        "Error al obtener la cantidad total de secuestros",
        error.response?.data || error.message
      );
    }
  };
};
export const getVehiculosAcompactar = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/secuestros/a_compactar`);
      dispatch({
        type: GET_VEHICULOS_COMPACTAR,
        payload: data,
      });
      return data
    } catch (error) {
      console.error(
        "Error al obtener los vehículos a compactar",
        error.response?.data || error.message
      );
    }
  };
};

export const getLevantamientos = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/secuestros/levantamientos`);
      dispatch({
        type: GET_LEVANTAMIENTOS,
        payload: data,
      });
      return data
    } catch (error) {
      console.error(
        "Error al obtener los levantamientos",
        error.response?.data || error.message
      );
    }
  };
};

export const getIdSecuestroByNroActa = (nroActa) => async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/secuestros/id/${nroActa}`);
      return data;
    } catch (error) {
      console.error(
        "Error al obtener el id del secuestro por número de acta:",
        error.response?.data || error.message
      );
    }

};

export const getAllIngresados = (meses=24) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/secuestros/ingresados/${meses}`);
      dispatch({
        type: GET_ALL_INGRESADOS,
        payload: data,
      });
      return data
    } catch (error) {
      console.error(
        "Error al obtener los secuestros ingresados",
        error.response?.data || error.message
      );
    }
  };
};


export const consultarCompactacionJuzgado = (nroActa,lugar) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/actas/consulta?nroActa=${nroActa}&lugar=${lugar}`);
      dispatch({
        type: CONSULTAR_COMPACTACION,
        payload: data,
      });
      return data
    } catch (error) {
      console.error(
        "Error al obtener el resultado de la consulta sobre la compactación",
        error.response?.data || error.message
      );
    }
  };
};

export const actualizarEstadosCompactados = (finalData) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.put(`/secuestros/compactados`, { finalData });
      dispatch({
        type: UPDATE_COMPACTADOS,
        payload: data,
      });
      return data
    } catch (error) {
      console.error(
        "Error al actualizar los secuestros a 'Compactado'",
        error.response?.data || error.message
      );
      throw error;
    }
  };
};


export const actualizarEstadosAcompactar = (ids) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.put(`/secuestros/aCompactar`, { ids });
      dispatch({
        type: UPDATE_ACOMPACTAR,
        payload: data,
      });
      return data
    } catch (error) {
      console.error(
        "Error al actualizar los secuestros a 'A compactar'",
        error.response?.data || error.message
      );
      throw error;
    }
  };
};

export const actualizarEstadosDesconocido = (idsNoSeleccionados) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.put(`/secuestros/stockActual`, {
        ids: idsNoSeleccionados,
      });
      dispatch({
        type: PUT_ESTADOS_INGRESADOS,
        payload: data,
      });
      return data
    } catch (error) {
      console.error("Error al actualizar los estados", error.response?.data || error.message);
      throw error;
    }
  };
};

export const updateTipoUsuario = (info) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.put("/users/tipo", info);
      dispatch({
        type: UPDATE_TIPO_USUARIO,
        payload: data,
      });
      return data;
    } catch (error) {
      console.error(
        "Error al actualizar el tipo del usuario:",
        error.response?.data || error.message
      );
    }
  };
};



//-------------------Licencias----------------
export const searchLicencia = (dni) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/licencias/${dni}`);
       dispatch({
        type: SEARCH_LICENCIA,
        payload: data,
      });
      return data
    } catch (error) {
      console.error(
        "Error al buscar la licencia:",
        error.response?.data || error.message
      );
    }
  };
};

export const getLicencias = (page = 1, filter = "todas") => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(
        `/licencias/?page=${page}&filter=${filter}`
      );
      dispatch({
        type: FETCH_LICENCIAS,
        payload: data,
      });
      dispatch({
        type: FILTER_LICENCIA,
        payload: filter,
      });
      dispatch({
        type: UPDATE_PAGE_LICENCIAS,
        payload: page,
      });
      return;
    } catch (error) {
      console.error(
        "Error al obtener las licencias:",
        error.response?.data || error.message
      );
    }
  };
};

export const postLicencia = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.post("/licencias", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({
        type: POST_LICENCIA,
        payload: data,
      });

      return data;
    } catch (error) {
      console.error(
        "Error al registrar la licencia:",
        error.response?.data || error.message
      );
    }
  };
};
export const postEgresoLicencia = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.post("/licencias/egreso", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({
        type: POST_LICENCIA_EGRESO,
        payload: data,
      });

      return data;
    } catch (error) {
      console.error(
        "Error al registrar el egreso de la licencia:",
        error.response?.data || error.message
      );
      throw error;
    }
  };
};

export const getTotalOfLicencias = (filter= "todas") => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/licencias/total?filter=${filter}`);
      dispatch({
        type: GET_TOTAL_LICENCIAS,
        payload: data,
      });
      return data
    } catch (error) {
      console.error(
        "Error al obtener la cantidad total de licencias",
        error.response?.data || error.message
      );
    }
  };
};
export const getInfoEgreso = (dni) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/licencias/infoJuzgado/${dni}`);
      dispatch({
        type: GET_INFO_EGRESO,
        payload: data,
      });

      return data
    } catch (error) {
      console.error(
        "Error al obtener información de egreso sobre licencias",
        error.response?.data || error.message
      );
    }
  };
};
export const getEgresoLicencia = (idLicencia) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`licencias/egresada/${idLicencia}`);
      dispatch({
        type: GET_EGRESO_LICENCIA,
        payload: data,
      });

      return data
    } catch (error) {
      console.error(
        "Error al obtener información de la licencia egresada",
        error.response?.data || error.message
      );
    }
  };
};

export const setIngresoLicencia = (data) => {
  try {
    return {
      type: INGRESO_LICENCIA,
      payload: data,
    };
  } catch (error) {
    console.log(error);
  }
};
export const setFotoLicencia = (data) => {
  try {
    return {
      type: FOTO_LICENCIA,
      payload: data,
    };
  } catch (error) {
    console.log(error);
  }
};
export const limpiarFotoLicencia = () => {
  try {
    return {
      type: LIMPIAR_FOTO_LICENCIA,
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateFotoLicencia = (formData) => {
  
  return async (dispatch) => {
    try {
      
      // Verificar FormData antes de enviarlo
/*       console.log("FormData antes de enviar2:", formData);
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      } */

      const { data } = await axiosInstance.put("/licencias", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({
        type: UPDATE_FOTO_LICENCIA,
        payload: data,
      });

      return data;
    } catch (error) {
      console.error("Error al actualizar la foto de la licencia:", error.response?.data || error.message);
      throw error;
    }
  };
};