package com.demo.userservice.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.userservice.data.entity.User;
import com.demo.userservice.repository.UsersRepository;
import com.demo.utility.CommonConsts;
import com.demo.utility.exception.DetailsNotFoundException;

@CrossOrigin
@RestController
public class UsersAdminController {
	private static final String BASE_PATH = CommonConsts.MS_PREFIX+"/users/admin" + CommonConsts.V1;
	
	@Autowired
	private UsersRepository usersRepository;

	@GetMapping(path = BASE_PATH+"/search-by-email")
	public User searchUserByEmail(
			@RequestParam String email) {
		Optional<User> result = usersRepository.findByEmail(email);
		if (!result.isPresent()) {
			throw new DetailsNotFoundException("No user found for email " + email);
		}
		User data = result.get();
		
		return data;
	}
}
