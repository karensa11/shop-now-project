package com.demo.sanity.tests;

import static io.restassured.RestAssured.given;
import static com.demo.sanity.util.TestConsts.*;

import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.demo.sanity.util.SharedTestData.TestData;
import com.demo.sanity.util.TestConsts;
import com.demo.sanity.data.CatalogItem;
import com.demo.sanity.data.Category;
import com.demo.sanity.util.TestUtil;

import io.restassured.response.Response;

public class CatalogTests
{
	private static final String CATALOG_SERVICE_PREFIX = "catalog-service/msp/catalog/v1";
	
	@Parameters({"category0Name", "category1Name"})
	@Test
	private void retrieveCategories(String category0Name, String category1Name) {
		TestData testData = TestUtil.getMethodName();
		String API = TestConsts.ENV_GATEWAY + CATALOG_SERVICE_PREFIX + "/categories";
		int expectedStatusCode = RESPONSE_STATUS_SUCCESS;
		String method  = REQUEST_METHOD_GET;
		TestUtil.logAPI(testData, API, expectedStatusCode, method);
		
		Response response = 
				given()
				.expect()
				.statusCode(expectedStatusCode)
				.when()
				.get(API);
		TestUtil.logResponse(testData, response);
		
		Category[] reponseObj = TestUtil.getObjectFromResponse(response, Category[].class);
		TestUtil.checkArraySize(testData, 2, reponseObj, "response");
		TestUtil.verifyFieldValue(testData, reponseObj[0].getName(), category0Name, "response[0].name");
		TestUtil.verifyNotNull(testData, reponseObj[0].getDescription(), "response[0].description");
		TestUtil.verifyNotNull(testData, reponseObj[0].getImageUrl(), "response[0].image url");
		TestUtil.verifyFieldValue(testData, reponseObj[1].getName(), category1Name, "response[1].name");
		TestUtil.verifyNotNull(testData, reponseObj[1].getDescription(), "response[1].description");
		TestUtil.verifyNotNull(testData, reponseObj[1].getImageUrl(), "response[1].image url");
	}

	@Parameters({"item0Name"})
	@Test
	private void retrieveCatalogItem(String item0Name) {
		TestData testData = TestUtil.getMethodName();
		String API = TestConsts.ENV_GATEWAY + CATALOG_SERVICE_PREFIX + "/items/1";
		int expectedStatusCode = RESPONSE_STATUS_SUCCESS;
		String method  = REQUEST_METHOD_GET;
		TestUtil.logAPI(testData, API, expectedStatusCode, method);
		
		Response response = 
				given()
				.expect()
				.statusCode(expectedStatusCode)
				.when()
				.get(API);
		TestUtil.logResponse(testData, response);
		
		CatalogItem reponseObj = TestUtil.getObjectFromResponse(response, CatalogItem.class);
		TestUtil.verifyFieldValue(testData, reponseObj.getName(), item0Name, "name");
		TestUtil.verifyNotNull(testData, reponseObj.getDescription(), "description");
	}

	@Test
	private void retrieveCatalogItemNegative() {
		TestData testData = TestUtil.getMethodName();
		String API = TestConsts.ENV_GATEWAY + CATALOG_SERVICE_PREFIX + "/items/100";
		int expectedStatusCode = RESPONSE_STATUS_NOT_FOUND;
		String method  = REQUEST_METHOD_GET;
		TestUtil.logAPI(testData, API, expectedStatusCode, method);
		
		Response response = 
				given()
				.expect()
				.statusCode(expectedStatusCode)
				.when()
				.get(API);
		TestUtil.logResponse(testData, response);
	}

	@Parameters({"categoryId", "item0Name"})
	@Test
	private void retrieveCatalogItemsPhones(String categoryId, String item0Name) {
		TestData testData = TestUtil.getMethodName();
		String API = TestConsts.ENV_GATEWAY + CATALOG_SERVICE_PREFIX + "/categories/"+categoryId+"/items";
		int expectedStatusCode = RESPONSE_STATUS_SUCCESS;
		String method  = REQUEST_METHOD_GET;
		TestUtil.logAPI(testData, API, expectedStatusCode, method);
		
		Response response = 
				given()
				.expect()
				.statusCode(expectedStatusCode)
				.when()
				.get(API);
		TestUtil.logResponse(testData, response);
		
		CatalogItem[] reponseObj = TestUtil.getObjectFromResponse(response, CatalogItem[].class);
		TestUtil.checkArraySize(testData, 12, reponseObj, "catalog items");
		TestUtil.verifyFieldValue(testData, item0Name, reponseObj[0].getName(), "response[0].name");
		TestUtil.verifyNotNull(testData, reponseObj[0].getDescription(), "response[0].description");
	}
}
