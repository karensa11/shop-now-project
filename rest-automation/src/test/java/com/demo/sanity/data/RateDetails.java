package com.demo.sanity.data;

public class RateDetails {
	private Long id;
	private Long catalogId;
	private Long userId;
	private Integer rate;
	private String message;

	public Long getId() {
		return id;
	}

	public Long getCatalogId() {
		return catalogId;
	}

	public Integer getRate() {
		return rate;
	}

	public String getMessage() {
		return message;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setCatalogId(Long catalogId) {
		this.catalogId = catalogId;
	}

	public void setRate(Integer rate) {
		this.rate = rate;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
}
