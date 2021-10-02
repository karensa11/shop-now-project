package com.demo.userservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.demo.userservice.data.OrderDetails;
import com.demo.userservice.data.OrderStatus;
import com.demo.userservice.feign.OrdersFeign;
import com.demo.userservice.messages.NotificationData;
import com.demo.userservice.messages.NotificationMessagePublisher;
import com.demo.userservice.repository.UsersRepository;
import com.demo.utility.CommonConsts;

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
	
	@DeleteMapping(path = BASE_PATH+"/{userId}")
	public void deleteUser(@PathVariable Long userId) {
		OrderDetails order = ordersFeign.getOpenOrderForUser(userId);
		if (order != null) {
			ordersFeign.cancelOrder(order.getId(), userId);
		}
		List<OrderDetails> orders = ordersFeign.getNotOpenedOrdersForUser(userId);
		orders.stream().forEach(item -> {
			if (item.getStatus().equals(OrderStatus.PLACED.toString())) {
				ordersFeign.cancelOrder(item.getId(), userId);
			}
		});
		usersRepository.deleteById(userId);
		NotificationData message = new NotificationData();
		message.setMessage("User with id " + userId + " deleted");
		message.setUserId(userId);
		messagePublisher.sendMessage(message);
	}
}
