import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { countriesReducer } from './countriesSlice';
import { paginationReducer } from './paginationSlice';
import { filterByRegionReducer } from './filterRegionSlice';
import { borderCountriesReducer } from './borderCountriesSlice';
import { themeReducer } from './themeSlice';

// export const store = configureStore({
//   reducer:
//  {countries: countriesReducer,
// pagination: paginationReducer,
// filterByRegion: filterByRegionReducer,
// borderCountries:borderCountriesReducer,
// theme: themeReducer
// }
// });

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const themeConfig = {
  key: 'theme',
  storage,
};
const pageConfig = {
  key: 'page',
  storage,
};

export const rootReducer = combineReducers({
  countries: countriesReducer,
  pagination: persistReducer(pageConfig, paginationReducer),
  filterByRegion: filterByRegionReducer,
  borderCountries: borderCountriesReducer,
  theme: persistReducer(themeConfig, themeReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
