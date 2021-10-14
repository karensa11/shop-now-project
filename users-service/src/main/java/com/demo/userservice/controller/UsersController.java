package com.demo.userservice.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.demo.userservice.data.entity.User;
import com.demo.userservice.data.feign.OrderDetails;
import com.demo.userservice.data.feign.OrderStatus;
import com.demo.userservice.feign.OrdersFeign;
import com.demo.userservice.messages.NotificationData;
import com.demo.userservice.messages.NotificationMessagePublisher;
import com.demo.userservice.repository.UsersRepository;
import com.demo.utility.CommonConsts;
import com.demo.utility.exception.DetailsNotFoundException;

@CrossOrigin
@RestController
public class UsersController {
	private static final String BASE_PATH = CommonConsts.MS_PREFIX+"/users" + CommonConsts.V1;
	
	@Autowired
	private UsersRepository usersRepository;

	@Autowired
	private OrdersFeign ordersFeign;
	
	@Autowired
	private NotificationMessagePublisher messagePublisher;
	
	@DeleteMapping(path = BASE_PATH)
	public void deleteUser(
			@RequestHeader Long authenticationId) {
		Optional<User> user = usersRepository.findById(authenticationId);
		if (!user.isPresent()) {
			throw new DetailsNotFoundException("User with id "+authenticationId+" not found");
		}
		
		OrderDetails order = ordersFeign.getOpenOrderForUser(authenticationId);
		if (order != null) {
			ordersFeign.cancelOrder(order.getId(), authenticationId);
		}
		List<OrderDetails> orders = ordersFeign.getNotOpenedOrdersForUser(authenticationId);
		orders.stream().forEach(item -> {
			if (item.getStatus().equals(OrderStatus.PLACED.toString())) {
				ordersFeign.cancelOrder(item.getId(), authenticationId);
			}
		});
		usersRepository.deleteById(authenticationId);
		NotificationData message = new NotificationData();
		message.setMessage("User with id " + authenticationId + " deleted");
		message.setUserId(authenticationId);
		messagePublisher.sendMessage(message);
	}
}
