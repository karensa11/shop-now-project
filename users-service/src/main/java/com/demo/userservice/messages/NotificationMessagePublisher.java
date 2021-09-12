package com.demo.userservice.messages;

import org.springframework.stereotype.Component;

import com.demo.utility.messages.MessagePublisher;

@Component
public class NotificationMessagePublisher extends MessagePublisher<NotificationData> {
	protected NotificationMessagePublisher() {
		super("karen");
	}

	public void sendMessage(NotificationData message) {
		super.sendMessage(message);
	}
}
