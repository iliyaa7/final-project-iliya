import React from 'react';
import Nav from '../Nav/Nav'
import './Header.css'

function Header(props) {
  return (
    // if Header is rendered in mobile (as a child of PopupNav), it will render a close button for PopupNav instead of the Nav
    <header className={`header ${props.isSavedNews && 'header_type_black'}`}>
      <h1 className={`header__heading ${props.isSavedNews && 'header__heading_type_black'}`}>NewsExplorer</h1>
      {props.isPopup
      ?
      <button onClick={props.onClose} type="button" className="popup__close-button popup__close-button_type_nav" id="close__form"/>
      :
      <Nav handleLogout={props.handleLogout} isPopup={props.isPopup} isLoggedIn={props.isLoggedIn} isSavedNews={props.isSavedNews} handleOpenPopupNav={props.handleOpenPopupNav} handleOpenPopupSignin={props.handleOpenPopupSignin}/>}
    </header>
  );
}

export default Header;
