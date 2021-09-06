package com.demo.utility.messages;
import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;

public class KafkaConsumerConfig<T> {

	@Value(value = "${spring.kafka.consumer.bootstrap-servers}")
	private String bootstrapAddress; // TODO - move to config class
	
	private Class<T> theClass;
	private String groupId;
	
	protected KafkaConsumerConfig(Class<T> theClass, String groupId) {
		this.theClass = theClass;
		this.groupId = groupId;
	}

	@Bean
	public ConsumerFactory<String, T> consumerFactory() {
		Map<String, Object> props = new HashMap<>();
		props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
		props.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
		props.put(JsonSerializer.ADD_TYPE_INFO_HEADERS, false);
		props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
		props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class.getName());
		JsonDeserializer<T> deserializer = new JsonDeserializer<>(theClass, false);
		deserializer.addTrustedPackages("*");
		DefaultKafkaConsumerFactory<String, T> factory = 
				new DefaultKafkaConsumerFactory<>(props, new StringDeserializer(), deserializer);
		return factory;
	}

	@Bean
	public ConcurrentKafkaListenerContainerFactory<String, T> kafkaListenerContainerFactory() {
		ConcurrentKafkaListenerContainerFactory<String, T> factory =
				new ConcurrentKafkaListenerContainerFactory<>();
		factory.setConsumerFactory(consumerFactory());
		return factory;
	}
}