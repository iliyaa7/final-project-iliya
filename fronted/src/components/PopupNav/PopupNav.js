import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import './PopupNav.css'

function PopupWithForm(props) {

  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`} id={`${props.id}__popup`}>
      <div className='popup__container popup__container_type_nav'>
        <Header isPopup={true} onClose={props.onClose}/>
        <Nav onClose={props.onClose} isLoggedIn={props.isLoggedIn} handleLogout={props.handleLogout} isPopup={true} handleOpenPopupSignin={props.handleOpenPopupSignin}/>
      </div>
    </div>
  );
}

export default PopupWithForm;