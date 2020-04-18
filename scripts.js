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
    var score = result.imdbRating;
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
      document.querySelector("#imdbRating").innerHTML = score;

      var plot = result.Plot;
      var rated = result.Rated;
      var duration = result.Runtime;
      var director = result.Director;
      var writer = result.Writer;
      var actors = result.Actors;
      var awards = result.Awards;
      var language = result.Language;
      var production = result.Production;

      document.querySelector("#plot").innerHTML = plot;
      document.querySelector("#rated").innerHTML = rated;
      document.querySelector("#runtime").innerHTML = duration;
      document.querySelector("#director").innerHTML = director;
      document.querySelector("#writer").innerHTML = writer;
      document.querySelector("#actors").innerHTML = actors;
      document.querySelector("#awards").innerHTML = awards;
      document.querySelector("#language").innerHTML = language;
      document.querySelector("#production").innerHTML = production;

    }
  });

}

$(document).ready(function () {
  $("#searchBar").keyup(function (e) {
    OMDbAPICall($("#searchBar").val());
    if (document.querySelector("#moreinf").style.display == "inline-block") {
      document.querySelector("#moreinf").style.display = "none";
      $('#moreORless').attr('src', "icons/more.png");
      document.querySelector("#show").innerHTML = "More Information";
    }
  });
});


function bookmark() {
  if ((document.getElementById("bookmark").src).includes("icons/added.png")) {
    $('#bookmark').attr('src', "icons/notAdded.png");
  } else {
    $('#bookmark').attr('src', "icons/added.png");
  }
}

function showInfo() {

  if (document.querySelector("#moreinf").style.display == "inline-block") {
    document.querySelector("#moreinf").style.display = "none";
    $('#moreORless').attr('src', "icons/more.png");
    document.querySelector("#show").innerHTML = "More Information";
  } else {
    document.querySelector("#moreinf").style.display = "inline-block";
    $('#moreORless').attr('src', "icons/less.png");
    document.querySelector("#show").innerHTML = "Less Information";
  }

}