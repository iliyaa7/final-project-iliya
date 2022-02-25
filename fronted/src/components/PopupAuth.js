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
    console.log(name)
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

  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} title={props.title} handleSubmit={handleSubmit}>
      <label className='popup__input-title' >Email</label>
      <input className='popup__form-input' onChange={handleEmailChange} placeholder='Enter email' value={email || ''} type='email' minLength='2' maxLength='40' required noValidate></input>
      <span className='popup__form-input-error' id='email-error'></span>
      <label className='popup__input-title' >Password</label>
      <input className='popup__form-input' onChange={handlePasswordChange} placeholder='Enter password' value={password|| ''} type='password' minLength='2' maxLength='40' required noValidate></input>
      <span className='popup__form-input-error' id='Password-error'></span>
      {props.isRegister && <label className='popup__input-title' >Username</label>}
      {props.isRegister && <input className='popup__form-input' onChange={handleUsernameChange} placeholder='Enter your username' value={name|| ''} type='text' minLength='2' maxLength='40' required noValidate></input>}
      {props.isRegister && <span className='popup__form-input-error' id='Username-error'></span>}
      <span className='popup__form-input-error' id='submit-error'></span>
      <button type='submit' className='popup__save-button'>{props.submitBtnTitle}</button>
      <button type='button' onClick={props.handleRedirect} className='popup__redirect-button'>{'or '}<b className='popup__highlighted-text'>{props.redirectBtn}</b></button>
    </PopupWithForm>
  );
}

export default PopupAuth;