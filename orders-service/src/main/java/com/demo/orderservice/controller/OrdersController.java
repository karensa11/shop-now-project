package com.demo.orderservice.controller;

import java.math.BigDecimal;
import java.util.Optional;

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

import com.demo.orderservice.data.CatalogItem;
import com.demo.orderservice.data.OrderDetails;
import com.demo.orderservice.data.OrderItem;
import com.demo.orderservice.data.OrderItemInput;
import com.demo.orderservice.data.OrderResponse;
import com.demo.orderservice.data.OrderStatus;
import com.demo.orderservice.feign.CatalogFeign;
import com.demo.orderservice.messages.NotificationMessage;
import com.demo.orderservice.messages.NotificationMessagePublisher;
import com.demo.orderservice.repository.OrderItemRepository;
import com.demo.orderservice.repository.OrderRepository;
import com.demo.utility.CommonConsts;
import com.demo.utility.exception.DetailsNotFoundException;

@CrossOrigin(origins = "*")
@RestController
public class OrdersController {

	public static final String BASE_PATH = CommonConsts.MS_PREFIX+"/orders";

	@Autowired
	private CatalogFeign catalogService;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private OrderItemRepository orderItemRepository;

	@Autowired
	private NotificationMessagePublisher messagePublisher;

	@GetMapping(path = BASE_PATH + "/{orderId}")
	public OrderDetails getOrderDetails(
			@PathVariable Long orderId,
			@RequestHeader(required = false) Long userId) {
		OrderDetails result = findOrderAndValidate(orderId, userId);
		int totalItemsNumber = 0;
		for (OrderItem orderItem:result.getOrderItems()) {
			CatalogItem catalogItem = catalogService.getCatalogItem(orderItem.getCatalogId());
			orderItem.setCatalogItem(catalogItem);
			totalItemsNumber += orderItem.getQuantity();
		}
		result.setTotalPrice(calculateTotal(result));
		result.setTotalItemsNumber(totalItemsNumber);
		return result;
	}

	@GetMapping(path = BASE_PATH + "/user")
	public OrderDetails getOpenOrderForUser(
			@RequestHeader @NotNull Long userId) {
		Optional<OrderDetails> dbResult = orderRepository.findOpenOrderByUserId(userId);
		if (dbResult.isPresent()) {
			return dbResult.get();
		}
		return null;
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
		NotificationMessage notificationMessage = new NotificationMessage();
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
		OrderDetails orderDetails = findOrderAndValidate(orderId, userId);
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
		OrderDetails orderDetails = findOrderAndValidate(orderId, userId);
		OrderItem orderItem = findOrderItemAndValidate(orderId, orderItemId);
		orderItem.setQuantity(input.getQuantity());
		orderItemRepository.save(orderItem);

		return new OrderResponse(orderDetails.getId());
	}

	@DeleteMapping(path = BASE_PATH + "/{orderId}/item/{orderItemId}")
	public OrderResponse cancelOrderItem(
			@PathVariable Long orderId,
			@PathVariable Long orderItemId,
			@RequestHeader(required = false) Long userId) {
		findOrderAndValidate(orderId, userId);
		OrderItem orderItem = findOrderItemAndValidate(orderId, orderItemId);
		orderItemRepository.deleteById(orderItem.getId());

		return new OrderResponse(orderId);
	}

	@DeleteMapping(path = BASE_PATH + "/{orderId}")
	public void cancelOrder(@PathVariable Long orderId, @RequestHeader(required = false) Long userId) {
		OrderDetails result = findOrderAndValidate(orderId, userId);
		result.setStatus(OrderStatus.CANCELLED);
		orderRepository.save(result);
		NotificationMessage notificationMessage = new NotificationMessage();
		notificationMessage.setMessage("Order "+ orderId + " cancelled");
		notificationMessage.setUserId(userId);
		messagePublisher.sendMessage(notificationMessage);
	}

	private OrderDetails findOrderAndValidate(Long orderId, Long userId) {
		Optional<OrderDetails> resultFromDb = orderRepository.findById(orderId);
		if (!resultFromDb.isPresent()) {
			throw new DetailsNotFoundException("order with id " + orderId + " not found");
		}
		OrderDetails result = resultFromDb.get();
		if (result.getUserId()!=null && !result.getUserId().equals(userId)) {
			throw new IllegalArgumentException("invalid user id");
		}
		return resultFromDb.get();
	}

	private OrderItem findOrderItemAndValidate(Long orderId, Long orderItemId) {
		Optional<OrderItem> resultFromDb = orderItemRepository.findById(orderItemId);
		if (!resultFromDb.isPresent()) {
			throw new DetailsNotFoundException("order item with id " + orderId + " not found");
		}
		OrderItem result = resultFromDb.get();
		System.out.println("result.getOrderId()" + result.getOrderId() + " orderId " + orderId );
		if (!result.getOrderId().equals(orderId)) {
			throw new IllegalArgumentException("invalid order id");
		}
		return result;
	}

	private BigDecimal calculateTotal(OrderDetails orderDetails) {
		BigDecimal result = new BigDecimal(0);
		for(OrderItem item:orderDetails.getOrderItems()){
			result = result.add(BigDecimal.valueOf(item.getQuantity() * item.getCatalogItem().getPrice().doubleValue()));
		};
		return result;
	}
}
