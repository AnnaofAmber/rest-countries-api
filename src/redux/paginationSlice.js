import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    pagination: {
        items: [],
        page: 0
    }
}

const paginationSlice = createSlice({
name: 'pagination',
initialState:initialState.pagination,
reducers:{
    setPagination(state, action){
        state.items = action.payload
    },
    setPage(state,action){
        state.page = action.payload
    }
}
})

export const {setPagination, setPage} = paginationSlice.actions;
export const paginationReducer = paginationSlice.reducer;
