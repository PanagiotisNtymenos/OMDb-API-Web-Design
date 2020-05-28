function OMDbAPICall(title) {
	$
			.getJSON(
					'http://www.omdbapi.com/?apikey=274dad1c&t='
							+ encodeURI(title))
			.then(
					function(result) {

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
								document.querySelector("#notFound").innerHTML = "No result :(";
							}
							document.querySelector("#results").style.display = "none";
						} else {
							if (poster !== "N/A") {
								$('#src').attr('src', poster);
							} else {
								$('#src').attr('src', "icons/404v2.png");
							}
							document.querySelector("#notFound").innerHTML = "Result...";
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

$(document)
		.ready(
				function() {
					$("#searchBar")
							.keyup(
									function(e) {
										OMDbAPICall($("#searchBar").val());

										if (document.querySelector("#moreinf").style.display == "inline-block") {
											document.querySelector("#moreinf").style.display = "none";
											document.querySelector("#show").innerHTML = "More Information";
										}
									});
				});


function bookmark() {
	if ((document.getElementById("bookmark").src).includes("images/added.png")) {
		$('#bookmark').attr('src', "resources/static/images/notAdded.png");
		document.getElementById("bookmark").style.transform = 'scale(1)';
		document.getElementById("bookmark:hover").style.transform = 'scale(1)';
	} else {
		$('#bookmark').attr('src', "images/added.png");
		document.getElementById("bookmark").style.transform = 'scale(1.3)';
		document.getElementById("bookmark").style.transition = '0.2s ease-in-out';
	}
}

function showInfo() {

	if (document.querySelector("#moreinf").style.display == "inline-block") {
		document.querySelector("#moreinf").style.display = "none";
		document.querySelector("#show").innerHTML = "More Information";
	} else {
		document.querySelector("#moreinf").style.display = "inline-block";
		document.querySelector("#show").innerHTML = "Less Information";
	}

}

function createBookmarks() {
	for (i = 0; i < 5; i++) {
		$.getJSON(
				'http://www.omdbapi.com/?apikey=274dad1c&t='
						+ encodeURI('Guardians of the galaxy')).then(
				function(result) {

					var poster = result.Poster;
					var title = result.Title;
					var genre = result.Genre;
					var released = result.Released;
					var ratings = result.imdbRating;
					if (poster !== "N/A") {
						$('#src').attr('src', poster);
					} else {
						$('#src').attr('src', "icons/404.png");
					}

					var span = document.createElement('span');
					var div = document.createElement('div');
					var h3 = document.createElement('h3');
					var h4Genre = document.createElement('h4');
					var h4Rel = document.createElement('h4');
					var h4Rate = document.createElement('h4');
					var img = document.createElement('img');
					var say;

					img.src = poster;
					img.id = "srcBookmark"
					img.style = "height: auto; padding-right: 20px;"

					span.style = "padding: 20px;";
					span.className = "clear";
					div.style = "text-align: left; bottom: 20px;"
					span.appendChild(div);
					div.appendChild(img);

					say = document.createTextNode(title);
					h3.appendChild(say);
					h3.style = "padding: 20px";
					h4Genre.style = "color: black";
					h4Rel.style = "color: black";
					h4Rate.style = "color: black";

					say = document.createTextNode(genre);
					h4Genre.appendChild(say);
					div.appendChild(h3);
					div.appendChild(h4Genre);

					say = document.createTextNode(released);
					h4Rel.appendChild(say);
					div.appendChild(h4Rel);

					say = document.createTextNode(ratings);
					h4Rate.appendChild(say);
					div.appendChild(h4Rate);

					document.body.appendChild(span);
					console.log(span);

				});
	}
}
