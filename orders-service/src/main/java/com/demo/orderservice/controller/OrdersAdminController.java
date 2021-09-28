package com.demo.orderservice.controller;

import java.time.LocalDateTime;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.orderservice.data.OrderDetails;
import com.demo.orderservice.data.OrderStatus;
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
	public void setDeliveryDate(
			@PathVariable Long orderId,
			@RequestHeader(required = false) Long userId) {
		OrderDetails result = orderUtils.findOrderAndValidateAdmin(orderId, userId);
		if (!OrderStatus.PLACED.equals(result.getStatus())) {
			throw new IllegalStateException("Order must be placed to set delivered on date for it");
		};
		result.setDeliveredOn(LocalDateTime.now());
		orderRepository.save(result);
	}
	
	@PostMapping(path = BASE_PATH + "/{orderId}/close")
	public void closeOrder(
			@PathVariable Long orderId, 
			@RequestHeader Long userId) {
		OrderDetails result = orderUtils.findOrderAndValidateAdmin(orderId, userId);
		if (!OrderStatus.PLACED.equals(result.getStatus())) {
			throw new IllegalStateException("Order must be placed so it can be closed");
		};
		if (result.getDeliveredOn() == null) {
			throw new IllegalStateException("Please set the date when order items delivered");
		}
		
		result.setStatus(OrderStatus.CLOSED);
		orderRepository.save(result);
	}

	@GetMapping(path = BASE_PATH + "/search")
	public OrderDetails searchOrder(
			@NotNull @RequestParam Long orderId, 
			@RequestHeader Long userId) {
		OrderDetails result = orderUtils.findOrderAndValidateAdmin(orderId, userId);
		orderUtils.getCatalogItemsAndCalculateTotal(result);
		return result;
	}
}
