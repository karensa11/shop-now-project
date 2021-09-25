package com.demo.userservice.data;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class User {

	@Id
	@GeneratedValue
	private Long id;
	
	@CreationTimestamp
	private LocalDateTime creationDate;
	
	@UpdateTimestamp
	private LocalDateTime updateDate;
	
	@Size(min=2, message="Name should have aqt least 2 characters")
	@NotEmpty
	private String name;
	
	@Email
	private String email;

	@Size(min=4, message="passwordPartial should have aqt least 4 characters")
	@NotEmpty
	private String passwordPartial;
	
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPasswordPartial() {
		return passwordPartial;
	}
	public void setPasswordPartial(String passwordPartial) {
		this.passwordPartial = passwordPartial;
	}
	public LocalDateTime getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(LocalDateTime creationDate) {
		this.creationDate = creationDate;
	}
}
