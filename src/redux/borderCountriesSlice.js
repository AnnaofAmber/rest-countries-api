import { createSlice } from "@reduxjs/toolkit";


const initialBorderCountriesState = {
    borderCountries: {
        items: [],
    }
}

const borderCountriesSlice = createSlice({
name: 'borderCountries',
initialState:initialBorderCountriesState.borderCountries,
reducers:{
    setBorderCountries(state, action){
        state.items = action.payload
    }
}
})

export const {setBorderCountries} = borderCountriesSlice.actions;
export const borderCountriesReducer = borderCountriesSlice.reducer;