import React from 'react';
import PopupWithForm from './PopupWithForm';
import './PopupAuth.css'

function PopupAuth(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleUsernameChange(e) {
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (props.isRegister) {
      props.handleRegister({
        email,
        password,
        name,
      });
      return
    } props.handleSignin({
      email,
      password,
    });
  }

  const submitSignupErrMessage = () => {
    if (props.isUniqeMaillError) {
     return 'This is email is already registered'
    } else if (props.serverError) {
      return 'Something went wrong with the server, please try again'
    } else if (props.isIncorrectError) {
      return 'Incorrect email or password'
     } else {
      return ''
    }
  }


  return (
    <PopupWithForm isValidatedForm={props.isValidatedForm} isOpen={props.isOpen} onClose={props.onClose} title={props.title} handleSubmit={handleSubmit}>
      <label className='popup__input-title' >Email</label>
      <input className='popup__form-input' name='email' id='email' onChange={handleEmailChange} placeholder='Enter email' value={email || ''} type='email' minLength='4' maxLength='40' required noValidate></input>
      <span className='popup__form-input-error' id='email-error'></span>
      <label className='popup__input-title' >Password</label>
      <input className='popup__form-input' name='password' id='password' onChange={handlePasswordChange} placeholder='Enter password' value={password|| ''} type='password' minLength='4' maxLength='40' required noValidate></input>
      <span className='popup__form-input-error' id='password-error'></span>
      {props.isRegister && <label className='popup__input-title' >Username</label>}
      {props.isRegister && <input className='popup__form-input' id='username' name='username' onChange={handleUsernameChange} placeholder='Enter your username' value={name|| ''} type='text' minLength='2' maxLength='40' required noValidate></input>}
      {props.isRegister && <span className='popup__form-input-error' id='username-error'></span>}
      <span className='popup__form-input-error' id='submit-error'>{submitSignupErrMessage()}</span>
      <button type='submit' className='popup__save-button popup__save-button_disabled'>{props.submitBtnTitle}</button>
      <button type='button' onClick={props.handleRedirect} className='popup__redirect-button'>{'or '}<b className='popup__highlighted-text'>{props.redirectBtn}</b></button>
    </PopupWithForm>
  );
}

export default PopupAuth;