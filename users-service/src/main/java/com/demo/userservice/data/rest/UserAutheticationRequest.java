package com.demo.userservice.data.rest;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class UserAutheticationRequest {
	
	@Email
	private String email;
	
	@Size(min=4, message="passwordPartial should have aqt least 4 characters")
	@Pattern(regexp="[a-zA-Z0-9]{4,}", message="Invalid password pattern")
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
	@Override
	public String toString() {
		return "UserAutheticationRequest [email=" + email + ", passwordPartial=" + passwordPartial + "]";
	}
}
