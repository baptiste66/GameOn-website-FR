// changement de myTopnav par main-navbar pour alignement 
function editNav() {
  var x = document.querySelector(".main-navbar");

  if (x.classList.contains("responsive")) {
    x.classList.remove("responsive");
  } else {
    x.classList.add("responsive");
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Fermeture de la modale
const modaleClose = document.querySelector(".close");

modaleClose.addEventListener("click", () => {
  closeM ()
})

function closeM() {
  modalbg.style.display = "none";
}

//conditions du formulaires 
const regexName = /^([A-Za-z|\s]{2,15})?([-]{0,1})?([A-Za-z|\s]{2,15})$/;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexQuantity = /^([0-9]{1,2})$/;

// dom element 
const form = document.querySelector('form');
const firstnameField = document.querySelector('#first');
const lastnameField = document.querySelector('#last');
const emailField = document.querySelector('#email');
const birthdateField = document.querySelector('#birthdate');
const quantityField = document.querySelector('#quantity');
const conditionsCheckbox = document.querySelector('#checkbox1');
const cityCheckBox = document.querySelectorAll("input[name='location']");

//message erreur
 const setErrorMessage = (element, message) => {
  element.parentElement.setAttribute('data-error-visible', 'true');
  element.parentElement.setAttribute('data-error', message);
};

//cache le message 
const hideErrorMessage = element => {
  element.parentElement.removeAttribute('data-error-visible');
  element.parentElement.removeAttribute('data-error');
};

//message erreur 
const message = {
  name: 'Veuillez entrer 2 caractères ou plus pour le champ. ',
  email: 'Vous devez entrer une adresse mail valide.',
  birthdate: 'Vous devez entrer votre date de naissance.',
  quantity: 'Vous devez choisir une quantité.',
  city: 'Vous devez choisir une option.',
  conditions: `Vous devez vérifier que vous acceptez les termes et conditions.`,
};

// vérifie input
firstnameField.addEventListener('input', () => checkInputValue(regexName, firstnameField, message.name)); 
lastnameField.addEventListener('input', () => checkInputValue(regexName, lastnameField, message.name));
emailField.addEventListener('input', () => checkInputValue(regexEmail, emailField, message.email));
birthdateField.addEventListener('input', () => checkAge(birthdateField, message.birthdate));
quantityField.addEventListener('input', () => checkInputValue(regexQuantity, quantityField, message.quantity));
conditionsCheckbox.addEventListener('input', () => checkIfConditionsAccepted(conditionsCheckbox, message.conditions));
cityCheckBox.forEach(radio => radio.addEventListener('change', () => checkIfCitySelected(cityCheckBox, message.city)));

//dom element 
const content = document.querySelector(".content");
const modalSuccess = document.querySelector('.modal_success')

// formulaire compare regex et input
function validate(e) {
    e.preventDefault();

    
    const isConditionsAccepted = checkIfConditionsAccepted(conditionsCheckbox, message.conditions);
    const isCitySelected = checkIfCitySelected(cityCheckBox, message.city);
    const isAgeSelected = checkAge(birthdateField, message.birthdate);
    const isQuantityValid = checkInputValue(regexQuantity, quantityField, message.quantity);
    const isEmailValid = checkInputValue(regexEmail, emailField, message.email);
    const isLastNameValid = checkInputValue(regexName, lastnameField, message.name);
    const isFirstNameValid = checkInputValue(regexName, firstnameField, message.name);

    // si ok reset
    if (isConditionsAccepted && isCitySelected && isAgeSelected && isQuantityValid && isEmailValid && isLastNameValid && isFirstNameValid) {
        content.style.display = 'none';
        modalSuccess.style.display = 'flex';
        form.reset();
    } 
};


// Check si les valeurs
function checkInputValue(regex, element, message) {
  const value = element.value;
  if (!value || !regex.test(value)) {
      setErrorMessage(element, message);
      return false;
  } 
  hideErrorMessage(element);
  return true; 
};

// check l'age 
function checkAge (element, message) {
  if (!element.value) {
      setErrorMessage(element, message);
      return false;
  } 
  hideErrorMessage(element);
  return true;
};

// Check condition
 function checkIfConditionsAccepted(element, message) {
  if(!element.checked) {
      setErrorMessage(element, message);
      return false;
  } 
  hideErrorMessage(element);
  return true;  
};


// Check ville selectionner
function checkIfCitySelected(cities, message) {
  const isChecked = Array.from(cities).some(radio => radio.checked);
  if (!isChecked) {
      setErrorMessage(cities[0], message);
      return false;
  };
  hideErrorMessage(cities[0]);
  return true;
};




// dom element 
const btnSubmit = document.querySelectorAll(".btn-submit");

// valide Form
form.addEventListener('submit', function(event) {
  validate(event);
});

    document.querySelector('.btn').addEventListener('click', () => {
        modalbg.style.display = "none";
        modalSuccess.style.display = "none"; 
        resetForm();
    });

    function resetForm() {
      // Réinitialiser les champs du formulaire
      form.reset();
    
      // Rétablir l'affichage par défaut
      content.style.display = 'block';
      modalSuccess.style.display = 'none';
      modalbg.style.display = 'none';
    }