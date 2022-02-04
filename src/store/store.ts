import {configureStore} from '@reduxjs/toolkit';

import {queryApi} from '../services/query-api';

export const store = configureStore({
  reducer: {
    [queryApi.reducerPath]: queryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(queryApi.middleware),
});
