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

function OMDbAPICall(title) {
  $.getJSON('http://www.omdbapi.com/?apikey=274dad1c&t=' + encodeURI(title)).then(function (result) {
    var response = result.Response;

    var poster = result.Poster;
    var title = result.Title;
    var release = result.Year;
    var genre = result.Genre;
    var plot = result.Plot;
    if (response == "False") {
      if (!$("#searchBar").val()) {
        document.querySelector("#notFound").style.opacity = "0";
      } else {
        document.querySelector("#notFound").style.opacity = "1";
        document.querySelector("#notFound").innerHTML = "Κανένα αποτέλεσμα :(";
      }
      document.querySelector("#results").style.display = "none";
    } else {
      if (poster !== "N/A") {
        $('#src').attr('src', poster);
      } else {
        $('#src').attr('src', "icons/404.png");
      }
      document.querySelector("#notFound").innerHTML = "Αποτέλεσμα";
      document.querySelector("#notFound").style.opacity = "1";
      document.querySelector("#results").style.display = "block";
      document.querySelector("#title").innerHTML = title;
      document.querySelector("#release").innerHTML = release;
      document.querySelector("#genre").innerHTML = genre;
      document.querySelector("#plot").innerHTML = plot;
    }
  });

}

$(document).ready(function () {
  $("#searchBar").keyup(function (e) {

    OMDbAPICall($("#searchBar").val());
    console.log($("#searchBar").val());
  });
});


