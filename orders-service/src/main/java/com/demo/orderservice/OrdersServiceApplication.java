package com.demo.orderservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

import com.demo.utility.exception.EnableCustomizedExceptionHandling;
import com.demo.utility.validation.EnableSecurityValidation;

@EnableSecurityValidation
@EnableCustomizedExceptionHandling
@EnableFeignClients
@SpringBootApplication
public class OrdersServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrdersServiceApplication.class, args);
	}
}
