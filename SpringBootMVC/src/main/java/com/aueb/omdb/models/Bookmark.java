package com.aueb.omdb.models;

public class Bookmark {

	private String user;
	private String movieID;

	public Bookmark(String user, String movieID) {
		this.user = user;
		this.movieID = movieID;
	}
	
	public Bookmark(String movieID) {
		this.movieID = movieID;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getMovieID() {
		return movieID;
	}

	public void setMovieID(String movieID) {
		this.movieID = movieID;
	}
	
	
}
