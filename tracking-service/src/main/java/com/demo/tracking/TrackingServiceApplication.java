package com.demo.tracking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.demo.utility.exception.EnableCustomizedExceptionHandling;
import com.demo.utility.validation.EnableSecurityValidation;

@EnableSecurityValidation
@EnableCustomizedExceptionHandling
@SpringBootApplication
public class TrackingServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(TrackingServiceApplication.class, args);
	}
}
