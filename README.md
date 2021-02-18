[![OMDB Logo](SpringBootMVC/src/main/resources/static/images/iconcircle.png)](https://omdbaueb.herokuapp.com/index.html)  

## [Go to Site!!](https://omdbaueb.herokuapp.com/index.html)  
  
# OMDb API Web Page
  
This is a movie search site, utilized as an assignment for AUEB. 
With some basic knowlegde of HTML/JavaScript/CSS I created the frontend which is a search bar and a bookmark collection.
Finally, the site is up and running without the Tomcat (for testing purposes). You can see for yourself in the link above!
  
## About
This project uses the [OMDb API](http://www.omdbapi.com/) for fetching movies and their information.   
The backend is a JAVA [Spring Boot](https://spring.io) app, running on localhost using Tomcat.  
The Database is a plain local [SQLite](https://www.sqlite.org/index.html) file using SQL Queries to fetch/store data.  
The site has four functions:  
  * Search Movies  
  * Create Account  
  * Login/Logout  
  * Save/Delete Bookmarks  

The transactions between the frontend and the backend are achieved using a REST API I made myself with AJAX calls!
