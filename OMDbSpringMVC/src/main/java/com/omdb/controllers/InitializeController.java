package com.omdb.controllers;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class InitializeController {

	@RequestMapping("/init_login")
	@ResponseBody
	public String initLog(HttpServletRequest request, HttpServletResponse response) throws IOException {

		String init = "";

		if (!LoginController.userLoggedIn.contentEquals("Guest")) {
			init = "Logout";
		} else {
			init = "Login";
		}
		return init;

	}

	@RequestMapping("/init_register")
	@ResponseBody
	public String initReg(HttpServletRequest request, HttpServletResponse response) throws IOException {

		String init = "";

		if (!LoginController.userLoggedIn.contentEquals("Guest")) {
			init = "Bookmarks";
		} else {
			init = "Register";
		}
		return init;

	}

	@RequestMapping("/init_user")
	@ResponseBody
	public String initUser(HttpServletRequest request, HttpServletResponse response) throws IOException {

		String init = "";

		if (!LoginController.userLoggedIn.contentEquals("Guest")) {
			init = LoginController.userLoggedIn;
		} else {
			init = "Guest";
		}
		return init;

	}

}
