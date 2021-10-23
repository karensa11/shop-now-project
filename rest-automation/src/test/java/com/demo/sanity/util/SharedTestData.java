package com.demo.sanity.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.testng.ITestResult;

public class SharedTestData {

	public static final SharedTestData instance = new SharedTestData();
	private SharedTestData() {}

	public static class TestData {
		private String testCode;
		private String testSuite;
		private List<String> logEntries = new ArrayList<String>();
		private ITestResult testResult;

		public TestData(String testCode, String testSuite) {
			this.testCode = testCode;
			this.testSuite = testSuite;
		}

		@Override
		public String toString() {
			return testSuite + " " + testCode + " " + logEntries.toString();
		}

		public String getTestCode() {
			return testCode;
		}

		public String getTestSuite() {
			return testSuite;
		}

		public List<String> getLogEntries() {
			return logEntries;
		}

		public ITestResult getTestResult() {
			return testResult;
		}

		public void setTestResult(ITestResult testResult) {
			this.testResult = testResult;
		}
	}
	public static class SuiteData {
		private Map<String, TestData> testsData = new HashMap<String, SharedTestData.TestData>();
		TestData getTest(String testCode) {
			return testsData.get(testCode);
		}
		void addTest(TestData testData) {
			this.testsData.put(testData.getTestCode(), testData);
		}
		public int getFailedTestsCount() {
			int result = 0;
			for (TestData testData:testsData.values()) {
				if (testData.getTestResult() == null) {
					throw new IllegalStateException("Please set test result");
				}
				if (testData.getTestResult().getStatus() == ITestResult.FAILURE) {
					result++;
				}
			}
			return result;
		}
		public int getSkippedTestsCount() {
			int result = 0;
			for (TestData testData:testsData.values()) {
				if (testData.getTestResult() == null) {
					throw new IllegalStateException("Please set test result");
				}
				if (testData.getTestResult().getStatus() == ITestResult.SKIP) {
					result++;
				}
			}
			return result;
		}
		public Collection<TestData> getAllTests() {
			return testsData.values();
		}
		public int size() {
			return testsData.size();
		}
	}
	private Map<String, SuiteData> testsData = new HashMap<String, SuiteData>();
	private Map<String, TestData> testsByCode = new HashMap<String, TestData>();
	public void pushLogEntry(String testCode, String testSuite, String message) {
		SuiteData testClass = testsData.get(testSuite);
		if (testClass == null) {
			testClass = new SuiteData();
			testsData.put(testSuite, testClass);
		}

		TestData testData = testClass.getTest(testCode);
		if (testData == null) {
			testData = new TestData(testCode, testSuite);
			testClass.addTest(testData);
			testsByCode.put(testCode, testData);
		}
		testData.logEntries.add(message);
	}
	public Map<String, SuiteData> getTestsData() {
		return this.testsData;
	}
	public void setTestResult(String testCode, ITestResult testResult) {
		TestData testData = testsByCode.get(testCode);
		testData.setTestResult(testResult);
	}
}
