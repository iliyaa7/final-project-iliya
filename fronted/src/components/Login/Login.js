import React from 'react';
import { useEffect, useState } from 'react';
import './Login.css';

function Login(props) {
  const [phoneNumber, setPhoneNumber] = useState('');


  // replace this with reset for, after validation added
  useEffect(() => {
    if(props.isSubmitedSuccesfuly) setPhoneNumber('');
    return;

  }, [props.isSubmitedSuccesfuly])

  function handlePhoneChange(e) {
    setPhoneNumber(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleSubmitLogin(phoneNumber);
  }

  return (
    <div className='login'>
      <div className='login__left-container'>
        <div className='login__form-container'>
          <h1 className='login__heading'>Login</h1>
          {/* change the subtitle text */}
          <h2 className='login__subtitle'>See your contact list:</h2>
          <form onSubmit={handleSubmit} className='login__form'>
            <label className='login__input-title'>Phone Number</label>
            <div className='login__input-container'>
             <input  onChange={handlePhoneChange} type='number' placeholder='Enter your phone number' className='login__input' value={phoneNumber || ''} required/>
            </div>
            <button className='login__submit-button'>Sign in</button>
          </form>
        </div>
      </div>
      <div className='login__right-container'>

      </div>
    </div>
  );
}

export default Login;