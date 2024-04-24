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

export const fetchCountryByNameSearch = async query => {
    const {data} = await axios.get(`/name/${query}`)
    
        return data

    
}


export const fetchCountryByName = async query => {
    const {data} = await axios.get(`/name/${query}`)
    if(data.length>1){
        for(let i =0; i<data.length; i+=1){
            if(data[i].name.official===query){
                console.log('asd');
                return [data[i]]
            }
        }
    }
        return data
    
}

export const fetchCountryByCioc = async cioc => {
    let result =[]
for(let i =0;  i<cioc.length; i+=1){
    const {data} = await axios.get(`/alpha/${cioc[i]}`)
    result.push(...data)
    }
return result
}
