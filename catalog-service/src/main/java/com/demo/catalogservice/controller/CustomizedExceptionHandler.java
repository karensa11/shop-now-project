package com.demo.catalogservice.controller;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
@RestController
public class CustomizedExceptionHandler extends com.demo.rest.webservices.controller.CustomizedExceptionHandler {
	
}