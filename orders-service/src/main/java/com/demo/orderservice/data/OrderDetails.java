package com.demo.orderservice.data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class OrderDetails {

	@Id
	@GeneratedValue
	private Long id;
	private Long userId;
	private String status = OrderStatus.OPEN;
	@CreationTimestamp
	private LocalDateTime creationDate;
	@Transient
	private BigDecimal totalPrice;
	
	@OneToMany(mappedBy="orderId")
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
	public BigDecimal getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}
}
