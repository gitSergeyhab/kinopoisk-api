import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { resetFilter } from '../../store/action';
import { AppRoute } from '../app/app';

import './header.css';


const ACTIVE_LINK_CLASS = 'react-header__link--active';
export default function Header() {

  const {pathname} = useLocation();

  const dispatch = useDispatch();

  const handleLinkClick = () => dispatch(resetFilter());
  return (
    <nav style={{marginBottom: '1rem'}}>
      <div className="nav-wrapper grey darken-4 white-text">
        <Link to={AppRoute.Films} className='react-header__logo' onClick={handleLinkClick}>Kinopoisk-API</Link>

        <ul className="right hide-on-med-and-down">

          <li><Link to={AppRoute.Films} className={pathname === AppRoute.Films ? ACTIVE_LINK_CLASS : ''} onClick={handleLinkClick}>Главная</Link></li>
          <li><Link to={AppRoute.Watched} className={pathname === AppRoute.Watched ? ACTIVE_LINK_CLASS : ''} onClick={handleLinkClick}>Просмотренные фильмы</Link></li>
        </ul>
      </div>
    </nav>

  );}

