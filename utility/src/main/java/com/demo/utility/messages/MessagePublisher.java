package com.demo.utility.messages;

import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaAdmin;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.SendResult;
import org.springframework.kafka.support.serializer.JsonSerializer;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

public class MessagePublisher<T> {

	private Logger logger = LoggerFactory.getLogger(getClass());

	@Value(value = "${spring.kafka.producer.bootstrap-servers}")
	private String bootstrapAddress;
	
	private String topic;
	
	protected MessagePublisher(String topic) {
		this.topic = topic;
	}

    @Bean
    public KafkaAdmin kafkaAdmin() {
    	logger.info("Creating kafkaAdmin");
        Map<String, Object> configs = new HashMap<>();
        configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        return new KafkaAdmin(configs);
    }

    @Bean
    public NewTopic topic1() {
    	logger.info("Creating topic {}", topic);
         return new NewTopic(topic, 1, (short) 1); // TODO - move topic name to const
    }
    
	@Bean
	private ProducerFactory<String, T> producerFactory() {
		logger.info("creating producer with address {}", bootstrapAddress);
		Map<String, Object> configProps = new HashMap<>();
		configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
		configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
		configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
		return new DefaultKafkaProducerFactory<String, T>(configProps);
	}

	@Bean
	private KafkaTemplate<String, T> kafkaTemplate() {
		return new KafkaTemplate<>(producerFactory());
	}

	public void sendMessage(T message) {
		try {
			
			KafkaTemplate<String, T> kafkaTemplate = kafkaTemplate();
			
			ListenableFuture<SendResult<String, T>> future = kafkaTemplate.send(topic, message);
			future.addCallback(new ListenableFutureCallback<SendResult<String, T>>() {

				@Override
				public void onSuccess(SendResult<String, T> result) {
					logger.info("Sent message=[" + result + 
							"] with offset=[" + result.getRecordMetadata().offset() + "]");
				}
				@Override
				public void onFailure(Throwable ex) {
					logger.info("Unable to send message=[" 
							+ message + "] due to : " + ex.getMessage());
				}
			});
		} catch (Exception e) {
			logger.error("sendMessage failed to send", e);
		}
	}
}
