package com.demo.orderservice.data;

public class OrderItemInput {
	private int quantity;
	private Long catalogId;
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Long getCatalogId() {
		return catalogId;
	}
	public void setCatalogId(Long catalogId) {
		this.catalogId = catalogId;
	}
}
