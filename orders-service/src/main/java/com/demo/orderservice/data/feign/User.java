package com.demo.orderservice.data.feign;

public class User {

	private Long id;
	private Boolean isGuest;

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Boolean getIsGuest() {
		return isGuest;
	}
	public void setIsGuest(Boolean isGuest) {
		this.isGuest = isGuest;
	}
}
