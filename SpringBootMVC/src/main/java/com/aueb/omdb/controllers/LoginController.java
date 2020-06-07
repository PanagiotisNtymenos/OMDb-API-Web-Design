package com.aueb.omdb.controllers;

import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aueb.omdb.services.LoginService;

@RestController
public class LoginController {

	@PostMapping("/login")
	public String login(HttpSession session, @RequestParam String email, @RequestParam String password)
			throws IOException {

		LoginService ls = new LoginService();

		boolean auth = ls.auth(email, password);

		if (auth) {

			session.setAttribute("username", ls.getUsername(email));

			return ls.getUsername(email);

		} else {
			return "Guest";
		}

	}

	@PutMapping("/logout")
	public void logout(HttpSession session) throws IOException {

		session.invalidate();

	}

}
