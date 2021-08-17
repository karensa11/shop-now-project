package com.demo.userservice.controller;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.demo.userservice.data.OrderDetails;
import com.demo.userservice.data.User;
import com.demo.userservice.feign.OrdersFeign;
import com.demo.userservice.repository.UsersRepository;
import com.demo.utility.exception.DetailsNotFoundException;

@CrossOrigin
@RestController
public class UsersController {
	
	@Autowired
	private UsersRepository usersRepository;

	@Autowired
	private OrdersFeign ordersFeign;

	@GetMapping(path = "/users/{id}")
	public User getUser(@PathVariable Long id) {
		Optional<User> result = usersRepository.findById(id);
		if (!result.isPresent()) {
			throw new DetailsNotFoundException("User with id " + id + " not found");
		}
		User data = result.get();
		OrderDetails order = ordersFeign.getOpenOrderForUser(id);
		data.setOrderDetails(order);
		
		return data;
	}
	
	@PostMapping(path = "/users")
	public ResponseEntity<Long> createUser(@Validated @RequestBody User user) {
		User saved = usersRepository.save(user);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(saved.getId()).toUri();
		return ResponseEntity.created(location).build();
	}
	
	@DeleteMapping(path = "/users/{id}")
	public void deleteUser(@PathVariable Long id) {
		usersRepository.deleteById(id);
		OrderDetails order = ordersFeign.getOpenOrderForUser(id);
		if (order != null) {
			ordersFeign.cancelOrder(order.getId());
		}
	}
}
