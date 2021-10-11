package com.demo.orderservice.data.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.demo.orderservice.data.feign.CatalogItem;

@Entity
public class OrderItem {

	@Id
	@GeneratedValue
	private Long id;
	
	@CreationTimestamp
	private LocalDateTime creationDate;
	
	@UpdateTimestamp
	private LocalDateTime updateDate;
	
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
	public LocalDateTime getCreationDate() {
		return creationDate;
	}
	public LocalDateTime getUpdateDate() {
		return updateDate;
	}
	public void setCreationDate(LocalDateTime creationDate) {
		this.creationDate = creationDate;
	}
	public void setUpdateDate(LocalDateTime updateDate) {
		this.updateDate = updateDate;
	}
}
