import scss from './SearchBar.module.scss'
import {ReactComponent as Search} from '../../images/icons/search.svg'
export const SearchBar = () => {
    return(
       <form className={scss.form}>
        <label htmlFor="country-name"></label>
        <button className={scss['btn-search']}><Search/></button>
        <input className={scss.input} id='country-name' name='searchCountryName' type="text" placeholder='Search for a country...' />
       </form>
    )
}