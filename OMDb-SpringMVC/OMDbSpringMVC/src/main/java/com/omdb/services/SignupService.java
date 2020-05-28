package com.omdb.services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.stereotype.Service;

import com.omdb.dbUtil.DBConnection;

@Service
public class SignupService {
	Connection connection;

	public SignupService() {
		try {
			this.connection = DBConnection.getConnection();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		if (this.connection == null) {
			System.err.print("null connection!");
		}
	}

	public boolean auth(String email) {

		PreparedStatement pr = null;
		ResultSet rs = null;

		String sql = "SELECT email FROM Users WHERE email = '" + email + "'";

		try {

			pr = this.connection.prepareStatement(sql);

			rs = pr.executeQuery();

			return true;

		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}

		finally {

			try {
				pr.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}

			try {
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}

		}
	}

	public boolean createUser(String email, String username, String pass) {

		Statement st = null;

		String sql = "INSERT INTO Users (email, username, pass) VALUES ('" + email + "', '" + username + "', '" + pass
				+ "');";

		try {

			st = this.connection.createStatement();

			st.executeUpdate(sql);

			return true;
		} catch (SQLException e) {
			System.out.println("Same username!");
			return false;
		}

	}

}
