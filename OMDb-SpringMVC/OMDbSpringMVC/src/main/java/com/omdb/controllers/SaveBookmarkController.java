package com.omdb.controllers;

import java.util.ArrayList;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.omdb.services.SaveService;

@Controller
public class SaveBookmarkController {

	@RequestMapping("/save")
	@ResponseBody
	public String save(@RequestParam String username, @RequestParam String movieTitle) {

		SaveService ss = new SaveService();

		if (ss.save(username, movieTitle)) {
			return "Done";
		} else {
			return "Error";
		}

	}

	@RequestMapping("/bookmark")
	@ResponseBody
	public String showBookmark(@RequestParam String username) {

		SaveService ss = new SaveService();

		String titles = "";
		ArrayList<String> movies = ss.getMovies(username);

		if (movies != null) {
			for (int i = 0; i < movies.size(); i++)
				if (movies.size() == 1) {
					titles = movies.get(i);
				} else if ((movies.size() - 1) == i) {
					titles = titles + movies.get(i);
				} else {
					titles = titles + movies.get(i) + " #NEXT# ";
				}

		} else {
			return "Error";
		}

		return titles;
	}

}
