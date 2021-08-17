package com.demo.orderservice.data;

public class OrderResponse {
	private Long id;

	public OrderResponse(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
