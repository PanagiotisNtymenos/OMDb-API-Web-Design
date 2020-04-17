function logInPopUp(TODO) {
  if (TODO == 'login') {
    document.querySelector(".login-popup").style.display = "flex";
  } else if (TODO == 'cancel') {
    document.querySelector(".login-popup").style.display = "none";
  }
}

function signUpPopUp(TODO) {
  if (TODO == 'signup') {
    document.querySelector(".signup-popup").style.display = "flex";
  } else if (TODO == 'cancel') {
    document.querySelector(".signup-popup").style.display = "none";
  }
}
