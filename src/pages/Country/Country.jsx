import { fetchCountryByName } from "api/country-api";
import Notiflix from "notiflix";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom"
import scss from './Country.module.scss'
import { Loader } from "components/Loader/Loader";

const Country = () => {
const {name} = useParams()
const [countryDetails, setCountryDetails] = useState()
const [isLoading, setIsLoading] = useState(false);
const [apiError, setApiError] = useState(false);

let nativeNameOfficial
let currencies
let languages = []

useEffect(()=>{
    const fetchByName = async () => {
        try {
          setIsLoading(true);
          const result = await fetchCountryByName(name);
          if (result.length === 0) {
            Notiflix.Notify.failure(
              `Oops! Seems like we do not have country with a name ${name}!`
            );
          } else {

            setCountryDetails(result);

          }
        } catch (error) {
          setApiError(true);
          Notiflix.Notify.failure(
            `Oops! Something went wrong! Error ${apiError} Try reloading the page!`
          );
        } finally {
          setIsLoading(false);
        }
      }
      fetchByName()
}, [apiError, name,])
if(countryDetails){
  for(const key in countryDetails[0].name.nativeName){
    nativeNameOfficial = countryDetails[0].name.nativeName[key].official
  }
  for(const key in countryDetails[0].currencies){
    currencies = countryDetails[0].currencies[key].name
  }
  for(const key in countryDetails[0].languages){
    languages.push(countryDetails[0].languages[key])
  }

}
    return(
        <div >
            {isLoading && <Loader/>}
{countryDetails &&  <div className={scss.container} key={name}>
 {countryDetails.map(({name, region, flags, population, subregion, capital, tld})=>
 
                (

                <section key={name} className={scss['section-country']}>
                    <img className={scss['country-flag']} src={flags.png} alt={flags.alt} />
                    <h2 className={scss['country-name']}>{name.common}</h2>
<div className={scss['country-info-main']}>
<p>Native Name: <span className={scss['country-info']}>{nativeNameOfficial}</span> </p> 
                    <p>Population: <span className={scss['country-info']}>{population.toLocaleString('en-En')}</span></p>
                    <p>Region: <span className={scss['country-info']}>{region}</span>  </p>
                    <p>Sub Region: <span className={scss['country-info']}>{subregion}</span></p>
                    {capital?<p>Capital: <span className={scss['country-info']}>{capital}</span></p>: <p>Capital: <span className={scss['country-info']}>None</span></p> }
</div>
               <div>
               <p>Top Level Domain: <span className={scss['country-info']}>{tld}</span></p>
                     <p>Currencies: <span className={scss['country-info']}>{currencies}</span></p>
                    <p>Languages: <span className={scss['country-info']}>{ languages.join(', ')}</span></p> 
               </div>
                    <p>Border Countries: </p>
                </section>))
            }
 </div>}

        </div>

    )
}

export default Country