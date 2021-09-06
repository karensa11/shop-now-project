package com.demo.tracking.messages;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.demo.tracking.data.Notification;
import com.demo.tracking.repository.NotificationRepository;

@Component
public class MessagesConsumer {
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private NotificationRepository notificationRepository;
	
	@KafkaListener(topics = "karen", groupId = "consumer")
	public void consume(NotificationMessage message) {
		logger.info("Received Message: {}, userId: {}", message.getMessage(), message.getUserId());
	    Notification notification = new Notification();
	    notification.setMessage(message.getMessage());
	    notification.setUserId(message.getUserId());
	    notificationRepository.save(notification);
	}
}
