package com.demo.catalogservice.data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Category {

	@Id
	private Long id;
	private String name;
	private String description;
	private String imageUrl;
	public Long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getDescription() {
		return description;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	
}
