import { configureStore } from '@reduxjs/toolkit';

import authAPI from './reducers/authApi';
import productAPI from './reducers/productApi';
import userAPI from './reducers/userApi';

import productSlice from './reducers/productSlice';

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPI.middleware, productAPI.middleware, userAPI.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;