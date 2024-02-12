import { fetchAllCountries } from "api/countries-api"
import { CountryList } from "components/CountryList/CountryList";
import Notiflix from "notiflix";
import { useEffect, useState } from "react"

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

}, [ apiError, countries])

    return(
        <div>
            <CountryList data = {countries}/>
        </div>
    )
}
export default Home