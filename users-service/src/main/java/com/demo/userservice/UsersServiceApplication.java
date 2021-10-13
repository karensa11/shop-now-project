package com.demo.userservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

import com.demo.utility.exception.EnableCustomizedExceptionHandling;
import com.demo.utility.validation.EnableSecurityValidation;

@EnableSecurityValidation
@EnableCustomizedExceptionHandling
@EnableFeignClients
@SpringBootApplication
public class UsersServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UsersServiceApplication.class, args);
	}
}
