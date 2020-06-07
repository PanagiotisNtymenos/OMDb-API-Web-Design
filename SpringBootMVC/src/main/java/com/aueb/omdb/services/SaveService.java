package com.aueb.omdb.services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.aueb.omdb.dbUtil.DBConnection;
import com.aueb.omdb.models.Bookmark;

public class SaveService {

	Connection connection;

	public SaveService() {
		try {
			this.connection = DBConnection.getConnection();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		if (this.connection == null) {
			System.err.print("null connection!");
		}
	}

	public ArrayList<Bookmark> getMovies() {

		PreparedStatement pr = null;
		ResultSet rs = null;
		String sql = "SELECT * FROM Bookmarks;";

		try {

			pr = this.connection.prepareStatement(sql);

			rs = pr.executeQuery();

			ArrayList<Bookmark> movies = new ArrayList<Bookmark>();

			while (rs.next()) {

				Bookmark bookmark = new Bookmark(rs.getString("username"), rs.getString("title"));
				movies.add(bookmark);
			}

			try {
				pr.close();
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
				return null;
			}
			return movies;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

	public ArrayList<String> getUsersMovies(String username) {

		PreparedStatement pr = null;
		ResultSet rs = null;
		String sql = "SELECT title FROM Bookmarks WHERE username = '" + username + "';";

		try {

			pr = this.connection.prepareStatement(sql);

			rs = pr.executeQuery();

			ArrayList<String> movies = new ArrayList<String>();

			while (rs.next()) {
				movies.add(rs.getString("title"));
			}

			try {
				pr.close();
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
				return null;
			}
			return movies;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

	public boolean save(String username, String movieTitle) {

		Statement st = null;

		if (!bookmarkedAlready(username, movieTitle)) {

			String sql = "INSERT INTO Bookmarks (username, title) VALUES ('" + username + "', '" + movieTitle + "');";

			try {

				st = this.connection.createStatement();

				st.executeUpdate(sql);

				try {
					st.close();
				} catch (SQLException e) {
					System.out.println("OK something went incredibly wrong!");
				}
				return true;
			} catch (SQLException e) {
				e.printStackTrace();
				return false;
			}
		} else {

			String sql = "DELETE FROM Bookmarks WHERE username = '" + username + "' AND title = '" + movieTitle + "';";

			try {

				st = this.connection.createStatement();

				st.executeUpdate(sql);

				try {
					st.close();
				} catch (SQLException e) {
					System.out.println("OK something went incredibly wrong!");
				}

			} catch (SQLException e) {
				e.printStackTrace();

			}
			return true;
		}
	}

	public boolean exists(String username, String movieID) {

		PreparedStatement pr = null;
		ResultSet rs = null;

		String sql = "SELECT username FROM Bookmarks WHERE username = '" + username + "' and title = '" + movieID + "'";

		try {

			pr = this.connection.prepareStatement(sql);

			rs = pr.executeQuery();

			rs.getString("username");

			try {
				pr.close();
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
				System.out.println("OK something went incredibly wrong!");
				return false;
			}
			return true;
		} catch (SQLException e) {

			return false;
		}
	}

	public boolean bookmarkedAlready(String username, String movieTitle) {

		PreparedStatement pr = null;
		ResultSet rs = null;

		String sql = "SELECT username FROM Bookmarks WHERE username = '" + username + "' and title = '" + movieTitle
				+ "'";

		try {

			pr = this.connection.prepareStatement(sql);

			rs = pr.executeQuery();

			rs.getString("username");

			try {
				pr.close();
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
				System.out.println("OK something went incredibly wrong!");
			}
			return true;
		} catch (SQLException e) {

			return false;
		}
	}
}
