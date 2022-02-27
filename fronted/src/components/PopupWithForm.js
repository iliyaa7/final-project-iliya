import React from "react";
import './PopupWithForm.css'
import FormValidator from "../utils/Validation";

function PopupWithForm(props) {
  const formRef = React.useRef();


  React.useEffect(() => {
    if (props.isValidatedForm) {
      const settings = {
        inputSelector: ".popup__form-input",
        submitButtonSelector: ".popup__save-button",
        inactiveButtonClass: "popup__save-button_disabled",
        inputErrorClass: "popup__form-input_type_error",
        errorClass: "popup__form-input-error_active",
      };
      const validatedForm = new FormValidator(settings, formRef.current);
      validatedForm.enableValidation();
    }
  }, [props.isValidatedForm]);



  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`} id={`${props.id}__popup`}>
      <button onClick={props.onClose} type="button" className="popup__close-button" id="close__form"/>
      <div className="popup__container">
        <form ref={formRef} action="#" className="popup__form" name={`{props.name}-form`} onSubmit={props.handleSubmit}>
          <h2 className="popup__form-heading">{props.title}</h2>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
