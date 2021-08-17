package com.demo.rest.webservices.controller;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.demo.utility.exception.DetailsNotFoundException;
import com.demo.utility.exception.ExceptionResponse;

/**
 * Common exception handler for all the controllers.
 * Implement user friendly exception response
 * 
 * @author KARENSA
 *
 */
public class CustomizedExceptionHandler extends ResponseEntityExceptionHandler {
	
	@ExceptionHandler(Exception.class)
	public final ResponseEntity<Object> handleExceptionCust(Exception ex, WebRequest request) throws Exception {
		ExceptionResponse response = new ExceptionResponse(new Date(), ex.getMessage(), request.getDescription(false));
		return new ResponseEntity<Object>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(DetailsNotFoundException.class)
	public final ResponseEntity<Object> handleUserException(Exception ex, WebRequest request) throws Exception {
		ExceptionResponse response = new ExceptionResponse(new Date(), ex.getMessage(), request.getDescription(false));
		return new ResponseEntity<Object>(response, HttpStatus.NOT_FOUND);
	}

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
		ExceptionResponse response = new ExceptionResponse(new Date(), "Validation Failed", getFieldsMessages(ex));
		return new ResponseEntity<Object>(response, HttpStatus.BAD_REQUEST);
	}
	
	private String getFieldsMessages(MethodArgumentNotValidException ex) {
		List<FieldError> errors = ex.getBindingResult().getFieldErrors();
		StringBuilder builder = new StringBuilder();
		for (FieldError error:errors) {
			builder.append(error.getDefaultMessage()).append(", ");
		}
		builder.delete(builder.length()-2, builder.length());
		return builder.toString();
	}
}
