package com.demo.orderservice.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.demo.orderservice.data.entity.OrderDetails;
import com.demo.orderservice.data.entity.OrderItem;
import com.demo.orderservice.data.entity.OrderStatus;
import com.demo.orderservice.data.rest.OrderItemRequest;
import com.demo.orderservice.data.rest.OrderResponse;
import com.demo.orderservice.repository.OrderItemRepository;
import com.demo.orderservice.repository.OrderRepository;
import com.demo.utility.CommonConsts;

@CrossOrigin(origins = "*")
@RestController
public class OrdersController {

	public static final String BASE_PATH = CommonConsts.MS_PREFIX+"/orders" + CommonConsts.V1;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private OrderItemRepository orderItemRepository;
	
	@Autowired
	private OrderUtils orderUtils;

	@GetMapping(path = BASE_PATH + "/{orderId}")
	public OrderDetails getOrderDetails(
			@PathVariable Long orderId,
			@RequestHeader Long authenticationId) {
		OrderDetails result = orderUtils.findOrderAndValidate(orderId, authenticationId);
		orderUtils.getCatalogItemsAndCalculateTotal(result);
		return result;
	}

	@GetMapping(path = BASE_PATH + "/user/open")
	public OrderDetails getOpenOrderForUser(
			@RequestHeader Long authenticationId) {
		Optional<OrderDetails> dbResult = orderRepository.findOpenOrderByUserId(authenticationId);
		if (dbResult.isPresent()) {
			return dbResult.get();
		}
		return null;
	}

	@GetMapping(path = BASE_PATH + "/user/not-open")
	public List<OrderDetails> getNotOpenedOrdersForUser(
			@RequestHeader Long authenticationId) {
		List<OrderDetails> items = orderRepository.findNotOpenOrdersByUserId(authenticationId);
		items = items.stream().filter(item -> {
			return item.getOrderItems() != null && 
					!item.getOrderItems().isEmpty();})
				.collect(Collectors.toList());
		items.stream().forEach(item -> {
			orderUtils.getCatalogItemsAndCalculateTotal(item);
		});
		return items;
	}

	@PostMapping(path = BASE_PATH)
	public OrderResponse createOrder(
			@RequestHeader Long authenticationId, 
			@Validated @RequestBody OrderItemRequest input) {
		OrderDetails orderDetails = new OrderDetails();
		orderDetails.setUserId(authenticationId);
		OrderDetails saved = orderRepository.save(orderDetails);
		OrderItem orderItem = new OrderItem();
		orderItem.setOrderId(saved.getId());
		orderItem.setCatalogId(input.getCatalogId());
		orderItem.setQuantity(input.getQuantity());
		orderItemRepository.save(orderItem);
		orderUtils.sendOrderNotification("Order "+ orderDetails.getId() + " created", authenticationId);
		/*
		try {
			URI location = new URI(ServletUriComponentsBuilder
					.fromCurrentRequest()
					.path("/{id}")
					.buildAndExpand(saved.getId()).getPath());
			return ResponseEntity.created(location).build();
		} catch (Exception e) {
			throw new RuntimeException("could not create path");
		}
		 */
		return new OrderResponse(saved.getId());
	}
	

	@PostMapping(path = BASE_PATH + "/{orderId}/item")
	public OrderResponse createOrderItem(
			@PathVariable Long orderId,
			@RequestHeader Long authenticationId,
			@Validated @RequestBody OrderItemRequest input) {
		OrderDetails orderDetails = orderUtils.findOrderAndValidate(orderId, authenticationId);
		OrderItem orderItem = new OrderItem();
		orderItem.setOrderId(orderId);
		orderItem.setQuantity(input.getQuantity());
		orderItem.setCatalogId(input.getCatalogId());
		orderItemRepository.save(orderItem);

		return new OrderResponse(orderDetails.getId());
	}

	@PostMapping(path = BASE_PATH + "/{orderId}/item/{orderItemId}")
	public OrderResponse updateOrderItem(
			@PathVariable Long orderId,
			@PathVariable Long orderItemId,
			@RequestHeader Long authenticationId,
			@Validated @RequestBody OrderItemRequest input) {
		OrderDetails orderDetails = orderUtils.findOrderAndValidate(orderId, authenticationId);
		OrderItem orderItem = orderUtils.findOrderItemAndValidate(orderId, orderItemId);
		orderItem.setQuantity(input.getQuantity());
		orderItemRepository.save(orderItem);
		orderRepository.save(orderDetails);

		return new OrderResponse(orderDetails.getId());
	}

	@DeleteMapping(path = BASE_PATH + "/{orderId}/item/{orderItemId}")
	public OrderResponse cancelOrderItem(
			@PathVariable Long orderId,
			@PathVariable Long orderItemId,
			@RequestHeader Long authenticationId) {
		orderUtils.findOrderAndValidate(orderId, authenticationId);
		OrderItem orderItem = orderUtils.findOrderItemAndValidate(orderId, orderItemId);
		orderItemRepository.deleteById(orderItem.getId());

		return new OrderResponse(orderId);
	}

	@PostMapping(path = BASE_PATH + "/{orderId}/place")
	public void placeOrder(
			@PathVariable Long orderId, 
			@RequestHeader Long authenticationId) {
		OrderDetails result = orderUtils.findOrderAndValidate(orderId, authenticationId);
		if (!OrderStatus.OPEN.equals(result.getStatus())) {
			throw new IllegalStateException("Order must be open so it can be placed");
		}
		result.setStatus(OrderStatus.PLACED);
		orderRepository.save(result);
	}

	@DeleteMapping(path = BASE_PATH + "/{orderId}")
	public void cancelOrder(
			@PathVariable Long orderId, 
			@RequestHeader Long authenticationId) {
		OrderDetails result = orderUtils.findOrderAndValidate(orderId, authenticationId);
		if (OrderStatus.CANCELLED.equals(result.getStatus())) {
			throw new IllegalStateException("Order already cancelled");
		}
		if (OrderStatus.CLOSED.equals(result.getStatus())) {
			throw new IllegalStateException("Order is closed");
		}
		result.setStatus(OrderStatus.CANCELLED);
		orderRepository.save(result);
		orderUtils.sendOrderNotification("Order "+ orderId + " cancelled", authenticationId);
	}

	@PutMapping(path = BASE_PATH + "/{orderId}/associate-user")
	public void associateUserToOrder(
			@PathVariable Long orderId, 
			@RequestHeader Long authenticationId) {
		OrderDetails result = orderUtils.findOrderAndValidate(orderId, authenticationId);
		if (!OrderStatus.OPEN.equals(result.getStatus())) {
			throw new IllegalStateException("Can associate user only to open order");
		}
		result.setUserId(authenticationId);
		orderUtils.sendOrderNotification("Order "+ orderId + " associated with user", authenticationId);
	}
}
