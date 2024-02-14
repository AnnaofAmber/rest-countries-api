import { configureStore } from '@reduxjs/toolkit';
import { countriesReducer } from './countriesSlice';
import { paginationReducer } from './paginationSlice';
import { filterByRegionReducer } from './filterRegionSlice';

export const store = configureStore({
  reducer: 
 {countries: countriesReducer,
pagination: paginationReducer,
filterByRegion: filterByRegionReducer}
});