import axios from 'axios'


axios.defaults.baseURL = 'https://restcountries.com/v3.1'

export const fetchAllCountries = async() => {
const {data} = await axios.get( `/all`)
return data
}

export const fetchCountriesByRegion = async region =>{
const {data} = await axios.get(`/region/${region}`)
return data
}

export const fetchCountryByName = async query => {
    const {data} = await axios.get(`/name/${query}`)
    return data
}

