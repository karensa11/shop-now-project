package com.demo.orderservice.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.demo.orderservice.data.OrderDetails;
import com.demo.orderservice.data.OrderItem;
import com.demo.orderservice.data.OrderItemInput;
import com.demo.orderservice.data.OrderResponse;
import com.demo.orderservice.data.OrderStatus;
import com.demo.orderservice.messages.NotificationData;
import com.demo.orderservice.messages.NotificationMessagePublisher;
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

	@Autowired
	private NotificationMessagePublisher messagePublisher;

	@GetMapping(path = BASE_PATH + "/{orderId}")
	public OrderDetails getOrderDetails(
			@PathVariable Long orderId,
			@RequestHeader(required = false) Long userId) {
		OrderDetails result = orderUtils.findOrderAndValidate(orderId, userId);
		orderUtils.getCatalogItemsAndCalculateTotal(result);
		return result;
	}

	@GetMapping(path = BASE_PATH + "/user/{userId}/open")
	public OrderDetails getOpenOrderForUser(
			@PathVariable @NotNull Long userId) {
		Optional<OrderDetails> dbResult = orderRepository.findOpenOrderByUserId(userId);
		if (dbResult.isPresent()) {
			return dbResult.get();
		}
		return null;
	}

	@GetMapping(path = BASE_PATH + "/user/{userId}/not-open")
	public List<OrderDetails> getNotOpenedOrdersForUser(
			@PathVariable @NotNull Long userId) {
		List<OrderDetails> items = orderRepository.findNotOpenOrdersByUserId(userId);
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
			@RequestHeader(required = false) Long userId, 
			@RequestBody OrderItemInput input) {
		OrderDetails orderDetails = new OrderDetails();
		orderDetails.setUserId(userId);
		OrderDetails saved = orderRepository.save(orderDetails);
		OrderItem orderItem = new OrderItem();
		orderItem.setOrderId(saved.getId());
		orderItem.setCatalogId(input.getCatalogId());
		orderItem.setQuantity(input.getQuantity());
		orderItemRepository.save(orderItem);
		NotificationData notificationMessage = new NotificationData();
		notificationMessage.setMessage("Order "+ orderDetails.getId() + " created");
		notificationMessage.setUserId(userId);
		messagePublisher.sendMessage(notificationMessage);
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
			@RequestHeader(required = false) Long userId,
			@RequestBody OrderItemInput input) {
		OrderDetails orderDetails = orderUtils.findOrderAndValidate(orderId, userId);
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
			@RequestHeader(required = false) Long userId,
			@RequestBody OrderItemInput input) {
		OrderDetails orderDetails = orderUtils.findOrderAndValidate(orderId, userId);
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
			@RequestHeader(required = false) Long userId) {
		orderUtils.findOrderAndValidate(orderId, userId);
		OrderItem orderItem = orderUtils.findOrderItemAndValidate(orderId, orderItemId);
		orderItemRepository.deleteById(orderItem.getId());

		return new OrderResponse(orderId);
	}

	@PostMapping(path = BASE_PATH + "/{orderId}/place")
	public void placeOrder(
			@PathVariable Long orderId, 
			@RequestHeader(required = false) Long userId) {
		OrderDetails result = orderUtils.findOrderAndValidate(orderId, userId);
		if (!OrderStatus.OPEN.equals(result.getStatus())) {
			throw new IllegalStateException("Order must be open so it can be placed");
		}
		result.setStatus(OrderStatus.PLACED);
		orderRepository.save(result);
	}

	@DeleteMapping(path = BASE_PATH + "/{orderId}")
	public void cancelOrder(
			@PathVariable Long orderId, 
			@RequestHeader(required = false) Long userId) {
		OrderDetails result = orderUtils.findOrderAndValidate(orderId, userId);
		if (OrderStatus.CANCELLED.equals(result.getStatus())) {
			throw new IllegalStateException("Order already cancelled");
		}
		result.setStatus(OrderStatus.CANCELLED);
		orderRepository.save(result);
		NotificationData notificationMessage = new NotificationData();
		notificationMessage.setMessage("Order "+ orderId + " cancelled");
		notificationMessage.setUserId(userId);
		messagePublisher.sendMessage(notificationMessage);
	}
}
