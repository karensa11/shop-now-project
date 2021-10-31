package com.demo.sanity.util;

import org.testng.Assert;

import com.demo.sanity.util.SharedTestData.TestData;
import com.google.gson.Gson;

import io.restassured.response.Response;

public class TestUtil { 
	public static void checkArraySize(TestData testData, int expectedSize, Object[] array, String name) {
		CustomLogger.message(testData, "Checking " + name + " size. Expected size " +expectedSize);
		Assert.assertEquals(array.length, expectedSize);
	}

	public static void verifyFieldValue(TestData testData, String expectedValue, String fieldValue, String name) {
		CustomLogger.message(testData, "Checking " + name + " value. Expected value " + expectedValue);
		Assert.assertEquals(fieldValue, expectedValue);
	}

	public static void verifyFieldValue(TestData testData, int expectedValue, int fieldValue, String name) {
		CustomLogger.message(testData, "Checking " + name + " value. Expected value " + expectedValue);
		Assert.assertEquals(fieldValue, expectedValue);
	}

	public static void verifyFieldValue(TestData testData, boolean expectedValue, boolean fieldValue, String name) {
		CustomLogger.message(testData, "Checking " + name + " value. Expected value " + expectedValue);
		Assert.assertEquals(fieldValue, expectedValue);
	}

	public static void verifyNotNull(TestData testData, Object fieldValue, String name) {
		CustomLogger.message(testData, "Checking " + name + " not null");
		Assert.assertNotNull(fieldValue);
	}

	public static void logAPI(TestData testData, String api, int expectedStatusCode, String method) {
		CustomLogger.message(testData, "Checking API " + method + " " + api);
		CustomLogger.message(testData, "Expected status " + expectedStatusCode);
	}
	
	public static void logAPI(TestData testData, String api, int expectedStatusCode, String body, String method) {
		logAPI(testData, api, expectedStatusCode, method);
		CustomLogger.message(testData, "Request body " + body);
	}

	public static void logResponse(TestData testData, Response response) {
		CustomLogger.message(testData, "response " + response.asString());
	}

	public static TestData getMethodName() {
		StackTraceElement[] stackTrace = new Throwable().getStackTrace();
		TestData testData = 
				new TestData(
						stackTrace[1].getMethodName(), 
						stackTrace[1].getClassName().substring(stackTrace[1].getClassName().lastIndexOf(".") + 1));
		return testData;
	}
	
	public static <T> T getObjectFromResponse(Response response, Class<T> requiredClass) {
		Gson g = new Gson();
		T reponseObj = g.fromJson(response.asString(), requiredClass);
		return reponseObj;
	}
}
