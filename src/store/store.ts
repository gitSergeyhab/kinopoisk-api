import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {queryApi} from '../services/query-api';
import { localDbReducer } from './local-db-reducer/local-db-reducer';
import { popupReducer } from './popup-reducer/popup-reducer';

export const enum ReducerNames {
  LocalDb = 'LocalDb',
  Popup = 'Popup',
}

export const rootReducer = combineReducers({
  [queryApi.reducerPath]: queryApi.reducer,
  [ReducerNames.LocalDb]: localDbReducer,
  [ReducerNames.Popup]: popupReducer,

});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(queryApi.middleware),
});

export type ReducerState = ReturnType<typeof rootReducer>;
