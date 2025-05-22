import {
  FETCH_LICENCIAS,
  FETCH_SECUESTROS,
  FILTER_LICENCIA,
  FILTER_SECUESTRO,
  FOTO_LICENCIA,
  GET_ALL_INFRACCIONES,
  GET_ALL_SECUESTROS,
  GET_ALL_VEHICULOS,
  GET_DETAIL_SECUESTRO,
  INGRESO_DETALLES,
  INGRESO_FOTO,
  INGRESO_LICENCIA,
  LIMPIAR_FOTO,
  LIMPIAR_FOTO_LICENCIA,
  LOGIN,
  OFICIO_POLICIAL,
  /* SEARCH_ACTA, */
  SEARCH_LICENCIA,
  SET_AUTHENTICATED,
  UP_ACTA,
  UPDATE_PAGE,
  UPDATE_PAGE_LICENCIAS,
  UPDATE_TOTAL_PAGES,
  UPDATE_TOTAL_SECUESTROS,
  VEHICLE_TYPE,
} from "../actions";

const initialState = {
  secuestros: [],
  vehiculos: [],
  currentPage: 1,
  totalPages: 1,
  totalSecuestros: 0,
  detail: {},
  infracciones: [],
  ingresoDetalles: {},
  ingresoFoto: "",
  datosConfirmarIngreso: {},
  currentUserId: 0,
  tipoCurrentUser: 0,
  isAuthenticated: false,
  selectedFilter: "todos",
  vehicleType: "todos",

  licencias: [],
  licenciaFound: null,
  selectedFilterlicencias: "todos",
  currentPageLicencia: 1,
  dataIngresoLicencia: {},
  fotoLicencia: null,
  selectedFilterLicencia: "todas",
  totalPagesLicencias: 1,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SECUESTROS:
      return { ...state, secuestros: action.payload };
    case UPDATE_PAGE:
      return { ...state, currentPage: action.payload };
    case UPDATE_TOTAL_PAGES:
      return { ...state, totalPages: action.payload };
    case UPDATE_TOTAL_SECUESTROS:
      return { ...state, totalSecuestros: action.payload };
    case FILTER_SECUESTRO:
      return { ...state, selectedFilter: action.payload };
    case VEHICLE_TYPE:
      return { ...state, vehicleType: action.payload };
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
          /* infracciones: action.payload.infracciones, */
        },
      };
    case INGRESO_DETALLES:
      return { ...state, ingresoDetalles: action.payload };
    case INGRESO_FOTO:
      return { ...state, ingresoFoto: action.payload };
    case LIMPIAR_FOTO:  // Nueva acción
      return { ...state, ingresoFoto: null };
    /* case SEARCH_ACTA:
      const fechaHoraFinal1 = `${action.payload.fecha}, ${action.payload.hora}`;
      return {
        ...state,

        datosConfirmarIngreso: {
          actaNro: action.payload.nroActa,
          actaInspector: action.payload.inspector,  // Este inspector es un string (nombre)
          actaLugar: action.payload.lugar,
          actaFecha_hora: fechaHoraFinal,
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
      }; */
    case UP_ACTA:
      // Concatenamos ambos valores
      const fechaHoraFinal = `${action.payload.fecha}, ${action.payload.hora}`;
      return {
        ...state,

        datosConfirmarIngreso: {

          actaId: action.payload.id,

          actaNro: action.payload.nroActa,
          /* actaInspector: action.payload.inspector, */ // Este inspector es un string (nombre)
          actaLugar: action.payload.lugar,
          actaFecha_hora: fechaHoraFinal,
          vehiculoDominio: action.payload.vehiculo.dominio,
          vehiculoTipo: action.payload.vehiculo.tipo,
          vehiculoMarca: action.payload.vehiculo.marca,
          vehiculoModelo: action.payload.vehiculo.modelo,
          infractorNombre: action.payload.infractor?.nombre,
          infractorDni: action.payload.infractor?.dni,
          /* infractorCuil: action.payload.infractor?.cuilcuit, */ //No trae cuil
          /* infractorSexo: action.payload.infractor?.sexo, */ //No trae sexo
          infracciones: action.payload.infracciones.map((item) => ({ //Cuando es por búsqueda es payload.infracciones y cuando es por botón es payload.infraccion
            descrip: item.descripcion,
            digesto: item.digesto,
          })),
        },
      };
    case LOGIN:
      return {
        ...state,
        currentUserId: action.payload.userId,
        tipoCurrentUser: action.payload.tipo,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload, // Actualiza el estado de autenticación
      };


      case FETCH_LICENCIAS:
        return { ...state, licencias: action.payload };  
      case SEARCH_LICENCIA:
        return { ...state, licenciaFound: action.payload };  
      case FILTER_LICENCIA:
        return { ...state, selectedFilterLicencia: action.payload };  
      case UPDATE_PAGE_LICENCIAS:
      return { ...state, currentPageLicencia: action.payload };
    case INGRESO_LICENCIA:
      return { ...state, dataIngresoLicencia: action.payload };
    case FOTO_LICENCIA:
      return { ...state, fotoLicencia: action.payload };
    case LIMPIAR_FOTO_LICENCIA:
      return { ...state, fotoLicencia: null };
    default:
      return { ...state };
  }
};
