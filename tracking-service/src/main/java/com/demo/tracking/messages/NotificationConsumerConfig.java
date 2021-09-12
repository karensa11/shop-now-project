package com.demo.tracking.messages;

import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;

import com.demo.utility.messages.KafkaConsumerConfig;

@EnableKafka
@Configuration
public class NotificationConsumerConfig extends KafkaConsumerConfig {
}
