package com.aueb.omdb.controllers;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aueb.omdb.models.Bookmark;
import com.aueb.omdb.services.SaveService;

@RestController
public class SaveBookmarkController {

	@PostMapping("/save")
	public void save(HttpSession session, @RequestParam String movieID) {

		SaveService ss = new SaveService();

		ss.save(session.getAttribute("username").toString(), movieID);

	}

	@DeleteMapping("/delete")
	public void delete(HttpSession session, @RequestParam String movieID) {

		SaveService ss = new SaveService();

		ss.save(session.getAttribute("username").toString(), movieID);

	}

	@GetMapping("/bookmarks")
	public ArrayList<Bookmark> showBookmarks() {

		SaveService ss = new SaveService();
		ArrayList<Bookmark> movies = new ArrayList<>();
		movies = ss.getMovies();

		return movies;
	}

	@GetMapping("/bookmarks/{username}")
	public ArrayList<String> showUsersBookmark(@PathVariable String username) {

		SaveService ss = new SaveService();
		ArrayList<String> movies = new ArrayList<>();

		movies = ss.getUsersMovies(username);

		return movies;
	}

}
