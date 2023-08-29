//form regex  
const NAME_REGEX = /^([A-Za-z|\s]{2,15})?([-]{0,1})?([A-Za-z|\s]{2,15})$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const QUANTITY_REGEX = /^([0-9]{1,2})$/;

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector('form');
const firstnameField = document.querySelector('#first');
const lastnameField = document.querySelector('#last');
const emailField = document.querySelector('#email');
const birthdateField = document.querySelector('#birthdate');
const quantityField = document.querySelector('#quantity');
const conditionsCheckbox = document.querySelector('#checkbox1');
const cityCheckBox = document.querySelectorAll("input[name='location']");
const modalClose = document.querySelector(".close");
const content = document.querySelector(".content");
const modalSuccess = document.querySelector('.modal_success')
const btnSubmit = document.querySelectorAll(".btn-submit");
//message erreur 
const message = {
  NAME: 'Veuillez entrer 2 caractères ou plus pour le champ. ',
  EMAIL: 'Vous devez entrer une adresse mail valide.',
  BIRTHDATE: 'Vous devez entrer votre date de naissance.',
  QUANTITY: 'Vous devez choisir une quantité.',
  CITY: 'Vous devez choisir une option.',
  CONDITIONS: `Vous devez vérifier que vous acceptez les termes et conditions.`,
};

// change Mytopnav by main-navbar for alignment
function editNav() {
  const x = document.querySelector(".main-navbar");

  if (x.classList.contains("responsive")) {
    x.classList.remove("responsive");
  } else {
    x.classList.add("responsive");
  }
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal
modalClose.addEventListener("click", () => {modalbg.style.display = "none";})



//error message 
 const setErrorMessage = (element, message) => {
  element.parentElement.setAttribute('data-error-visible', 'true');
  element.parentElement.setAttribute('data-error', message);
};

//delete error message 
const hideErrorMessage = element => {
  element.parentElement.removeAttribute('data-error-visible');
  element.parentElement.removeAttribute('data-error');
};

// check input
firstnameField.addEventListener('input', () => checkInputValue(NAME_REGEX, firstnameField, message.NAME)); 
lastnameField.addEventListener('input', () => checkInputValue(NAME_REGEX, lastnameField, message.NAME));
emailField.addEventListener('input', () => checkInputValue(EMAIL_REGEX, emailField, message.EMAIL));
birthdateField.addEventListener('input', () => checkAge(birthdateField, message.BIRTHDATE));
quantityField.addEventListener('input', () => checkInputValue(QUANTITY_REGEX, quantityField, message.QUANTITY));
conditionsCheckbox.addEventListener('input', () => checkIfConditionsAccepted(conditionsCheckbox, message.CONDITIONS));
cityCheckBox.forEach(radio => radio.addEventListener('change', () => checkIfCitySelected(cityCheckBox, message.CITY)));



// form compare regex and input
function validate(e) {
    e.preventDefault();

    const isConditionsAccepted = checkIfConditionsAccepted(conditionsCheckbox, message.CONDITIONS);
    const isCitySelected = checkIfCitySelected(cityCheckBox, message.CITY);
    const isAgeSelected = checkAge(birthdateField, message.BIRTHDATE);
    const isQuantityValid = checkInputValue(QUANTITY_REGEX, quantityField, message.QUANTITY);
    const isEmailValid = checkInputValue(EMAIL_REGEX, emailField, message.EMAIL);
    const isLastNameValid = checkInputValue(NAME_REGEX, lastnameField, message.NAME);
    const isFirstNameValid = checkInputValue(NAME_REGEX, firstnameField, message.NAME);

    // if ok reset
    if (isConditionsAccepted && isCitySelected && isAgeSelected && isQuantityValid && isEmailValid && isLastNameValid && isFirstNameValid) {
        content.style.display = 'none';
        modalSuccess.style.display = 'flex';
        form.reset();
    } 
};


// Check value
function checkInputValue(regex, element, message) {
  const value = element.value;
  if (!value || !regex.test(value)) {
      setErrorMessage(element, message);
      return false;
  } 
  hideErrorMessage(element);
  return true; 
};

// check age 
function checkAge (element, message) {
  if (!element.value) {
      setErrorMessage(element, message);
      return false;
  } 
  hideErrorMessage(element);
  return true;
};

// Check conditions 
 function checkIfConditionsAccepted(element, message) {
  if(!element.checked) {
      setErrorMessage(element, message);
      return false;
  } 
  hideErrorMessage(element);
  return true;  
};


// Check city
function checkIfCitySelected(cities, message) {
  const isChecked = Array.from(cities).some(radio => radio.checked);
  if (!isChecked) {
      setErrorMessage(cities[0], message);
      return false;
  };
  hideErrorMessage(cities[0]);
  return true;
};



// valid Form
form.addEventListener('submit', function(event) {
  validate(event);
});

document.querySelector('.btn').addEventListener('click', () => {
  modalbg.style.display = "none";
  modalSuccess.style.display = "none"; 
  resetForm();
  hideErrorMessage(firstnameField);
  hideErrorMessage(lastnameField);
  hideErrorMessage(emailField);
  hideErrorMessage(birthdateField);
  hideErrorMessage(quantityField);
  hideErrorMessage(conditionsCheckbox);
  hideErrorMessage(cityCheckBox[0]);
});

    function resetForm() {
      // reset form
      form.reset();
    
      // default display
      content.style.display = 'block';
      modalSuccess.style.display = 'none';
      modalbg.style.display = 'none';
    }