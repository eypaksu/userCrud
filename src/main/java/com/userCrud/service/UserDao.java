package com.userCrud.service;

import java.util.List;
import com.userCrud.model.User;

public interface UserDao {

	public void addUser(User user);
	public List <User> listUser();
	public void updateUser(User user);
	public void deleteUser(User user);
}
