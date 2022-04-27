import React from 'react';
import './InfoTooltip.css'

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`} >
      <div className='popup__container popup__container_type_tool-tip'>
      <button onClick={props.onClose} type='button' className='popup__close-button popup__close-button_type_tool-tip'/>
        <div className='popup__form popup__form_type_tool-tip'>
          <p className='popup__form-heading popup__form-heading_type_tool-tip'>Registration successfully completed!</p>
          <button type='button' onClick={props.handleRedirect} className='popup__redirect-button popup__redirect-button_type_tool-tip'><p className='popup__highlighted-text'>Sign in</p></button>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;