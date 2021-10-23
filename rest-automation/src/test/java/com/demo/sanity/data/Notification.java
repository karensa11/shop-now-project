package com.demo.sanity.data;

public class Notification {
	private Long id;
	private Long userId;
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
