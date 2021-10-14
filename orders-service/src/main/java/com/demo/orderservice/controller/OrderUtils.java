package com.demo.orderservice.controller;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.demo.orderservice.data.entity.OrderDetails;
import com.demo.orderservice.data.entity.OrderItem;
import com.demo.orderservice.data.feign.CatalogItem;
import com.demo.orderservice.feign.CatalogFeign;
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
	private CatalogFeign catalogService;

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
			throw new IllegalArgumentException("invalid user id. order user " + result.getUserId() + ", input user " + authenticationId);
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
		BigDecimal result = new BigDecimal(0);
		for(OrderItem item:orderDetails.getOrderItems()){
			result = result.add(BigDecimal.valueOf(item.getQuantity() * item.getCatalogItem().getPrice().doubleValue()));
		};
		return result;
	}

	public void getCatalogItemsAndCalculateTotal(OrderDetails orderDetails) {
		int totalItemsNumber = 0;
		for (OrderItem orderItem:orderDetails.getOrderItems()) {
			CatalogItem catalogItem = catalogService.getCatalogItem(orderItem.getCatalogId());
			orderItem.setCatalogItem(catalogItem);
			totalItemsNumber += orderItem.getQuantity();
			orderItem.setItemPrice(catalogItem.getPrice().multiply(BigDecimal.valueOf(orderItem.getQuantity())));
		}
		orderDetails.setTotalPrice(calculateTotal(orderDetails));
		orderDetails.setTotalItemsNumber(totalItemsNumber);
	}
}
