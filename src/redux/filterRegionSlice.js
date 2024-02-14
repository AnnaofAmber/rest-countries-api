import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    filterByRegion: {
        items: null,
    }
}

const filterByRegionSlice = createSlice({
name: 'filterByRegionSlice',
initialState:initialState.filterByRegion,
reducers:{
    setFilterByRegion(state, action){
        state.items = action.payload
    }
}
})

export const {setFilterByRegion} = filterByRegionSlice.actions;
export const filterByRegionReducer = filterByRegionSlice.reducer;