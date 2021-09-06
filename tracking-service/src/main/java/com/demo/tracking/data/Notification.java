package com.demo.tracking.data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Notification {

	@Id
	@GeneratedValue
	private Long id;

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
}
