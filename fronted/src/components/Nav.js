import react from 'react';
import React from 'react';
import {Link} from 'react-router-dom';
import menuPath from '../images/menu.png'
import blackMenuPath from '../images/menu-black.png'
import logoutPath from '../images/logout-white.png'
import blackLogoutPath from '../images/logout.png'


function Nav(props) {
  const [isDesktop, setIsDesktop] = React.useState(false);

  react.useEffect(() => {
    const updatePredicate = () => {
      setIsDesktop(window.matchMedia('(min-width: 490px)').matches)
    }
    updatePredicate();
    window.addEventListener('resize', updatePredicate);

    return () => window.removeEventListener('resize', updatePredicate);
  },[])

  if (props.isPopup) {
    return (
      <div className='popup__nav-holder'>
          <Link className='header__home-button_type_nav' to='/'>
            <button onClick={props.onClose} type='button' className='header__home-button header__home-button_type_nav'>Home</button>
          </Link>
          {!props.isLoggedIn && <button type='button' onClick={props.handleOpenPopupSignin} className='header__signin-button header__signin-button_type_nav'>Sign in</button>}
          {props.isLoggedIn && <Link className='header__home-button_type_nav' to='/saved-news'><button onClick={props.onClose} type='button' className='header__saved-button header__home-button_type_nav'>Saved Articles</button></Link>}
          {props.isLoggedIn &&
          <button onClick={props.handleLogout} type='button' className='header__logout-button header__signin-button_type_nav'>
            {props.userName}
            <img className='header__logout-image' src={logoutPath} alt='logout icon'/>
          </button>}
      </div>
    )
  } else if (props.isSavedNews) {
    return (
      <>
        {isDesktop && <Link to='/'><button type='button' className='header__home-button header__home-button_type_black'>Home</button></Link>}
        {isDesktop && <Link to='/saved-news'><button type='button' className='header__saved-button header__saved-button_type_black'>Saved Articles</button></Link>}
        {isDesktop &&
        <button onClick={props.handleLogout} type='button' className='header__logout-button header__logout-button_type_black'>
          {props.userName}
          <img className='header__logout-image' src={blackLogoutPath} alt='logout icon'/>
        </button>}
        {!isDesktop && <button className='header__menu-button'><img src={blackMenuPath} onClick={props.handleOpenPopupNav} alt='menu'/></button>}
      </>
    )
  }

  return (
    <>
      {isDesktop && <Link to='/'><button type='button' className='header__home-button'>Home</button></Link>}
      {(isDesktop && props.isLoggedIn) && <Link to='/saved-news'><button type='button' className='header__saved-button'>Saved Articles</button></Link>}
      {isDesktop ?  !props.isLoggedIn && <button type='button' onClick={props.handleOpenPopupSignin} className='header__signin-button'>Sign in</button> : <button className='header__menu-button'><img src={menuPath} onClick={props.handleOpenPopupNav} alt='menu'/></button>}
      {(isDesktop && props.isLoggedIn) &&
      <button onClick={props.handleLogout} type='button' className='header__logout-button'>
        {props.userName}
        <img className='header__logout-image' src={logoutPath} alt='logout icon'/>
      </button>}
    </>
  );
}

export default Nav;



