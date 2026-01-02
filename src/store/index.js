import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import favoriteReducer from './favoriteSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    favorites: favoriteReducer,
  },
});