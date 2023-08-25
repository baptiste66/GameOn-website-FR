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
  close ()
})

function close() {
  modalbg.style.display = "none";
}

//conditions du formulaires 

