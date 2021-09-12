package com.demo.tracking.messages;
import java.util.Map;

import org.apache.kafka.clients.consumer.ConsumerRecord;
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
	public void consume(ConsumerRecord<String, Map<String, Object>> message) {
		Map<String, Object> value = message.value();
		logger.info("Received Message: {}, userId: {}", value.get("message"),  value.get("userId"));
	    Notification notification = new Notification();
	    notification.setMessage((String) value.get("message"));
	    notification.setUserId(((Integer) value.get("userId")).longValue());
	    notificationRepository.save(notification);
	}
}
