package com.omdb.controllers;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.omdb.services.LoginService;
import com.omdb.services.SignupService;

@Controller
public class SignupController {

	@RequestMapping("/register")
	@ResponseBody
	public String register(@RequestParam String email, @RequestParam String username, @RequestParam String f_password,
			@RequestParam String s_password) throws IOException {

		SignupService ss = new SignupService();
		LoginController lc = new LoginController();

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
