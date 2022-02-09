import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {queryApi} from '../services/query-api';
import { filterReducer } from './filter-reducer/filter-reducer';
import { localDbReducer } from './local-db-reducer/local-db-reducer';

export const enum ReducerNames {
  Filter = 'Filter',
  LocalDb = 'LocalDb',
}

export const rootReducer = combineReducers({
  [queryApi.reducerPath]: queryApi.reducer,
  [ReducerNames.Filter]: filterReducer,
  [ReducerNames.LocalDb]: localDbReducer,

});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(queryApi.middleware),
});

export type ReducerState = ReturnType<typeof rootReducer>;
