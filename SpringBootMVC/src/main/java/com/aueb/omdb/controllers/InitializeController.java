package com.aueb.omdb.controllers;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.aueb.omdb.models.User;
import com.aueb.omdb.services.LoginService;

@RestController
public class InitializeController {

	@GetMapping("/initLogin")
	public String initLog(HttpSession session) throws IOException {

		String init = "";

		if (session.getAttribute("username") != null) {
			init = "Logout";
		} else {
			init = "Login";
		}
		return init;

	}

	@GetMapping("/initRegister")
	public String initReg(HttpSession session) throws IOException {

		String init = "";

		if (session.getAttribute("username") != null) {
			init = "Bookmarks";
		} else {
			init = "Register";
		}
		return init;

	}

	@GetMapping("/initUser")
	public String initUser(HttpSession session) throws IOException {

		String user = "";

		if (session.getAttribute("username") != null) {
			user = session.getAttribute("username").toString();
		} else {
			user = "Guest";
		}
		return user;
	}

	@GetMapping("/getUser")
	public String getUser(HttpSession session) throws IOException {

		String user = "";

		if (session.getAttribute("username") != null) {
			user = session.getAttribute("username").toString();
		} else {
			user = "Guest";
		}
		return user;

	}
	
	
	@GetMapping("/users")
	public ArrayList<User> getUsers() throws IOException {

		LoginService ls = new LoginService();

		return ls.getUsers("all");

	}
	
	@GetMapping("/users/{username}")
	public ArrayList<User> getUsers(@PathVariable String username) throws IOException {

		LoginService ls = new LoginService();

		return ls.getUsers(username);

	}
	

}
