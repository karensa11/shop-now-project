package com.demo.catalogservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.demo.utility.exception.EnableCustomizedExceptionHandling;
import com.demo.utility.validation.EnableSecurityValidation;

@EnableSecurityValidation
@EnableCustomizedExceptionHandling
@SpringBootApplication
public class CatalogServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(CatalogServiceApplication.class, args);
	}
}
