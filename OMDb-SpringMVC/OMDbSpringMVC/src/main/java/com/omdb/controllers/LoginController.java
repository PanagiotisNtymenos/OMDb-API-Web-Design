package com.omdb.controllers;

import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.omdb.services.LoginService;

@Controller
public class LoginController {

	public static String userLoggedIn = "Guest";

	@RequestMapping("/login")
	@ResponseBody
	public String login(@RequestParam String email, @RequestParam String password) throws IOException {

		LoginService ls = new LoginService();

		boolean auth = ls.auth(email, password);

		if (auth) {
			userLoggedIn = ls.getUsername(email);
		} else {
			userLoggedIn = "Guest";
		}
		return userLoggedIn;

	}

	@RequestMapping("/logout")
	@ResponseBody
	public String logout() throws IOException {

		userLoggedIn = "Guest";

		return userLoggedIn;

	}

}
