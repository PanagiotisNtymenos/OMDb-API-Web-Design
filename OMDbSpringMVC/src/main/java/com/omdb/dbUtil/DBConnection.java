package com.omdb.dbUtil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

	String directory = System.getProperty("user.dir");

	private static String SQLiteCONNECTION = "jdbc:sqlite:OMDbDB.sqlite";

	public static Connection getConnection() throws SQLException {

		try {
			Class.forName("org.sqlite.JDBC");
			return DriverManager.getConnection(SQLiteCONNECTION);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		return null;
	}

}
