package com.demo.sanity.tests;

import static io.restassured.RestAssured.given;
import static com.demo.sanity.util.TestConsts.*;

import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.demo.sanity.data.User;
import com.demo.sanity.util.TestUtil;
import com.demo.sanity.util.SharedTestData.TestData;
import com.demo.sanity.util.TestConsts;

import io.restassured.response.Response;

public class UsersTests
{
	@Parameters({"userEmail", "adminId"})
	@Test
	private void userAdminSearchByEmail(String userEmail, String adminId) {
		TestData testData = TestUtil.getMethodName();
		String API = TestConsts.ENV_GATEWAY + "users-service/msp/users/admin/v1/search-by-email";
		int expectedStatusCode = RESPONSE_STATUS_SUCCESS;
		String method  = REQUEST_METHOD_GET;
		TestUtil.logAPI(testData, API, expectedStatusCode, method);

		Response response = 
				given()
				.header(HEADER_AUTHENTICATION_ID, adminId)
				.param("email", userEmail)
				.expect()
				.statusCode(expectedStatusCode)
				.when()
				.get(API);
		TestUtil.logResponse(testData, response);
	}

	@Parameters({"adminId"})
	@Test
	private void userAdminSearchByEmailNegative(String adminId) {
		TestData testData = TestUtil.getMethodName();
		String API = TestConsts.ENV_GATEWAY + "users-service/msp/users/admin/v1/search-by-email";
		int expectedStatusCode = RESPONSE_STATUS_NOT_FOUND;
		String method  = REQUEST_METHOD_GET;
		TestUtil.logAPI(testData, API, expectedStatusCode, method);

		Response response = 
				given()
				.header(HEADER_AUTHENTICATION_ID, adminId)
				.param("email", "sdfsdfsf@ssdfsf.com")
				.expect()
				.statusCode(expectedStatusCode)
				.when()
				.get(API);
		TestUtil.logResponse(testData, response);
	}

	@Parameters({"userEmail", "userPassword", "userName"})
	@Test
	private void userAuthentication(String userEmail, String userPassword, String userName) {
		TestData testData = TestUtil.getMethodName();
		String API = TestConsts.ENV_GATEWAY + "users-service/msp/users/guest/v1/authenticate";
		int expectedStatusCode = RESPONSE_STATUS_SUCCESS;
		String body = "{\"email\":\"" + userEmail +"\",\"passwordPartial\":\"" +userPassword + "\"}";
		String method  = REQUEST_METHOD_POST;
		TestUtil.logAPI(testData, API, expectedStatusCode, body, method);

		Response response = 
				given()
				.header(HEADER_CONTENT_TYPE, APPLICATION_JSON)
				.body(body)
				.expect()
				.statusCode(expectedStatusCode)
				.when()
				.post(API);
		TestUtil.logResponse(testData, response);

		User reponseObj = TestUtil.getObjectFromResponse(response, User.class);
		TestUtil.verifyFieldValue(testData, reponseObj.getName(), userName, "name");
		TestUtil.verifyFieldValue(testData, reponseObj.getEmail(), userEmail, "email");
		TestUtil.verifyFieldValue(testData, reponseObj.getIsAdmin(), false, "isAdmin");
		TestUtil.verifyFieldValue(testData, reponseObj.getIsGuest(), false, "isGuest");
		TestUtil.verifyNotNull(testData, reponseObj.getOrderDetails(), "order details");
		TestUtil.verifyNotNull(testData, reponseObj.getOrderDetails().getOrderItems(), "order items");
		TestUtil.checkArraySize(testData, 2, reponseObj.getOrderDetails().getOrderItems(), "order items");
	}

	@Test
	private void userAuthenticationNegative() {
		TestData testData = TestUtil.getMethodName();
		String API = TestConsts.ENV_GATEWAY + "users-service/msp/users/guest/v1/authenticate";
		int expectedStatusCode = RESPONSE_STATUS_NOT_FOUND;
		String body = "{\"email\":\"k@k.com\",\"passwordPartial\":\"afadad\"}";
		String method  = REQUEST_METHOD_POST;
		TestUtil.logAPI(testData, API, expectedStatusCode, body, method);

		Response response = 
				given()
				.header(HEADER_CONTENT_TYPE, APPLICATION_JSON)
				.body(body)
				.expect()
				.statusCode(expectedStatusCode)
				.when()
				.post(API);
		TestUtil.logResponse(testData, response);
	}
	
	@Parameters({"newUserEmail", "newUserName", "userPassword"})
	@Test
	private void userCreation(String newUserEmail, String newUserName, String userPassword) {
		TestData testData = TestUtil.getMethodName();
		String API = TestConsts.ENV_GATEWAY + "users-service/msp/users/guest/v1/";
		int expectedStatusCode = RESPONSE_STATUS_SUCCESS;
		String body = "{\"name\":\"" + newUserName +"\",\"email\":\"" + newUserEmail +"\",\"passwordPartial\":\"" +userPassword + "\"}";
		String method  = REQUEST_METHOD_POST;
		TestUtil.logAPI(testData, API, expectedStatusCode, body, method);

		Response response = 
				given()
				.header(HEADER_CONTENT_TYPE, APPLICATION_JSON)
				.body(body)
				.expect()
				.statusCode(expectedStatusCode)
				.when()
				.post(API);
		TestUtil.logResponse(testData, response);
	}

	@Parameters({"userEmail", "newUserName", "userPassword"})
	@Test
	private void userCreationNegative(String userEmail, String newUserName, String userPassword) {
		TestData testData = TestUtil.getMethodName();
		String API = TestConsts.ENV_GATEWAY + "users-service/msp/users/guest/v1/";
		int expectedStatusCode = RESPONSE_STATUS_CONFLICT;
		String body = "{\"name\":\"" + newUserName +"\",\"email\":\"" + userEmail +"\",\"passwordPartial\":\"" +userPassword + "\"}";
		String method  = REQUEST_METHOD_POST;
		TestUtil.logAPI(testData, API, expectedStatusCode, body, method);

		Response response = 
				given()
				.header(HEADER_CONTENT_TYPE, APPLICATION_JSON)
				.body(body)
				.expect()
				.statusCode(expectedStatusCode)
				.when()
				.post(API);
		TestUtil.logResponse(testData, response);
	}
}
