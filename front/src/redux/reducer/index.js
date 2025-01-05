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
  infracciones:[],
  /* oficioPolicial:{}, */
  ingresoDetalles:{},
  ingresoFoto:'',
  datosConfirmarIngreso:{},
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
      return { ...state, datosConfirmarIngreso:{
         
        vehiculoDominio:action.payload.dominio, 
        vehiculoTipo:action.payload.tipovh, 
        vehiculoMarca:action.payload.marcavh, 
        vehiculoModelo:action.payload.modelovh, 
        infractorNombre:action.payload.nombreCompleto, 
        infractorDni:action.payload.dni, 
        infractorCuil:action.payload.cuil, 
        infractorSexo:action.payload.sexo, 
        infracciones:action.payload.infracciones
        
      } };
    case INGRESO_DETALLES:
      return { ...state, ingresoDetalles: action.payload };
    case INGRESO_FOTO:
      return { ...state, ingresoFoto: action.payload };
    case SEARCH_ACTA:
      return { ...state, datosConfirmarIngreso:{
        actaNro:action.payload.acta.nro,
        actaInspector:action.payload.acta.inspector, 
        actaLugar:action.payload.acta.lugar, 
        actaFecha_hora:action.payload.acta.fecha_hora, 
        vehiculoDominio:action.payload.vehiculo.dominio, 
        vehiculoTipo:action.payload.vehiculo.tipovh, 
        vehiculoMarca:action.payload.vehiculo.marcavh, 
        vehiculoModelo:action.payload.vehiculo.modelovh, 
        infractorNombre:action.payload.infractor.nombreCompleto, 
        infractorDni:action.payload.infractor.dni, 
        infractorCuil:action.payload.infractor.cuil, 
        infractorSexo:action.payload.infractor.sexo, 
        infracciones:action.payload.infracciones.map(item => ({
          descrip: item.Infraccione.descrip,
          digesto: item.Infraccione.digesto
        }))
        
      }
      }
    default:
      return { ...state };
  }
};
