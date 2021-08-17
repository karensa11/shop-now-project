package com.demo.orderservice.data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;

@Entity
public class OrderItem {

	@Id
	@GeneratedValue
	private Long id;
	private Long orderId;
	private Long catalogId;
	private int quantity;
	@Transient
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
