package com.demo.sanity.data;

public class OrderItem {

	private Long id;
	private Long orderId;
	private Long catalogId;
	private int quantity;
	private CatalogItem catalogItem;
	public Long getId() {
		return id;
	}
	public Long getCatalogId() {
		return catalogId;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setCatalogId(Long catalogId) {
		this.catalogId = catalogId;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Long getOrderId() {
		return orderId;
	}
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}
	public CatalogItem getCatalogItem() {
		return catalogItem;
	}
	public void setCatalogItem(CatalogItem catalogItem) {
		this.catalogItem = catalogItem;
	}
}
