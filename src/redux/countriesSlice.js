import { createSlice } from "@reduxjs/toolkit";


const initialCountriesState = {
    countries: {
        items: [],
    }
}

const countriesSlice = createSlice({
name: 'countries',
initialState:initialCountriesState.countries,
reducers:{
    setCountries(state, action){
        state.items = action.payload
    }
}
})

export const {setCountries} = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;