package com.demo.userservice.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import javax.validation.constraints.Size;

@Entity
public class User {

	@Id
	@GeneratedValue
	private Long id;
	
	@Size(min=2, message="Name should have aqt least 2 characters")
	private String name;
	@Transient
	private OrderDetails orderDetails;
	public Long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public OrderDetails getOrderDetails() {
		return orderDetails;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setOrderDetails(OrderDetails orderDetails) {
		this.orderDetails = orderDetails;
	}
	
}
