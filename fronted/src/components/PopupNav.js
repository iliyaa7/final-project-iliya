import Header from './Header';
import Nav from './Nav';
import './PopupNav.css'

function PopupWithForm(props) {

  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`} id={`${props.id}__popup`}>
      <div className='popup__container popup__container_type_nav'>
        <Header isPopup={true} onClose={props.onClose}/>
        <Nav onClose={props.onClose} isLoggedIn={props.isLoggedIn} handleLogout={props.handleLogout} isPopup={true} handleOpenPopupSignup={props.handleOpenPopupSignup}/>
      </div>
    </div>
  );
}

export default PopupWithForm;