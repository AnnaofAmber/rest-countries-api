import { configureStore } from '@reduxjs/toolkit';
import { countriesReducer } from './countriesSlice';
import { paginationReducer } from './paginationSlice';

export const store = configureStore({
  reducer: 
 {countries: countriesReducer,
pagination: paginationReducer}
});