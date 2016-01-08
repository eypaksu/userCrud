package com.userCrud.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.userCrud.model.User;

public class UserDaoImpl implements UserDao {

	@Autowired
	private MongoTemplate mongoTemplate;

	public static final String COLLECTIONNAME = "user";

	public void addUser(User user) {
		if (!mongoTemplate.collectionExists(User.class)) {
			mongoTemplate.createCollection(User.class);
		}
		user.setId(UUID.randomUUID().toString());
		mongoTemplate.insert(user, COLLECTIONNAME);
	}

	public List<User> listUser() {
		return mongoTemplate.findAll(User.class, COLLECTIONNAME);
	}

	public void updateUser(User user) {
		mongoTemplate.insert(user, COLLECTIONNAME);
	}

	public void deleteUser(User user) {
		mongoTemplate.remove(user, COLLECTIONNAME);
	}

}
