package com.demo.sanity.tests;

import static com.demo.sanity.util.TestConsts.*;
import static io.restassured.RestAssured.given;

import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.demo.sanity.data.Notification;
import com.demo.sanity.util.TestConsts;
import com.demo.sanity.util.TestUtil;
import com.demo.sanity.util.SharedTestData.TestData;

import io.restassured.response.Response;

public class TrackingTests {

	@Parameters({"userId", "adminId"})
	@Test
	private void getNotificationsForUser(String userId, String adminId) {
		TestData testData = TestUtil.getMethodName();
		String API = TestConsts.ENV_GATEWAY + "tracking-service/msp/tracking/admin/v1/userId/" + userId;
		int expectedStatusCode = RESPONSE_STATUS_SUCCESS;
		String method  = REQUEST_METHOD_GET;
		TestUtil.logAPI(testData, API, expectedStatusCode, method);

		Response response = 
				given()
				.header(HEADER_AUTHENTICATION_ID, adminId)
				.expect()
				.statusCode(expectedStatusCode)
				.when()
				.get(API);
		TestUtil.logResponse(testData, response);
		
		Notification[] reponseObj = TestUtil.getObjectFromResponse(response, Notification[].class);
		TestUtil.checkArraySize(testData, 1, reponseObj, "response");
	}
}
