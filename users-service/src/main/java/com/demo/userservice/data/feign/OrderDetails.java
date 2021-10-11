package com.demo.userservice.data.feign;

import java.time.LocalDateTime;
import java.util.List;

public class OrderDetails {

	private Long id;
	private LocalDateTime creationDate;
	private Long userId;
	private String status;
	private List<OrderItem> orderItems;
	
	public Long getId() {
		return id;
	}
	public String getStatus() {
		return status;
	}
	public LocalDateTime getCreationDate() {
		return creationDate;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public void setCreationDate(LocalDateTime creationDate) {
		this.creationDate = creationDate;
	}
	public List<OrderItem> getOrderItems() {
		return orderItems;
	}
	public void setOrderItems(List<OrderItem> orderItems) {
		this.orderItems = orderItems;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
}
