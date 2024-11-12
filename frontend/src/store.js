import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import { configureStore } from '@reduxjs/toolkit';

// redux toolkit store config
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
