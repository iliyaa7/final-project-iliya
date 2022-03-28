import React from 'react';
import Nav from '../Nav/Nav'
import './Header.css'

function Header(props) {
  return (
    <header className={`header ${props.isSavedNews && 'header_type_black'}`}>
      <h1 className={`header__heading ${props.isSavedNews && 'header__heading_type_black'}`}>NewsExplorer</h1>
      {props.isPopup
      ?
      <button onClick={props.onClose} type="button" className="popup__close-button popup__close-button_type_nav" id="close__form"/>
      :
      <Nav handleLogout={props.handleLogout} isPopup={props.isPopup} isLoggedIn={props.isLoggedIn} isSavedNews={props.isSavedNews} handleOpenPopupNav={props.handleOpenPopupNav} handleOpenPopupSignup={props.handleOpenPopupSignup}/>}
    </header>
  );
}

export default Header;