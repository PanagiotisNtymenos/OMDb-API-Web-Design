<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1" isELIgnored="false"%>

<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>

<head>
	<meta charset="ISO-8859-1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="styles.css">
	<link rel="icon" href="resources/static/images/icon.png">
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>

	<script>
		var movieID;
		function OMDbAPICall(title) {
			$.getJSON('http://www.omdbapi.com/?apikey=274dad1c&t=' + encodeURI(title))
				.then(
					function (result) {

						var response = result.Response;

						movieID = result.imdbID;

						if (document.getElementById("user_name").textContent != "Guest"
							&& movieID != null) {
							$.ajax({
								type: "POST",
								url: "searchBookmark",
								dataType: "text",
								data: {
									username: document
										.getElementById("user_name").textContent,
									movieID: movieID
								},
								error: function (response) {

								},
								success: function (response) {
									document
										.getElementById("bookmark_save").innerHTML = "<strong>"
										+ response
										+ "</strong>";
								}
							});
						}
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
								$('#src').attr('src', "resources/static/images/404v2.png");
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

		$(document).ready(function () {
			$("#searchBar").keyup(function (e) {
				OMDbAPICall($("#searchBar").val());

				if (document.querySelector("#moreinf").style.display == "inline-block") {
					document.querySelector("#moreinf").style.display = "none";
					document.querySelector("#show").innerHTML = "More Information";
				}
			});
		});

		function bookmark() {
			if (document.getElementById("user_name").textContent != "Guest") {
				if ((document.getElementById("bookmark_save").textContent == 'Save !')) {
					document.getElementById("bookmark_save").innerHTML = "<strong>Delete !</strong>";
					document.getElementById("bookmark_save").style.color = "#931f1f";
				} else {
					document.getElementById("bookmark_save").innerHTML = "<strong>Save !</strong>";
					document.getElementById("bookmark_save").style.color = "black";
				}
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
					type: "POST",
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
						password: document
							.getElementById("login_password").value
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
						username: document
							.getElementById("register_username").value,
						f_password: document
							.getElementById("first_password").value,
						s_password: document
							.getElementById("second_password").value
					},
					dataType: "text",
					error: function (response) {

					},
					success: function (response) {
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
									email: document
										.getElementById("register_email").value,
									password: document
										.getElementById("first_password").value
								},
								dataType: "text",
								error: function (response) {

								},
								success: function (response) {
									document
										.getElementById("user_name").innerHTML = response;

									document
										.getElementById("login_say").innerHTML = "Logout";
									document
										.getElementById("register_say").innerHTML = "Bookmarks";
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

			location.replace("bookmarks.jsp");

		}

		function saveBookmark() {

			if (document.getElementById("user_name").textContent == "Guest") {
				logInPopUp('login');
			} else {
				$.ajax({
					type: "POST",
					url: "save",
					dataType: "text",
					data: {
						username: document.getElementById("user_name").textContent,
						movieTitle: movieID
					},
					error: function (response) {

					},
					success: function (response) {

					}
				});
			}
		}

		function initialize() {

			$.ajax({
				type: "POST",
				url: "init_login",
				dataType: "text",
				error: function (response) {

				},
				success: function (response) {
					document.getElementById("login_say").innerHTML = response;
				}
			});
			$.ajax({
				type: "POST",
				url: "init_register",
				dataType: "text",
				error: function (response) {

				},
				success: function (response) {
					document.getElementById("register_say").innerHTML = response;
				}
			});
			$.ajax({
				type: "POST",
				url: "init_user",
				dataType: "text",
				error: function (response) {

				},
				success: function (response) {
					document.getElementById("user_name").innerHTML = response;
				}
			});

		}
	</script>
	<title>OMDb</title>

</head>

<body onLoad="initialize()">

	<div id="myBody">
		<div class="grid-flex">
			<header>
				<h1 class="item11" style="text-align: center;">
					OMD<span style="color: #931f1f">b</span>
				</h1>
			</header>

			<main>

				<div id="menu" class="item22" style="overflow: hidden;">
					<a id="login_say" href="#" onClick="logInPopUp('login')">Login</a>
					<a id="register_say" href="#" onClick="signUpPopUp('signup')">Register</a>
					<span id="loginas">Connected as, <span id="user_name" style="color: #931f1f">Guest</span>
					</span>
				</div>

				<div class="center">
					<div class="inner item33">
						<input id="searchBar" style="font-family: CaviarDreams;" type="search" name="search"
							placeholder="Search..">
					</div>
					<span style="text-align: center;">
						<p id="notFound">No result :(</p>
					</span>
				</div>
				<div id="results" class="item44" style="margin-top: 20px;">
					<div class="container">
						<div style="margin: auto;">
							<div id="preview" style="overflow: hidden;">
								<div>
									<img id="src" src="resources/static/images/404.png" alt="Poster" class="responsive">
								</div>

								<div id="info">

									<h3>
										Title: <span class="res" id="title"></span>
									</h3>
									<h4>
										Released: <span class="res" id="release"></span>
									</h4>
									<h4>
										Genre: <span class="res" id="genre"></span>
									</h4>
									<h4>
										Rating: <span class="res" id="imdbRating"></span>
									</h4>
									<br>
									<div id="sl">
										<a id="show" href="#" onClick="showInfo()"
											style="font-size: small; white-space: nowrap;">More
											Information</a> <br> <br>
									</div>
									<div>
										<a id="bookmark_save" href="#"
											onClick="bookmark(); saveBookmark();"><strong>Save
												!</strong></a>
									</div>
								</div>

							</div>

							<span class="clear">
								<div id="moreinf">
									<h3>More Information</h3>

									<h4>
										Plot: <span class="res" id="plot"></span>
									</h4>
									<h4>
										Rated: <span class="res" id="rated"></span>
									</h4>
									<h4>
										Duration: <span class="res" id="runtime"></span>
									</h4>
									<h4>
										Director: <span class="res" id="director"></span>
									</h4>
									<h4>
										Writer: <span class="res" id="writer"></span>
									</h4>
									<h4>
										Actors: <span class="res" id="actors"></span>
									</h4>
									<h4>
										Awards: <span class="res" id="awards"></span>
									</h4>
									<h4>
										Language: <span class="res" id="language"></span>
									</h4>
									<h4>
										Production: <span class="res" id="production"></span>
									</h4>
								</div>
							</span>
						</div>

					</div>
				</div>

				<div class="login-popup">
					<div class="popup-content">
						<img src="icons/cancelred.png" onClick="logInPopUp('cancel')" width="20px" height="20px"
							alt="Cancel" class="cancel">
						<p style="font-size: large;">Login!</p>
						<form action="">
							<input id="login_email" type="email" placeholder="E-mail">
							<input id="login_password" type="password" placeholder="Password"><br>
							<a id="loginGO" href="#" class="button" onClick="callLogin()"
								style="font-size: 20px;"><strong>Login</strong></a><br> <br>
						</form>
						<p style="font-size: 12px;">
							You don't have an account yet? <a href="#"
								onClick="signUpPopUp('signup'); logInPopUp('cancel');" style="font-size: 15px;">
								Register!</a>
						</p>
						<br>
					</div>
				</div>

				<div class="signup-popup">
					<div class="popup-content">
						<img src="icons/cancelred.png" onClick="signUpPopUp('cancel')" width="20px" height="20px"
							alt="Cancel" class="cancel">
						<p style="font-size: large;">Register!</p>
						<br>
						<form action="">
							<input id="register_username" type="text" placeholder="Username">
							<input id="register_email" type="email" placeholder="E-mail">
							<input id="first_password" type="password" placeholder="Password">
							<input id="second_password" type="password" placeholder="Confirm password"><br> <a href="#"
								onClick="callSignup();" style="font-size: 20px;"><strong>Register</strong></a><br>
							<br>
						</form>
						<p style="font-size: 12px;">
							You already have an account? <a href="#"
								onClick="logInPopUp('login'); signUpPopUp('cancel');" style="font-size: 15px;">
								Login!</a>
						</p>
						<br>
					</div>
				</div>

			</main>
		</div>
		<br> <br> <br>
		<footer>
			<p id="foot" style="text-align: center;">Panayots 2020 &#169;</p>
		</footer>
	</div>
</body>

</html>