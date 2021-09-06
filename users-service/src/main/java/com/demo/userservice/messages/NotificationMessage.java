package com.demo.userservice.messages;

public class NotificationMessage {
	private String message;
	private Long userId;
	public String getMessage() {
		return message;
	}
	public Long getUserId() {
		return userId;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
}
