package com.demo.utility.messages;

public class MessageWrapper <T> {
	private T message;

	public T getMessage() {
		return message;
	}

	public void setMessage(T message) {
		this.message = message;
	}
}
