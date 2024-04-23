import scss from './SearchBar.module.scss'
import {ReactComponent as Search} from '../../images/icons/search.svg'
export const SearchBar = ({handleSubmit, r}) => {
    return(
       <form className={scss.form} onSubmit={handleSubmit}>
        <label htmlFor="country-name"></label>
        <button className={scss['btn-search']} type='submit'><Search/></button>
        <input ref={r} className={scss.input} id='country-name' name='searchCountryName' type="text" placeholder='Search for a country...' />
       </form>
    )
}