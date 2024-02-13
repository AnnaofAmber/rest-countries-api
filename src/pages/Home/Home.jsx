import scss from './Home.module.scss'
// import { fetchAllCountries } from "api/countries-api"

import { CountryList } from "components/CountryList/CountryList";
import { SearchBar } from 'components/SearchBar/SearchBar';
import Notiflix from "notiflix";
import { useEffect, useState } from "react"
// import { useSelector } from 'react-redux';
// import { getCountries } from '../../redux/selectors';
import { fetchAllCountries } from '../../redux/operations';

const Home = () => {
const [countries, setCountries] = useState([])
const [isLoading, setIsLoading] = useState(false);
const [apiError, setApiError] = useState(false);


useEffect(()=>{
    const fetchCountries = async() =>{
    try{
        setIsLoading(true);
        const response = await fetchAllCountries()
        if(countries.length === 0){
            setCountries(response)
        }
    }
    catch(error){
        setApiError(true);
                Notiflix.Notify.failure(
          `Oops! Something went wrong! Error ${apiError} Try reloading the page!`
        );
    }
    finally {
        setIsLoading(false);

      }
}
fetchCountries()

}, [ apiError, countries, isLoading])
// const countries = useSelector(getCountries)
// console.log(countries);
    return(
        <div className={scss.container}>
            <SearchBar/>
            <CountryList data = {countries}/>
        </div>
    )
}
export default Home