package com.demo.sanity.data;

public class OrderDetails {

	private Long id;
	private Long userId;
	private String status;
	private OrderItem[] orderItems;
	
	public Long getId() {
		return id;
	}
	public String getStatus() {
		return status;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public OrderItem[] getOrderItems() {
		return orderItems;
	}
	public void setOrderItems(OrderItem[] orderItems) {
		this.orderItems = orderItems;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
}
