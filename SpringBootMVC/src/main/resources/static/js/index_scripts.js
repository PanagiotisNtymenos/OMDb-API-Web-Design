
		var movieID;

		function OMDbAPICall(title) {
			$.getJSON('https://www.omdbapi.com/?apikey=274dad1c&s=' + encodeURI(title))
				.then(
					function (result) {

						var rawString = JSON.stringify(result);
						var response = JSON.parse(rawString);

						if (response.Search == null) {
							if (!$("#searchBar").val()) {
								document.querySelector("#notFound").style.opacity = "0";
							} else {
								document.querySelector("#notFound").style.opacity = "1";
								document.querySelector("#notFound").innerHTML = "No result :(";
							}
							document.querySelector("#results").style.display = "none";
						}

						if (response.Search != null) {
							for (i = 0; i < response.Search.length; i++) {
								result = response.Search[i];
								movieID = result.imdbID;


								var resultToAdd = '<div id="preview' + movieID + '" style="overflow: hidden;"><div><img id="src' + movieID + '" src="resources/static/images/404.png" style="width: 40%;height: auto;padding-right: 20px;float: left;" alt="Poster" class="responsive"></div><div style="white-space: normal;" id="info' + movieID + '"><h3>Title: <span class="res" style="white-space: normal;" id="title' + movieID + '"></span></h3><h4>Released: <span class="res" id="release' + movieID + '"></span></h4><br><div id="sl"><a id="show' + movieID + '" href="#!" onClick="showInfo(' + "'" + movieID + "'" + ')"style="font-size: small; white-space: nowrap;">More Information</a> <br> <br>	</div><div><a id="bookmark_save' + movieID + '" href="#!" onClick="bookmark(' + "'" + movieID + "'" + '); handleBookmark(' + "'" + movieID + "'" + ');"><strong>Add to Bookmarks !</strong></a></div></div></div>';
								var infoToAdd = '<span class="clear"><div id="moreinf' + movieID + '" style="display: none;"><h3>More Information</h3><h4>Genre: <span class="res" id="genre' + movieID + '"></span></h4><h4>Rating: <span class="res" id="imdbRating' + movieID + '"></span></h4><h4>Plot: <span class="res" id="plot' + movieID + '"></span></h4><h4>Rated: <span class="res" id="rated' + movieID + '"></span></h4><h4>Duration: <span class="res" id="runtime' + movieID + '"></span></h4><h4>Director: <span class="res" id="director' + movieID + '"></span></h4><h4>Writer: <span class="res" id="writer' + movieID + '"></span></h4><h4>Actors: <span class="res" id="actors' + movieID + '"></span></h4><h4>Awards: <span class="res" id="awards' + movieID + '"></span></h4><h4>Language: <span class="res" id="language' + movieID + '"></span></h4><h4>Production: <span class="res" id="production' + movieID + '"></span></h4></div></span>';

								document.getElementById("movies").innerHTML = document.getElementById("movies").innerHTML + resultToAdd + infoToAdd + "<br><br> <br><br>";


								var poster = result.Poster;
								var title = result.Title;
								var release = result.Year;
								if (poster !== "N/A") {
									$('#src' + movieID).attr('src', poster);
								} else {
									$('#src' + movieID).attr('src', "images/404v2.png");
								}
								document.querySelector("#notFound").innerHTML = "Result...";
								document.querySelector("#notFound").style.opacity = "1";
								document.querySelector("#results").style.display = "block";
								document.querySelector("#title" + movieID).innerHTML = title;
								document.querySelector("#release" + movieID).innerHTML = release;
							}


							if (document.getElementById("user_name").textContent != "Guest" && movieID != null) {
								$.ajax({
									type: "GET",
									url:  "/bookmarks/" + document.getElementById("user_name").textContent,
									dataType: "json",
									error: function (bookmarksList) {

									},
									success: function (bookmarks) {
										var toStringify = JSON.stringify(bookmarks);
										var bookmarksList = JSON.parse(toStringify);
										
										for (i = 0; i < response.Search.length; i++) {
											result = response.Search[i];
											movieID = result.imdbID;
											if (bookmarksList.includes(movieID)) {
												document.getElementById("bookmark_save" + movieID).innerHTML = "<strong>Delete from Bookmarks !</strong>";
											} else {
												document.getElementById("bookmark_save" + movieID).innerHTML = "<strong>Add to Bookmarks !</strong>";
											}
										}
									}
								});
							}

						}
					});

		}

		$(document).ready(function () {
			$("#searchBar").keyup(function (e) {
				document.getElementById("movies").innerHTML = "";
				OMDbAPICall($("#searchBar").val());

			});
		});

		function bookmark(id) {

			if (document.getElementById("user_name").textContent != "Guest") {
				if ((document.getElementById("bookmark_save" + id).textContent == 'Add to Bookmarks !')) {
					document.getElementById("bookmark_save" + id).innerHTML = "<strong>Delete from Bookmarks !</strong>";
					document.getElementById("bookmark_save" + id).style.color = "#931f1f";
				} else {
					document.getElementById("bookmark_save" + id).innerHTML = "<strong>Add to Bookmarks !</strong>";
					document.getElementById("bookmark_save" + id).style.color = "black";
				}
			}
		}

		function showInfo(id) {

			if (document.querySelector("#moreinf" + id).style.display == "inline-block") {
				document.querySelector("#moreinf" + id).style.display = "none";
				document.querySelector("#show" + id).innerHTML = "More Information";
			} else {
				document.querySelector("#moreinf" + id).style.display = "inline-block";
				document.querySelector("#show" + id).innerHTML = "Less Information";

				$.getJSON('https://www.omdbapi.com/?apikey=274dad1c&i=' + encodeURI(id)).then(function (result) {

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
							$('#src' + id).attr('src', poster);
						} else {
							$('#src' + id).attr('src', "resources/static/images/404v2.png");
						}

						var plot = result.Plot;
						var rated = result.Rated;
						var duration = result.Runtime;
						var director = result.Director;
						var writer = result.Writer;
						var actors = result.Actors;
						var awards = result.Awards;
						var language = result.Language;
						var production = result.Production;

						document.querySelector("#genre" + id).innerHTML = genre;
						document.querySelector("#imdbRating" + id).innerHTML = score;
						document.querySelector("#plot" + id).innerHTML = plot;
						document.querySelector("#rated" + id).innerHTML = rated;
						document.querySelector("#runtime" + id).innerHTML = duration;
						document.querySelector("#director" + id).innerHTML = director;
						document.querySelector("#writer" + id).innerHTML = writer;
						document.querySelector("#actors" + id).innerHTML = actors;
						document.querySelector("#awards" + id).innerHTML = awards;
						document.querySelector("#language" + id).innerHTML = language;
						document.querySelector("#production" + id).innerHTML = production;
					}
				});

			}

		}

		function logInPopUp(TODO) {
			if (TODO == 'login') {
				if (document.getElementById("login_say").textContent != "Logout") {
					document.querySelector(".login-popup").style.display = "flex";
				} else {
					callLogin();
				}
			} else if (TODO == 'cancel') {
				document.querySelector(".login-popup").style.display = "none";
			}
		}

		function signUpPopUp(TODO) {
			if (TODO == 'signup') {
				if (document.getElementById("register_say").textContent != "Bookmarks") {
					document.querySelector(".signup-popup").style.display = "flex";
				} else {
					callBookmarks(document.getElementById("user_name").textContent);
				}
			} else if (TODO == 'cancel') {
				document.querySelector(".signup-popup").style.display = "none";
			}
		}

		function callLogin() {
			if (document.getElementById("login_say").textContent == "Logout") {
				$.ajax({
					type: "PUT",
					url: "logout",
					dataType: "text",
					error: function (response) {

					},
					success: function (response) {
						document.getElementById("user_name").innerHTML = "Guest";
						document.getElementById("login_say").innerHTML = "Login";
						document.getElementById("register_say").innerHTML = "Register";
						
					}
				});
			} else {
				$.ajax({
					type: "POST",
					url: "login",
					data: {
						email: document.getElementById("login_email").value,
						password: document.getElementById("login_password").value
					},
					dataType: "text",
					error: function (response) {

					},
					success: function (response) {
						document.getElementById("user_name").innerHTML = response;
						if (response == "Guest") {
							document.getElementById("login_say").innerHTML = "Login";
							document.getElementById("register_say").innerHTML = "Register";
							alert('WRONG CREDENTIALS!!!\nOK! So...you pressed something wrong and you might have destroyed a whole country!\nNext time, enter CORRECT credentials!\nTry again..');
						} else {
							document.getElementById("login_say").innerHTML = "Logout";
							document.getElementById("register_say").innerHTML = "Bookmarks";
							logInPopUp('cancel');
						}

					}
				});
			}
		}

		function callSignup() {
			if (document.getElementById("register_say").textContent == "Register") {
				$.ajax({
					type: "POST",
					url: "register",
					data: {
						email: document.getElementById("register_email").value,
						username: document.getElementById("register_username").value,
						f_password: document.getElementById("first_password").value,
						s_password: document.getElementById("second_password").value
					},
					dataType: "text",
					error: function (response) {

					},
					success: function (response) {
						console.log(response)
						if (response == "EmailUsed") {
							alert('This E-mail address is already in use!');
						} else if (response == "Password") {
							alert('Please enter the same password in both fields!');
						} else if (response == "Guest") {
							alert('This username is already in use!');
						} else if (response == "Missing") {
							signUpPopUp('cancel');
						} else {
							$.ajax({
								type: "POST",
								url: "login",
								data: {
									email: document.getElementById("register_email").value,
									password: document.getElementById("first_password").value
								},
								dataType: "text",
								error: function (response) {

								},
								success: function (response) {
									document.getElementById("user_name").innerHTML = response;
									document.getElementById("login_say").innerHTML = "Logout";
									document.getElementById("register_say").innerHTML = "Bookmarks";
									logInPopUp('cancel');
								
								}
							});

							signUpPopUp('cancel');
						}

					}
				});

			}
		}

		function callBookmarks(user) {
			location.replace("bookmarks.html");
		}
		
		function handleBookmark(movieID) {

			if (document.getElementById("user_name").textContent == "Guest") {
				logInPopUp('login');
			} else {
					if(document.getElementById("bookmark_save" + movieID).textContent == "<strong>Delete from Bookmarks !</strong>"){
						deleteBookmark(movieID);
					} else {
						saveBookmark(movieID);
					}			
			}
		}

		function saveBookmark(movieID) {

			if (document.getElementById("user_name").textContent == "Guest") {
				logInPopUp('login');
			} else {
				
					$.ajax({
						type: "POST",
						url: "save",
						dataType: "json",
						data: {
							movieID: movieID
						},
						error: function (response) {
						},
						success: function (response) {
						}
					});			
			}
		}

		function deleteBookmark(movieID) {

			if (document.getElementById("user_name").textContent == "Guest") {
				logInPopUp('login');
			} else {
			
					$.ajax({
						type: "DELETE",
						url: "delete",
						dataType: "json",
						data: {
							movieID: movieID
						},
						error: function (response) {
						},
						success: function (response) {
						}
					});
			}
		}
		
		function initialize() {
			document.getElementById("movies").innerHTML = "";
			
			$.ajax({
				type: "GET",
				url: "initLogin?username="+document.getElementById("user_name").value,
				dataType: "text",
				error: function (response) {

				},
				success: function (response) {
					document.getElementById("login_say").innerHTML = response;
				}
			});
			$.ajax({
				type: "GET",
				url: "initRegister?username="+document.getElementById("user_name").value,
				dataType: "text",
				error: function (response) {

				},
				success: function (response) {
					document.getElementById("register_say").innerHTML = response;
				}
			});
			$.ajax({
				type: "GET",
				url: "initUser?username="+document.getElementById("user_name").value,
				dataType: "text",
				error: function (response) {

				},
				success: function (response) {
					document.getElementById("user_name").innerHTML = response;
				}
			});

		}
