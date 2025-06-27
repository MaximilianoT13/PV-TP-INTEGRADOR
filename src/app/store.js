import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import usersReducer from './usersSlice'
export const store = configureStore({
  reducer: {
    products: productsReducer,
      auth: usersReducer,
  },
});

