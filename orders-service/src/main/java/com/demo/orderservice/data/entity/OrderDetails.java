package com.demo.orderservice.data.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class OrderDetails {

	@Id
	@GeneratedValue
	private Long id;
	
	@CreationTimestamp
	private LocalDateTime creationDate;
	
	@UpdateTimestamp
	private LocalDateTime updateDate;
	
	private Long userId;
	
	@Enumerated(EnumType.STRING)
	private OrderStatus status = OrderStatus.OPEN;
	
	private LocalDateTime deliveredOn;
	
	@Transient
	private BigDecimal totalPrice;
	
	@Transient
	private int totalItemsNumber;
	
	@OneToMany(mappedBy="orderId")
	private List<OrderItem> orderItems;
	
	
	
	public Long getId() {
		return id;
	}
	public OrderStatus getStatus() {
		return status;
	}
	public LocalDateTime getCreationDate() {
		return creationDate;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setStatus(OrderStatus status) {
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
	public BigDecimal getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}
	public int getTotalItemsNumber() {
		return totalItemsNumber;
	}
	public void setTotalItemsNumber(int totalItemsNumber) {
		this.totalItemsNumber = totalItemsNumber;
	}
	public LocalDateTime getDeliveredOn() {
		return deliveredOn;
	}
	public void setDeliveredOn(LocalDateTime deliveredOn) {
		this.deliveredOn = deliveredOn;
	}
}
