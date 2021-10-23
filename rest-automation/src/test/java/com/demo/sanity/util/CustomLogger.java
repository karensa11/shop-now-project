package com.demo.sanity.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.demo.sanity.util.SharedTestData.TestData;

public class CustomLogger {
	private static final DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");

	public static void message(TestData testData, String message) {
		StringBuilder resultMessage = new StringBuilder();
		resultMessage.append(LocalDateTime.now().format(myFormatObj));
		resultMessage.append(" | ");
		if (message != null && !message.isEmpty()) {
			resultMessage.append(message);
		}
		SharedTestData.instance.pushLogEntry(testData.getTestCode(), testData.getTestSuite(), resultMessage.toString());
		System.out.println(resultMessage.toString());
	}
}
