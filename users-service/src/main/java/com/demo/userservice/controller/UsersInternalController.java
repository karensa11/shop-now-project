package com.demo.userservice.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.demo.userservice.data.User;
import com.demo.userservice.repository.UsersRepository;
import com.demo.utility.CommonConsts;
import com.demo.utility.exception.DetailsNotFoundException;

@CrossOrigin
@RestController
public class UsersInternalController {
	private static final String BASE_PATH = CommonConsts.MS_PREFIX+"/users/internal" + CommonConsts.V1;
	
	@Autowired
	private UsersRepository usersRepository;

	@GetMapping(path = BASE_PATH+"/{userId}")
	public User getUser(@PathVariable Long userId) {
		Optional<User> result = usersRepository.findById(userId);
		if (!result.isPresent()) {
			throw new DetailsNotFoundException("User with id " + userId + " not found");
		}
		User data = result.get();
		
		return data;
	}
}
