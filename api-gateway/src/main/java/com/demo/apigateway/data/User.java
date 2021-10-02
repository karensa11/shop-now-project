package com.demo.apigateway.data;

import com.fasterxml.jackson.annotation.JsonProperty;

public class User {
	
	private Long id;
	
	@JsonProperty("isAdmin")
	private Boolean isAdmin;

	@JsonProperty("isUser")
	private Boolean isUser;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Boolean getIsAdmin() {
		return isAdmin;
	}

	public Boolean getIsUser() {
		return isUser;
	}

	public void setIsAdmin(Boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public void setIsUser(Boolean isUser) {
		this.isUser = isUser;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", isAdmin=" + isAdmin + ", isUser=" + isUser + "]";
	}
}
