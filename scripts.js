function logInPopUp(TODO) {
  if (TODO == 'login') {
    document.querySelector(".popup").style.display = "flex";
  } else if (TODO == 'cancel') {
    document.querySelector(".popup").style.display = "none";
  }
}
