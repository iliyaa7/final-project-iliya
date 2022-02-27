export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._submmitButton = formElement.querySelector(
      settings.submitButtonSelector
    );
    this._inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    const hasInvalidInput = this._inputList.some(
      (inputElement) => !inputElement.validity.valid
    );
    return hasInvalidInput;
  }

  _toggleSubmitButton() {
    if (this._hasInvalidInput()) {
      this._submmitButton.classList.add(this._inactiveButtonClass);
      this._submmitButton.setAttribute("disabled", "true");
    } else {
      this._submmitButton.classList.remove(this._inactiveButtonClass);
      this._submmitButton.removeAttribute("disabled");
    }
  }

  _setEventListeners() {
    this._toggleSubmitButton();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButton();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleSubmitButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }
}
