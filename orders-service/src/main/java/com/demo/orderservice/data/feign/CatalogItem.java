package com.demo.orderservice.data.feign;

import java.math.BigDecimal;

public class CatalogItem {
	private Long id;
	private Long categoryId;
	private String name;
	private String description;
	private BigDecimal price;
	private String imageUrl;
	private String port;
	public Long getId() {
		return id;
	}
	public Long getCategoryId() {
		return categoryId;
	}
	public String getName() {
		return name;
	}
	public String getDescription() {
		return description;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getPort() {
		return port;
	}
	public void setPort(String port) {
		this.port = port;
	}
}
