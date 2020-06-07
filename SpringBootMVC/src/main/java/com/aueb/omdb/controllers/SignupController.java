package com.aueb.omdb.controllers;

import java.io.IOException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aueb.omdb.services.SignupService;

@RestController
public class SignupController {

	@PostMapping("/register")
	public String register(@RequestParam String email, @RequestParam String username, @RequestParam String f_password,
			@RequestParam String s_password) throws IOException {

		SignupService ss = new SignupService();

		if (!email.isEmpty() && !username.isEmpty() && !f_password.isEmpty() && !s_password.isEmpty()) {

			if (f_password.equals(s_password)) {

				boolean auth = ss.auth(email);

				if (auth) {

					if (ss.createUser(email, username, f_password)) {

						return username;
					}

				} else {
					return "EmailUsed";
				}
			} else {
				return "Password";
			}
		} else {
			return "Missing";
		}
		return "Guest";
	}

}
