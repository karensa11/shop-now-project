package com.demo.userservice.data;

public class UserAutheticationRequest {
	private String email;
	private String passwordPartial;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPasswordPartial() {
		return passwordPartial;
	}
	public void setPasswordPartial(String passwordPartial) {
		this.passwordPartial = passwordPartial;
	}
}
