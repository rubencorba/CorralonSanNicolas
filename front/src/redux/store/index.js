import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk'; // No es necesario destructurar `{ thunk }`
import { reducer } from '../reducer/index.js';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa localStorage para persistir el estado

const persistConfig = {
  key: 'root', // Clave base para almacenar en localStorage
  storage, // Define que se usará localStorage
  whitelist: ['tipoCurrentUser', 'currentUserId'], // Solo se persiste este estado, evita guardar todo el store
};

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer, // Usa el reducer con persistencia
  composeEnhancer(applyMiddleware(thunk))
);

export const persistor = persistStore(store); // Crea el persistor para manejar la persistencia
