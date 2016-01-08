package com.userCrud.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.RedirectView;

import com.userCrud.model.User;
import com.userCrud.service.UserDao;

public class UserController {

	@Autowired
	private UserDao userDao;

	@RequestMapping(value = "/user", method = RequestMethod.GET)
	public String getUserList(ModelMap model) {
		model.addAttribute("userList", userDao.listUser());
		return "output";
	}

	@RequestMapping(value = "/user/save", method = RequestMethod.POST)
	public View createUser(@ModelAttribute User user, ModelMap model) {
		if (StringUtils.hasText(user.getId())) {
			userDao.updateUser(user);
		} else {
			userDao.addUser(user);
		}
		return new RedirectView("/spring-mongodb/user");
	}

	@RequestMapping(value = "/user/delete", method = RequestMethod.GET)
	public View deleteUser(@ModelAttribute User user, ModelMap model) {
		userDao.deleteUser(user);
		return new RedirectView("/spring-mongodb/user");
	}

}
