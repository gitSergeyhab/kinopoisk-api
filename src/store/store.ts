import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {queryApi} from '../services/query-api';
import { filterReducer } from './filter-reducer/filter-reducer';

export const enum ReducerNames {
  Filter = 'Filter',
}

export const rootReducer = combineReducers({
  [queryApi.reducerPath]: queryApi.reducer,
  [ReducerNames.Filter]: filterReducer,

});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(queryApi.middleware),
});

export type ReducerState = ReturnType<typeof rootReducer>;
