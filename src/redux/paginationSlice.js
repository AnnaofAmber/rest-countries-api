import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    pagination: {
        items: [],
    }
}

const paginationSlice = createSlice({
name: 'pagination',
initialState:initialState.pagination,
reducers:{
    setPagination(state, action){
        state.items = action.payload
    }
}
})

export const {setPagination} = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;