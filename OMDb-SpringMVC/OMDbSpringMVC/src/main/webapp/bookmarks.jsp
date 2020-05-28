<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1" isELIgnored="false"%>

<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="styles.css">
	<link rel="icon" href="resources/static/images/icon.png">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
	<script>
		function createBookmarks(movies) {

			if (movies != '') {
				var moviesList = movies.split(" #NEXT# ");
				document.getElementById("bookmarks_found").innerHTML = moviesList.length + " Bookmarks found!";
				for (i = 0; i < moviesList.length; i++) {
					$.getJSON('http://www.omdbapi.com/?apikey=274dad1c&i=' + encodeURI(moviesList[i])).then(function (result) {

						var poster = result.Poster;
						var title = result.Title;
						var genre = result.Genre;
						var released = result.Released;
						var ratings = result.imdbRating;

						var span = document.createElement('span');
						var div = document.createElement('div');
						var h3 = document.createElement('h3');
						var h4Genre = document.createElement('h4');
						var h4Rel = document.createElement('h4');
						var h4Rate = document.createElement('h4');
						var img = document.createElement('img');
						var say;

						img.src = poster;
						img.id = "srcBookmark";

						img.style = "height: auto; padding-right: 20px;";

						if (poster !== "N/A") {
						} else {
							img.src = "resources/static/images/404v2.png";
						}

						span.style = "padding: 20px;";
						span.className = "clear";
						div.style = "text-align: left; bottom: 20px;"
						span.appendChild(div);
						div.appendChild(img);

						say = document.createTextNode(title);
						h3.appendChild(say);
						h3.style = "padding: 10px;";
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
			} else {
				document.getElementById("bookmarks_found").innerHTML = "No Bookmarks found :(";
			}
		}

		function getBookmarks(user) {

			$.ajax({
				type: "GET",
				url: "bookmark",
				data: {
					username: user
				},
				dataType: "text",
				error: function (response) {

				},
				success: function (response) {
					console.log(response);
					createBookmarks(response);
				}
			});
		}

		function initialize() {
			$.ajax({
				type: "GET",
				url: "init_user",
				dataType: "text",
				error: function (response) {

				},
				success: function (response) {
					document.getElementById("user_name").innerHTML = response;
					getBookmarks(document.getElementById("user_name").textContent);
				}
			});

		}
	</script>
	<title>Bookmarks</title>
</head>

<body onLoad="initialize();">

	<header>

		<h1 class="item11" style="text-align: center;">
			<a href="index.jsp" style="font-size: 30px; color: black">
				OMD<span style="color: #931f1f">b</span>
			</a>
		</h1>


	</header>
	<main>
		<h2 style="text-align: center;">
			<span id="user_name" style="color: #931f1f"></span>'s Bookmarks
		</h2>
		<p style="text-align: center;">
			<span id="bookmarks_found" style="color: #931f1f"></span>
		</p>
	</main>
</body>

</html>