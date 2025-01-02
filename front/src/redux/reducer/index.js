import {
  GET_ALL_INFRACCIONES,
  GET_ALL_SECUESTROS,
  GET_ALL_VEHICULOS,
  GET_DETAIL_SECUESTRO,
  INGRESO_DETALLES,
  INGRESO_FOTO,
  OFICIO_POLICIAL,
  UPDATE_PAGE,
} from "../actions";

const initialState = {
  secuestros: [],
  vehiculos: [],
  pagina: 1,
  detail: {},
  infracciones:[],
  oficioPolicial:{},
  ingresoDetalles:{},
  ingresoFoto:'',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return { ...state, secuestros: action.payload };
    case GET_DETAIL_SECUESTRO:
      return { ...state, detail: action.payload };

    case GET_ALL_VEHICULOS:
      return { ...state, vehiculos: action.payload };
    case GET_ALL_SECUESTROS:
      return { ...state, secuestros: action.payload };
    case GET_ALL_INFRACCIONES:
      return { ...state, infracciones: action.payload };
    case OFICIO_POLICIAL:
      return { ...state, oficioPolicial: action.payload };
    case INGRESO_DETALLES:
      return { ...state, ingresoDetalles: action.payload };
    case INGRESO_FOTO:
      return { ...state, ingresoFoto: action.payload };

    default:
      return { ...state };
  }
};
