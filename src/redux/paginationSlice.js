// import { createSlice } from "@reduxjs/toolkit";
// import { fetchAllCountries } from "./operations";

// const handlePending = state => {
//     state.isLoading = true;
//   };
  
//   const handleRejected = (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   };

// const initialCountriesState = {
//     countries: {
//         items: [],
//         isLoading: false,
//         error: null,
//     }
// }

// const countriesSlice = createSlice({
// name: 'countries',
// initialState:initialCountriesState.countries,
// reducers:{
//     setCountries(state, action){
//         state.items = action.payload
//     }
// }, extraReducers:
// builder =>
// {
//  builder
//  .addCase(fetchAllCountries.pending, handlePending)
//  .addCase(fetchAllCountries.fulfilled, (state, action)=> {
//    state.isLoading = false;
//    state.error = null;
//    state.items = action.payload;
//  })
//  .addCase(fetchAllCountries.rejected, handleRejected)
// }

// })

// export const {setCountries} = countriesSlice.actions;
// export const countriesReducer = countriesSlice.reducer;