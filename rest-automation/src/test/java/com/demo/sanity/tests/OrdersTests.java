package com.demo.sanity.tests;

import static com.demo.sanity.util.TestConsts.*;
import static io.restassured.RestAssured.given;

import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.demo.sanity.data.OrderDetails;
import com.demo.sanity.util.TestConsts;
import com.demo.sanity.util.TestUtil;
import com.demo.sanity.util.SharedTestData.TestData;

import io.restassured.response.Response;

public class OrdersTests 
{
	@Parameters({"orderId", "userId", "item0Name"})
	@Test
	private void retrieveOrderDetails(String orderId, String userId, String item0Name) {
		TestData testData = TestUtil.getMethodName();
		String API = TestConsts.ENV_GATEWAY + "orders-service/msp/orders/v1/"+orderId;
		int expectedStatusCode = RESPONSE_STATUS_SUCCESS;
		String method  = REQUEST_METHOD_GET;
		TestUtil.logAPI(testData, API, expectedStatusCode, method);

		Response response = 
				given()
				.header(HEADER_AUTHENTICATION_ID, userId)
				.expect()
				.statusCode(expectedStatusCode)
				.when()
				.get(API);
		TestUtil.logResponse(testData, response);
		
		OrderDetails reponseObj = TestUtil.getObjectFromResponse(response, OrderDetails.class);
		TestUtil.verifyFieldValue(testData, reponseObj.getStatus(), ORDER_STATUS_OPEN, "status");
		TestUtil.verifyFieldValue(testData, Long.valueOf(reponseObj.getUserId()).toString(), userId, "user id");
		TestUtil.checkArraySize(testData, 2, reponseObj.getOrderItems(), "order items");
		TestUtil.verifyNotNull(testData, reponseObj.getOrderItems()[0].getCatalogItem(), "order items [0].catalog item");
		TestUtil.verifyFieldValue(testData, reponseObj.getOrderItems()[0].getCatalogItem().getName(), item0Name, "order items [0].catalog item.name");
		TestUtil.verifyNotNull(testData, reponseObj.getOrderItems()[0].getCatalogItem().getDescription(), "order items [0].catalog item.description");
	}

	@Parameters({"orderId", "userId", "item0Name"})
	@Test
	private void retrieveOrderDetailsNegative(String orderId, String userId, String item0Name) {
		TestData testData = TestUtil.getMethodName();
		String API = TestConsts.ENV_GATEWAY + "orders-service/msp/orders/v1/100";
		int expectedStatusCode = RESPONSE_STATUS_NOT_FOUND;
		String method  = REQUEST_METHOD_GET;
		TestUtil.logAPI(testData, API, expectedStatusCode, method);

		Response response = 
				given()
				.header(HEADER_AUTHENTICATION_ID, userId)
				.expect()
				.statusCode(expectedStatusCode)
				.when()
				.get(API);
		TestUtil.logResponse(testData, response);
	}

	@Parameters({"userId"})
	@Test
	private void retrieveOpenOrderForUser(String userId) {
		TestData testData = TestUtil.getMethodName();
		String API = TestConsts.ENV_GATEWAY + "orders-service/msp/orders/v1/user/open";
		int expectedStatusCode = RESPONSE_STATUS_SUCCESS;
		String method  = REQUEST_METHOD_GET;
		TestUtil.logAPI(testData, API, expectedStatusCode, method);

		Response response = 
				given()
				.header(HEADER_AUTHENTICATION_ID, userId)
				.expect()
				.statusCode(expectedStatusCode)
				.when()
				.get(API);
		TestUtil.logResponse(testData, response);
		
		OrderDetails reponseObj = TestUtil.getObjectFromResponse(response, OrderDetails.class);
		TestUtil.verifyNotNull(testData, reponseObj, "Response");
	}

	@Parameters({"userId"})
	@Test
	private void retrieveNotOpenOrderForUser(String userId) {
		TestData testData = TestUtil.getMethodName();
		String API = TestConsts.ENV_GATEWAY + "orders-service/msp/orders/v1/user/not-open";
		int expectedStatusCode = RESPONSE_STATUS_SUCCESS;
		String method  = REQUEST_METHOD_GET;
		TestUtil.logAPI(testData, API, expectedStatusCode, method);

		Response response = 
				given()
				.header(HEADER_AUTHENTICATION_ID, userId)
				.expect()
				.statusCode(expectedStatusCode)
				.when()
				.get(API);
		TestUtil.logResponse(testData, response);
		
		OrderDetails[] reponseObj = TestUtil.getObjectFromResponse(response, OrderDetails[].class);
		TestUtil.checkArraySize(testData, 0, reponseObj, "response");
	}

	@Parameters({"userId2", "catalogId"})
	@Test
	private void createOrder(String userId2, String catalogId) {
		TestData testData = TestUtil.getMethodName();
		String API = TestConsts.ENV_GATEWAY + "orders-service/msp/orders/v1/";
		int expectedStatusCode = RESPONSE_STATUS_SUCCESS;
		String body = "{\"catalogId\":" + catalogId +",\"quantity\": 1}";
		String method  = REQUEST_METHOD_POST;
		TestUtil.logAPI(testData, API, expectedStatusCode, body, method);

		Response response = 
				given()
				.header(HEADER_CONTENT_TYPE, APPLICATION_JSON)
				.header(HEADER_AUTHENTICATION_ID, userId2)
				.body(body)
				.expect()
				.statusCode(expectedStatusCode)
				.when()
				.post(API);
		TestUtil.logResponse(testData, response);
	}

	@Parameters({"userId", "catalogId"})
	@Test
	private void createOrderNegative(String userId, String catalogId) {
		TestData testData = TestUtil.getMethodName();
		String API = TestConsts.ENV_GATEWAY + "orders-service/msp/orders/v1/";
		int expectedStatusCode = RESPONSE_STATUS_CONFLICT;
		String body = "{\"catalogId\":" + catalogId +",\"quantity\": 1}";
		String method  = REQUEST_METHOD_POST;
		TestUtil.logAPI(testData, API, expectedStatusCode, body, method);

		Response response = 
				given()
				.header(HEADER_CONTENT_TYPE, APPLICATION_JSON)
				.header(HEADER_AUTHENTICATION_ID, userId)
				.body(body)
				.expect()
				.statusCode(expectedStatusCode)
				.when()
				.post(API);
		TestUtil.logResponse(testData, response);
	}
}
