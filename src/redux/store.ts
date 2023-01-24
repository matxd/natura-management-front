import { configureStore } from '@reduxjs/toolkit';

import authAPI from './reducers/authSlice';
import productAPI from './reducers/productSlice';

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPI.middleware, productAPI.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch