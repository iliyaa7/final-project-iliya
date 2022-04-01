import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './PopupAuth.css'
import useFormAndValidation from '../../utils/Validation'

function PopupAuth(props) {
  const inputRef = React.useRef();

  //I chose not to use reset.
  //I think that it works beacuse my forms are unmounted when closing them or submiting the form

  const {
    values, handleChange, errors, isValid, setIsValid,
  } = useFormAndValidation();


  //Just in case there is an auto fill of the input feilds, when opening the form.
  React.useEffect(() => {
    setIsValid(inputRef.current.closest('form').checkValidity());
  },[setIsValid, values]);




  function handleSubmit(e) {
    e.preventDefault();
    const { email, password, name } = values;
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
    } else if (props.serverAuthError) {
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
      <input ref={inputRef} className={`popup__form-input ${errors.email && 'popup__form-input_type_error'}`} name='email' id='email' onChange={handleChange} placeholder='Enter email' value={values.email || ''} type='email' minLength='4' maxLength='40' required noValidate></input>
      <span className='popup__form-input-error' id='email-error'>{errors.email}</span>
      <label className='popup__input-title' >Password</label>
      <input className={`popup__form-input ${errors.password && 'popup__form-input_type_error'}`} name='password' id='password' onChange={handleChange} placeholder='Enter password' value={values.password || ''} type='password' minLength='4' maxLength='40' required noValidate></input>
      <span className='popup__form-input-error' id='password-error'>{errors.password}</span>
      {props.isRegister && <label className='popup__input-title' >Username</label>}
      {props.isRegister && <input className={`popup__form-input ${errors.name && 'popup__form-input_type_error'}`} id='name' name='name' onChange={handleChange} placeholder='Enter your username' value={values.name || ''} type='text' minLength='2' maxLength='40' required noValidate></input>}
      {props.isRegister && <span className='popup__form-input-error' id='name-error'>{errors.name}</span>}
      <span className='popup__form-input-error' id='submit-error'>{submitSignupErrMessage()}</span>
      <button type='submit' className={`popup__save-button ${!isValid && 'popup__save-button_disabled'}`}>{props.submitBtnTitle}</button>
      <button type='button' onClick={props.handleRedirect} className='popup__redirect-button'>{'or '}<b className='popup__highlighted-text'>{props.redirectBtn}</b></button>
    </PopupWithForm>
  );
}

export default PopupAuth;