package com.demo.sanity.util;

public interface TestConsts {
	String APPLICATION_JSON = "application/json";
	String HEADER_CONTENT_TYPE ="Content-Type";
	String HEADER_AUTHENTICATION_ID = "authenticationId";
	String ENV_GATEWAY = "http://localhost:8666/";
	int RESPONSE_STATUS_SUCCESS = 200;
	int RESPONSE_STATUS_NOT_FOUND = 404;
	int RESPONSE_STATUS_CONFLICT = 409;
	String ORDER_STATUS_OPEN = "OPEN";
	String REQUEST_METHOD_GET = "GET";
	String REQUEST_METHOD_POST = "POST";
}
