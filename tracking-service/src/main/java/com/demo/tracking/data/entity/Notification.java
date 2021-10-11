package com.demo.tracking.data.entity;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Notification {

	@Id
	@GeneratedValue
	private Long id;
	
	@CreationTimestamp
	private Timestamp creationDate;

	private Long userId;

	@NotNull
	private String message;

	public Long getId() {
		return id;
	}

	public Long getUserId() {
		return userId;
	}

	public String getMessage() {
		return message;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Timestamp getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Timestamp creationDate) {
		this.creationDate = creationDate;
	}
}
