package com.demo.orderservice.controller;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.demo.orderservice.data.entity.OrderDetails;
import com.demo.orderservice.data.entity.OrderItem;
import com.demo.orderservice.data.feign.CatalogItem;
import com.demo.orderservice.data.feign.User;
import com.demo.orderservice.feign.CatalogFeign;
import com.demo.orderservice.feign.UsersInternalFeign;
import com.demo.orderservice.messages.NotificationData;
import com.demo.orderservice.messages.NotificationMessagePublisher;
import com.demo.orderservice.repository.OrderItemRepository;
import com.demo.orderservice.repository.OrderRepository;
import com.demo.utility.exception.DetailsNotFoundException;

@Component
public class OrderUtils {

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private OrderItemRepository orderItemRepository;

	@Autowired
	private CatalogFeign catalogFeign;

	@Autowired
	private NotificationMessagePublisher messagePublisher;

	@Autowired
	private UsersInternalFeign usersInternalFeign;

	public OrderDetails findOrder(Long orderId) {
		Optional<OrderDetails> resultFromDb = orderRepository.findById(orderId);
		if (!resultFromDb.isPresent()) {
			throw new DetailsNotFoundException("order with id " + orderId + " not found");
		}
		return resultFromDb.get();
	}

	public OrderDetails findOrderAndValidate(Long orderId, Long authenticationId) {
		Optional<OrderDetails> resultFromDb = orderRepository.findById(orderId);
		if (!resultFromDb.isPresent()) {
			throw new DetailsNotFoundException("order with id " + orderId + " not found");
		}
		OrderDetails result = resultFromDb.get();
		if (result.getUserId()!=null && !result.getUserId().equals(authenticationId)) {
			User user = usersInternalFeign.getUser(result.getUserId());
			if (!user.getIsGuest()) {
				throw new IllegalArgumentException("invalid user id. order user " + result.getUserId() + ", input user " + authenticationId);
			}
		}
		return result;
	}

	public OrderItem findOrderItemAndValidate(Long orderId, Long orderItemId) {
		Optional<OrderItem> resultFromDb = orderItemRepository.findById(orderItemId);
		if (!resultFromDb.isPresent()) {
			throw new DetailsNotFoundException("order item with id " + orderId + " not found");
		}
		OrderItem result = resultFromDb.get();
		System.out.println("result.getOrderId()" + result.getOrderId() + " orderId " + orderId );
		if (!result.getOrderId().equals(orderId)) {
			throw new IllegalArgumentException("invalid user id. order user ");
		}
		return result;
	}

	private BigDecimal calculateTotal(OrderDetails orderDetails) {
		double result2 = orderDetails.getOrderItems().stream()
				.reduce(0.0, 
						(partialResult, orderItem) -> partialResult + orderItem.getQuantity() * orderItem.getCatalogItem().getPrice().doubleValue(), 
						Double::sum);
		return BigDecimal.valueOf(result2);
	}

	public void getCatalogItemsAndCalculateTotal(OrderDetails orderDetails) {
		int totalItemsNumber = orderDetails.getOrderItems()
				.stream()
				.map(OrderItem::getQuantity)
				.reduce(0, ArithmeticUtils::addInt)
				.intValue();
		orderDetails.getOrderItems().stream()
		.forEach(orderItem -> {
			CatalogItem catalogItem = catalogFeign.getCatalogItem(orderItem.getCatalogId());
			orderItem.setCatalogItem(catalogItem);
			orderItem.setItemPrice(catalogItem.getPrice().multiply(BigDecimal.valueOf(orderItem.getQuantity())));
		});
		orderDetails.setTotalPrice(calculateTotal(orderDetails));
		orderDetails.setTotalItemsNumber(totalItemsNumber);
	}

	public void sendOrderNotification(String message, Long authenticationId) {
		NotificationData notificationMessage = new NotificationData();
		notificationMessage.setMessage(message);
		notificationMessage.setUserId(authenticationId);
		messagePublisher.sendMessage(notificationMessage);
	}
}
class ArithmeticUtils { 
	public static int addInt(int a, int b) {
		return a + b;
	} 
	public static double addDouble(double a, double b) {
		return a + b;
	} 
}
