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
export const GET_SECUESTRO_BY_NRO_INVENTARIO =
  "GET_SECUESTRO_BY_NRO_INVENTARIO";
export const UPDATE_SECTOR = "UPDATE_SECTOR";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const FILTER_SECUESTRO = "FILTER_SECUESTRO";
export const FETCH_SECUESTROS = "FETCH_SECUESTROS";
export const GET_REGISTRO = "GET_REGISTRO";
export const UPDATE_FOTO = "UPDATE_FOTO";
export const POST_EGRESO = "POST_EGRESO";
export const GET_EGRESO = "GET_EGRESO";

export const getSecuestros = (page = 1, filter = "todos") => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(
        `/secuestros/?page=${page}&filter=${filter}`
      );
      dispatch({
        type: FETCH_SECUESTROS,
        payload: data,
      });
      dispatch({
        type: FILTER_SECUESTRO,
        payload: filter,
      });
      dispatch({
        type: UPDATE_PAGE,
        payload: page,
      });
      return;
    } catch (error) {
      console.error(
        "Error al obtener los secuestros:",
        error.response?.data || error.message
      );
    }
  };
};

/* export const updatePage = (page) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/secuestros/?page=${page}`);
      return dispatch({
        type: UPDATE_PAGE,
        payload: data,
      });
    } catch (error) {
      console.error("Error al actualizar la página:", error.response?.data || error.message);
    }
  };
};
export const filterSecuestros = (filter) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(`/secuestros/?filter=${filter}`);
      return dispatch({
        type: FILTER_SECUESTRO,
        payload: data,
      });
    } catch (error) {
      console.error("Error al filtrar los secuestros:", error.response?.data || error.message);
    }
  };
}; */

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
/* export const getAllSecuestros = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.get("/secuestros"); // No necesitas agregar headers manualmente
      return dispatch({
        type: GET_ALL_SECUESTROS,
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener los secuestros:", error.response?.data || error.message);
    }
  };
}; */
/* export const getAllSecuestros = () => {
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
}; */
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
  return async (dispatch) => {
    try {
      // Si no se proporciona un nroInventario, solo hace el dispatch
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

      return data; // Devuelve la respuesta del backend
    } catch (error) {
      console.error(
        "Error al validar el nroInventario:",
        error.response?.data || error.message
      );
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
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.post("/secuestros", info);
      dispatch({
        type: POST_SECUESTRO,
        payload: data,
      });
      return data
    } catch (error) {
      console.error(
        "Error al registrar el secuestro:",
        error.response?.data || error.message
      );
    }
  };
};

export const searchActa = (nroActa) => {
  return async (dispatch) => {
    try {
      //Busco el acta en juzgado
      const endpoint = `https://actas.movisn.com/transito/actaByNro/${nroActa}`;
      const { data } = await axios.get(endpoint);
      //Si no se encuentra el acta
      if (!data.length) throw new Error("Ese número de acta no existe");
      //Verifico si el acta no fue ingresada al corralón
      const ingresada = await axiosInstance.get(`/actas/${nroActa}`);
      if (ingresada.data !== "") return ingresada.data;
      //Busco los datos del infractor en caso de tenerlo
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

export const postNewUser = (info) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.post("/users", info);

      if (data.error) return data; // Devuelve el error si el backend lo envía

      return dispatch({
        type: POST_USER,
        payload: data,
      });
    } catch (error) {
      console.error(
        "Error al registrar un nuevo usuario:",
        error.response?.data || error.message
      );
    }
  };
};

export const login = (info) => {
  return async (dispatch) => {
    try {
      // En el caso de login, usamos axios sin instancia personalizada
      const { data } = await axios.post(
         "http://localhost:3001/users/login",
        /* "https://testing.sannicolas.gob.ar/corralon/users/login", */
        info
      );

      console.log("data:", data);

      // Guardar el token en localStorage
      localStorage.setItem("token", data.token);

      dispatch({
        type: LOGIN,
        payload: {
          userId: data.userId,
          tipo: data.tipo,
        },
      });

      // Despachar una acción para marcar que el usuario está autenticado
      dispatch({
        type: SET_AUTHENTICATED,
        payload: true, // El usuario está autenticado
      });

      return data; // Devolvemos los datos por si el flujo requiere validaciones adicionales
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
      return data; // Devuelve los datos por si se necesita mostrar algo en el frontend
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
      console.error(
        "Error al obtener secuestro por dominio:",
        error.response?.data || error.message
      );
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
      console.error(
        "Error al obtener secuestro por número de acta:",
        error.response?.data || error.message
      );
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
      return data; // Devuelve los datos en caso de ser necesarios
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
      return data; // Devuelve los datos para luego avisar si hubo éxito
    } catch (error) {
      console.error(
        "Error al actualizar el sector:",
        error.response?.data || error.message
      );
    }
  };
};
export const actualizarFoto = (info) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.put("/secuestros/foto", info);
      return dispatch({
        type: UPDATE_FOTO,
        payload: data,
      });
       // Devuelve los datos para luego avisar si hubo éxito
    } catch (error) {
      console.error(
        "Error al actualizar la foto:",
        error.response?.data || error.message
      );
    }
  };
};

export const getRegistro = (info) => {
  return async (dispatch) => {
    try {

      console.log(info)

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


export const postEgreso = (info) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.post("/egresos", info);
      dispatch({
        type: POST_EGRESO,
        payload: data,
      });
      return data
    } catch (error) {
      console.error(
        "Error al registrar el egreso:",
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
