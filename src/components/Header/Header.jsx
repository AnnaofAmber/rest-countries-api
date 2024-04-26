import { useDispatch, useSelector } from 'react-redux';
import scss from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { setTheme } from '../../redux/themeSlice';
import { getTheme } from '../../redux/selectors';
import clsx from 'clsx';
export const Header = () => {
  const theme = useSelector(getTheme);
  const dispatch = useDispatch();
  const handleThemeChange = theme => dispatch(setTheme(theme));

  return (
    <header
      className={clsx(scss.header, {
        [scss.dark]: theme,
      })}
    >
      <NavLink className={scss.title} to={`/`}>
        Where in the world?
      </NavLink>
      <div className={scss['theme-container']}>
        {' '}
        {theme ? (
          <input
            checked
            className={scss['theme-input-icon']}
            type="checkbox"
            id="theme"
            onChange={() => handleThemeChange(!theme)}
          />
        ) : (
          <input
          checked={false}
            className={scss['theme-input-icon']}
            type="checkbox"
            id="theme"
            onChange={() => handleThemeChange(!theme)}
          />
        )}
        <label className={scss.theme} htmlFor="theme">
          Dark Mode
        </label>
      </div>
    </header>
  );
};
