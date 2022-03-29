import react from 'react';
import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux'
import menuPath from '../../images/menu.png'
import blackMenuPath from '../../images/menu-black.png'
import logoutPath from '../../images/logout-white.png'
import blackLogoutPath from '../../images/logout.png'
import './Nav.css';


function Nav(props) {
  const [isDesktop, setIsDesktop] = React.useState(false);

  const { currentUser } = useSelector(state => state);

  react.useEffect(() => {
    const updatePredicate = () => {
      setIsDesktop(window.matchMedia('(min-width: 492px)').matches)
    }
    updatePredicate();
    window.addEventListener('resize', updatePredicate);

    return () => window.removeEventListener('resize', updatePredicate);
  },[])

  if (props.isPopup) {
    return (
      <nav className='popup__nav-holder'>
        <Link className='header__white-navigation-button' onClick={props.onClose} to='/'>Home</Link>
        {!props.isLoggedIn && <button type='button' onClick={props.handleOpenPopupSignup} className='header__signin-button header__signin-button_type_nav'>Sign in</button>}
        {props.isLoggedIn && <Link className='header__white-navigation-button' to='/saved-news' onClick={props.onClose}>Saved articles</Link>}
        {props.isLoggedIn &&
        <button onClick={props.handleLogout} type='button' className='header__logout-button header__signin-button_type_nav'>
          {currentUser.name}
          <img className='header__logout-image' src={logoutPath} alt='logout icon'/>
        </button>}
      </nav>
    )
  } else if (props.isSavedNews) {
    return (
      <nav className='header__nav'>
        {isDesktop && <Link to='/' className='header__black-navigation-button'>Home</Link>}
        {isDesktop && <Link to='/saved-news' className='header__black-navigation-button header__black-navigation-button_active'>Saved articles</Link>}
        {isDesktop &&
        <button onClick={props.handleLogout} type='button' className='header__logout-button header__logout-button_type_black'>
          {currentUser.name}
          <img className='header__logout-image' src={blackLogoutPath} alt='logout icon'/>
        </button>}
        {!isDesktop && <button className='header__menu-button'><img src={blackMenuPath} onClick={props.handleOpenPopupNav} alt='menu'/></button>}
      </nav>
    )
  }

  return (
    <nav className='header__nav'>
      {isDesktop && <Link to='/' className='header__white-navigation-button header__white-navigation-button_active'>Home</Link>}
      {(isDesktop && props.isLoggedIn) && <Link className='header__white-navigation-button' to='/saved-news'>Saved articles</Link>}
      {isDesktop ?  !props.isLoggedIn && <button type='button' onClick={props.handleOpenPopupSignup} className='header__signin-button'>Sign in</button> : <button className='header__menu-button'><img src={menuPath} onClick={props.handleOpenPopupNav} alt='menu'/></button>}
      {(isDesktop && props.isLoggedIn) &&
      <button onClick={props.handleLogout} type='button' className='header__logout-button'>
        {currentUser.name}
        <img className='header__logout-image' src={logoutPath} alt='logout icon'/>
      </button>}
    </nav>
  );
}

export default Nav;



