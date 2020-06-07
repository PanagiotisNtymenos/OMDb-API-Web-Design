package com.aueb.omdb.services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.aueb.omdb.dbUtil.DBConnection;
import com.aueb.omdb.models.User;

@Service
public class LoginService {

	Connection connection;

	public LoginService() {
		try {
			this.connection = DBConnection.getConnection();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		if (this.connection == null) {
			System.err.print("null connection!");
		}
	}

	public boolean auth(String email, String pass) {

		PreparedStatement pr = null;
		ResultSet rs = null;

		String sql = "SELECT username, pass FROM Users WHERE email = '" + email + "' and pass = '" + pass + "'";

		try {

			pr = this.connection.prepareStatement(sql);

			rs = pr.executeQuery();

			rs.getString("username");

			rs.getString("pass");

			try {
				pr.close();
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
				System.out.println("OK something went incredibly wrong!");
			}
			return true;
		} catch (SQLException e) {
			System.out.println("Wrong Credentials!");
			return false;
		}

	}

	public String getUsername(String email) {
		PreparedStatement pr = null;
		ResultSet rs = null;
		String username = "No Username Found :(";

		String sql = "SELECT username FROM Users WHERE email = ?";

		try {

			pr = this.connection.prepareStatement(sql);
			pr.setString(1, email);

			rs = pr.executeQuery();

			username = rs.getString("username");

			try {
				pr.close();
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return username;
	}

	public ArrayList<User> getUsers(String username) {
		PreparedStatement pr = null;
		ResultSet rs = null;
		ArrayList<User> users = new ArrayList<User>();
		String sql = "";

		if (username.equals("all")) {
			sql = "SELECT * FROM Users";
		} else {
			sql = "SELECT * FROM Users WHERE username = '" + username + "';";
		}
		try {

			pr = this.connection.prepareStatement(sql);

			rs = pr.executeQuery();

			
			while (rs.next()) {
				User user = new User(rs.getString("username"), rs.getString("email"), rs.getString("pass"));
				users.add(user);
			}
			try {
				pr.close();
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return users;
	}

}
