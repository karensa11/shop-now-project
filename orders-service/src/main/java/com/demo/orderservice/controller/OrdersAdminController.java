package com.demo.orderservice.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.orderservice.data.entity.OrderDetails;
import com.demo.orderservice.data.entity.OrderStatus;
import com.demo.orderservice.repository.OrderRepository;
import com.demo.utility.CommonConsts;

@RestController
public class OrdersAdminController {

	public static final String BASE_PATH = CommonConsts.MS_PREFIX+"/orders/admin" + CommonConsts.V1;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private OrderUtils orderUtils;

	@PostMapping(path = BASE_PATH + "/{orderId}/delivery-date")
	public void setDeliveryDateAndCloseOrder(
			@PathVariable Long orderId) {
		OrderDetails result = orderUtils.findOrder(orderId);
		if (!OrderStatus.PLACED.equals(result.getStatus())) {
			throw new IllegalStateException("Order must be placed to set delivered on date for it");
		};
		result.setDeliveredOn(LocalDateTime.now());
		result.setStatus(OrderStatus.CLOSED);
		orderRepository.save(result);
	}

	@GetMapping(path = BASE_PATH + "/{userId}/search-placed")
	public List<OrderDetails> searchPlacedOrders(
			@PathVariable Long userId) {
		List<OrderDetails> result = orderRepository.findAllPlacedOrderByUserId(userId);
		result.stream().forEach(item -> {
			orderUtils.getCatalogItemsAndCalculateTotal(item);});
		return result;
	}
}
