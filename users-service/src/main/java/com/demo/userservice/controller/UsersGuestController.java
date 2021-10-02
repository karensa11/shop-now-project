package com.demo.userservice.controller;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.demo.userservice.data.OrderDetails;
import com.demo.userservice.data.User;
import com.demo.userservice.data.UserAutheticationRequest;
import com.demo.userservice.feign.OrdersFeign;
import com.demo.userservice.messages.NotificationData;
import com.demo.userservice.messages.NotificationMessagePublisher;
import com.demo.userservice.repository.UsersRepository;
import com.demo.utility.CommonConsts;
import com.demo.utility.exception.DetailsAlreadyExistsException;
import com.demo.utility.exception.DetailsNotFoundException;

@CrossOrigin
@RestController
public class UsersGuestController {
	private Logger logger = LoggerFactory.getLogger(UsersGuestController.class);

	private static final String BASE_PATH = CommonConsts.MS_PREFIX+"/users/guest" + CommonConsts.V1;

	@Autowired
	private UsersRepository usersRepository;

	@Autowired
	private OrdersFeign ordersFeign;

	@Autowired
	private NotificationMessagePublisher messagePublisher;

	@PostMapping(path = BASE_PATH+"/authenticate")
	public User autheticate(@RequestBody UserAutheticationRequest userDetails) {
		logger.info("authenticate {}", userDetails);
		Optional<User> result = usersRepository.findByEmail(userDetails.getEmail());
		if (!result.isPresent()) {
			throw new DetailsNotFoundException("User with email " + userDetails.getEmail() + " not found");
		}
		User data = result.get();
		if (!data.getPasswordPartial().equals(userDetails.getPasswordPartial())) {
			throw new DetailsNotFoundException("Invalid password");
		}
		if (!data.getIsGuest()) {
			OrderDetails order = ordersFeign.getOpenOrderForUser(data.getId());
			data.setOrderDetails(order);
		}
		return data;
	}

	@PostMapping(path = BASE_PATH) 
	public User createUser(@Validated @RequestBody User user) {
		Optional<User> result = usersRepository.findByEmail(user.getEmail());
		if (result.isPresent()) {
			throw new DetailsAlreadyExistsException("Email already exists");
		}
		User saved = usersRepository.save(user);
		NotificationData message = new NotificationData();
		message.setMessage("User with id " + saved.getId() + " created");
		message.setUserId(saved.getId());
		messagePublisher.sendMessage(message);
		return saved;
		/*
		URI location = ServletUriComponentssBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(saved.getId()).toUri();
		return ResponseEntity.created(location).build();
		 */
	}
}
