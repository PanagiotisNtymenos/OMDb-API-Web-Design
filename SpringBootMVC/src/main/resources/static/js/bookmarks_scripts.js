function showBookmarks(moviesList) {
			if (moviesList != null) {
			
				document.getElementById("bookmarks_found").innerHTML = moviesList.length + " Bookmarks found!";
				for (i = 0; i < moviesList.length; i++) {
					$.getJSON('https://www.omdbapi.com/?apikey=274dad1c&i=' + encodeURI(moviesList[i])).then(function (result) {

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

						img.style = "height: auto; padding: 20px;";

						if (poster !== "N/A") {
						} else {
							img.src = "images/404v2.png";
						}

						span.style = "padding: 20px;white-space:normal;overflow:hidden;";
						span.className = "clear";
						div.style = "text-align: left; bottom: 20px;white-space:normal;overflow:hidden;"
						span.appendChild(div);
						div.appendChild(img);

						say = document.createTextNode(title);
						h3.appendChild(say);
						h3.style = "padding: 10px;white-space:normal;";
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
					});
				}
			} else {
				document.getElementById("bookmarks_found").innerHTML = "No Bookmarks found :(";
			}
		}

		function getBookmarks(user) {
			$.ajax({
				type: "GET",
				url: "/bookmarks/" + user,
				dataType: "json",
				error: function (response) {
				},
				success: function (response) {
					var toStringify = JSON.stringify(response);
					var movies = JSON.parse(toStringify);
					showBookmarks(movies);
				}
			});
		}

		function initialize() {
			$.ajax({
				type: "GET",
				url: "/getUser",
				dataType: "text",
				error: function (response) {

				},
				success: function (response) {		
					document.getElementById("user_name").innerHTML = response;
					getBookmarks(document.getElementById("user_name").textContent);
				}
			});

		}