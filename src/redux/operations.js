// import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// const BASE_URL = 'https://restcountries.com/v3.1/'
axios.defaults.baseURL = 'https://restcountries.com/v3.1'
export const fetchAllCountries = async() => {
const {data} = await axios.get( `/all`)
return data
}


// export const fetchAllCountries = createAsyncThunk(
// '', async(_, thunkAPI) => {
//     try{
// const {data} = await axios.get( `/all`)
// console.log(data);
// return data  
//     }
//     catch(error){
//         return thunkAPI.rejectWithValue(error.message)
//     }
// }
// )
