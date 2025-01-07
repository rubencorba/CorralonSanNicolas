import {
  GET_ALL_INFRACCIONES,
  GET_ALL_SECUESTROS,
  GET_ALL_VEHICULOS,
  GET_DETAIL_SECUESTRO,
  INGRESO_DETALLES,
  INGRESO_FOTO,
  OFICIO_POLICIAL,
  SEARCH_ACTA,
  UPDATE_PAGE,
} from "../actions";

const initialState = {
  secuestros: [],
  vehiculos: [],
  pagina: 1,
  detail: {},
  infracciones: [],
  ingresoDetalles: {},
  ingresoFoto: "",
  datosConfirmarIngreso: {},
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
      return {
        ...state,
        datosConfirmarIngreso: {
          vehiculoDominio: action.payload.dominio,
          vehiculoTipo: action.payload.tipovh,
          vehiculoMarca: action.payload.marcavh,
          vehiculoModelo: action.payload.modelovh,
          infractorNombre: action.payload.nombreCompleto,
          infractorDni: action.payload.dni,
          infractorCuil: action.payload.cuil,
          infractorSexo: action.payload.sexo,
          infracciones: action.payload.infracciones,
        },
      };
    case INGRESO_DETALLES:
      return { ...state, ingresoDetalles: action.payload };
    case INGRESO_FOTO:
      return { ...state, ingresoFoto: action.payload };
    case SEARCH_ACTA:
     
      return {
        ...state,
        
        datosConfirmarIngreso: {
          actaNro: action.payload.acta.nroActa,
          actaInspector: action.payload.acta.inspector,
          actaLugar: action.payload.acta.lugar,
          actaFecha_hora: action.payload.acta.fecha,
          vehiculoDominio: action.payload.acta.vh_dominio,
          vehiculoTipo: action.payload.acta.vh_tipo,
          vehiculoMarca: action.payload.acta.vh_marca,
          vehiculoModelo: action.payload.acta.vh_modelo,
          infractorNombre: action.payload.infractor?.apelnmb,
          infractorDni: action.payload.infractor?.nrodoc,
          infractorCuil: action.payload.infractor?.cuilcuit,
          infractorSexo: action.payload.infractor?.sexo,
          infracciones: action.payload.acta.infracciones_array.map((item) => ({
            descrip: item.des,
            digesto: item.diges,
          })),
        },
      };

    default:
      return { ...state };
  }
};
