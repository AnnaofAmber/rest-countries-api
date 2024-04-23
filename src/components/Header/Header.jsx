import scss from './Header.module.scss';
import { ReactComponent as Theme } from '../../images/icons/theme.svg';
import { Link, NavLink } from 'react-router-dom';
export const Header = ({location}) => {
  return (
    <header className={scss.header}>
      <NavLink className={scss.title} to={`/`}>Where in the world?</NavLink>
      <div className={scss['theme-container']}>
        {' '}
        <Theme className={scss['theme-icon']}/>
        <p className={scss.theme}>Dark Mode</p>
      </div>
    </header>
  );
};
