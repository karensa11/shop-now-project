package com.demo.orderservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

@EnableFeignClients
@SpringBootApplication
public class OrdersServiceApplication {

	public static void main(String[] args) {
		System.out.println("Started! karen");
		SpringApplication.run(OrdersServiceApplication.class, args);
	}
}
