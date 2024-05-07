import scss from './SearchBar.module.scss'
import {ReactComponent as Search} from '../../images/icons/search.svg'
import { useSelector } from 'react-redux'
import { getTheme } from '../../redux/selectors'
import clsx from 'clsx'
export const SearchBar = ({handleSubmit, refQuery}) => {
    const theme = useSelector(getTheme)
    return(
       <form className={clsx(scss.form, {
        [scss.dark]:theme
       } )} onSubmit={handleSubmit}>
        <label htmlFor="country-name"></label>
        <button aria-label='search' className={scss['btn-search']} type='submit'><Search/></button>
        <input ref={refQuery} className={scss.input} id='country-name' name='searchCountryName' type="text" placeholder='Search for a country...' />
       </form>
    )
}