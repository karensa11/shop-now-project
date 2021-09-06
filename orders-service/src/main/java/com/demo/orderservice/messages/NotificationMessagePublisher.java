package com.demo.orderservice.messages;

import org.springframework.stereotype.Component;

import com.demo.utility.messages.MessagePublisher;

@Component
public class NotificationMessagePublisher extends MessagePublisher<NotificationMessage> {
	protected NotificationMessagePublisher() {
		super("karen");
	}

	public void sendMessage(NotificationMessage message) {
		super.sendMessage(message);
	}
}
