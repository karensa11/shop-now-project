package com.demo.utility.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Thrown when service user tries to get details of invalid data
 * (e.g. data already deleted) 
 * 
 * @author KARENSA
 *
 */
@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class DetailsNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public DetailsNotFoundException(String message) {
		super(message);
	}
}
