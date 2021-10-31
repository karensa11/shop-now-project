package com.demo.sanity.report;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.testng.IReporter;
import org.testng.ISuite;
import org.testng.ITestContext;
import org.testng.ITestResult;
import org.testng.xml.XmlSuite;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import com.demo.sanity.report.data.Chars;
import com.demo.sanity.report.data.GeneralConsts;
import com.demo.sanity.report.data.XMLConsts;
import com.demo.sanity.report.util.FileUtils;
import com.demo.sanity.report.util.HTMLUtils;
import com.demo.sanity.report.util.XMLUtils;
import com.demo.sanity.util.SharedTestData;
import com.demo.sanity.util.SharedTestData.SuiteData;
import com.demo.sanity.util.SharedTestData.TestData;

public class CustomReporter implements IReporter{
	private static final DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy_HH-mm-ss");

	public void generateReport(List<XmlSuite> xmlSuites, List<ISuite> suites, String outputDirectory) {

		try {
			String reportDateStr = LocalDateTime.now().format(myFormatObj);
			copyResources(reportDateStr);
			collectTestResults(suites);
			Document htmlDoc = generateReportHTML();
			writeHTMLTOFS(htmlDoc, reportDateStr);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void collectTestResults(List<ISuite> suites) {
		suites.stream()
		.forEach(suite -> {
			suite.getResults().values().stream()
			.forEach(sr -> {
				ITestContext tc = sr.getTestContext();
				Set<ITestResult> allTests = new HashSet<ITestResult>();
				allTests.addAll(tc.getPassedTests().getAllResults());
				allTests.addAll(tc.getFailedTests().getAllResults());
				allTests.addAll(tc.getSkippedTests().getAllResults());
				allTests.stream()
				.forEach(result -> {
					SharedTestData.instance.setTestResult(result.getName(), result);
				});
			});
		});
	}

	private Document generateReportHTML() throws Exception {

		Map<String, SuiteData> suitesData = SharedTestData.instance.getTestsData();
		Document htmlDoc = XMLUtils.createNewDocument();

		Node html = HTMLUtils.createHTML(htmlDoc);
		HTMLUtils.setTitle(htmlDoc, html, "Rests Testing");

		Node head = HTMLUtils.createHead(htmlDoc, html);
		HTMLUtils.addCSS(htmlDoc, head, "resources/styles.css");
		HTMLUtils.addScript(htmlDoc, head, "resources/scripts.js");
		HTMLUtils.addScript(htmlDoc, head, "resources/jquery.min.js");

		Node body = HTMLUtils.createBody(htmlDoc, html);

		Node titleDiv = HTMLUtils.createDiv(htmlDoc, body, "pageTitle", null, null);
		HTMLUtils.createCenteredDiv(htmlDoc, titleDiv, "pageTitleMain", null, "RESTS TEST REPORT");

		Node mainContent = HTMLUtils.createCenteredDiv(htmlDoc, body, "main-content", null, null);

		Node optionsDiv = HTMLUtils.createDiv(htmlDoc, mainContent, null, null, null);
		HTMLUtils.addButton(htmlDoc, optionsDiv, null, "showContent", 
				"$('#showContent').hide();$('#hideContent').show();showAllElementStartsWith('log-entries-cell')", "+ expand all", "");
		HTMLUtils.addButton(htmlDoc, optionsDiv, null, "hideContent", 
				"$('#hideContent').hide();$('#showContent').show();hideAllElementStartsWith('log-entries-cell')", "+ collapse all", "display: none;");

		HTMLUtils.addBR(htmlDoc, mainContent);

		Node tableContent = HTMLUtils.createCenteredDiv(htmlDoc, mainContent, null, null, null);
		Node table = HTMLUtils.createTable(htmlDoc, tableContent, null);
		suitesData.keySet().stream()
		.forEach(key ->{
			generateReportSוuite(htmlDoc, key, table, suitesData);
		});
		return htmlDoc;
	}

	private void generateReportSוuite(Document htmlDoc, String key, Node table, Map<String, SuiteData> suitesData) {
		String suiteFriendlyName = getTestName(key);
		SuiteData testsData = suitesData.get(key);
		int failedTests = testsData.getFailedTestsCount();
		int skippedTests = testsData.getSkippedTestsCount();
		String suiteText = suiteFriendlyName + " (" + testsData.size() + " tests " + (failedTests > 0 ? ", " + failedTests + " failed" : "") + (skippedTests > 0 ? ", " + skippedTests + " skipped" : "") + ")";
		HTMLUtils.createTableRowWithStyles(htmlDoc, table, new String[] {suiteText}, new String[] {"suite-name"});
		Node testsTD = HTMLUtils.createEmptyRowAndCell(htmlDoc, table, null, 1);
		Node testsTable = HTMLUtils.createTable(htmlDoc, testsTD, null);
		testsData.getAllTests().stream()
		.forEach(testData -> {
			generateReportTest(htmlDoc, key, testsTable, testData);
		});
	}

	private void generateReportTest(Document htmlDoc, String key, Node testsTable, TestData testData) {
		ITestResult testResult = testData.getTestResult();
		String statusStr = testResult.getStatus() == ITestResult.SUCCESS ? 
				"SUCCESS" : testResult.getStatus() == ITestResult.SKIP ?
						"SKIPPED" : testResult.getStatus() == ITestResult.FAILURE ? 
								"FAILURE" : "";
		String nameStr = getTestName(testData.getTestCode());
		Element testRowHeader = HTMLUtils.createTableRowWithStyles(htmlDoc, testsTable, new String[] {
				nameStr, statusStr}, new String[] {"test-name", "test-status test-status-"+statusStr});
		HTMLUtils.setOnClick(testRowHeader, "toggleElement('" + testData.getTestCode() + "');");
		Node logEntriesTD = HTMLUtils.createEmptyRowAndCell(htmlDoc, testsTable, null, 2);
		Node logEntriesDiv = HTMLUtils.createDiv(htmlDoc, logEntriesTD, "log-entries-cell", testData.getTestCode(), null);
		testData.getLogEntries().stream()
		.forEach(logEntry -> {
			HTMLUtils.createDiv(htmlDoc, logEntriesDiv, null, null, logEntry);
		});
		if (testResult.getThrowable() != null) {
			HTMLUtils.createDiv(htmlDoc, logEntriesDiv, "error-message", null, testResult.getThrowable().toString());
		}
	}

	private void writeHTMLTOFS(Document htmlDoc, String reportDateStr) throws TransformerException {
		String reportFolder = System.getProperty("reports.folder") + reportDateStr;
		TransformerFactory tf = TransformerFactory.newInstance();
		Transformer transformer = tf.newTransformer();
		transformer.setOutputProperty(XMLConsts.PROPERTY_IDENT_AMOUNT, Chars.NUMBER_2);
		transformer.setOutputProperty(OutputKeys.INDENT, GeneralConsts.BOOLEAN_YES);
		DOMSource domSource = new DOMSource(htmlDoc);
		transformer.transform(domSource, new StreamResult(new File(reportFolder + "/index.html")));
	}

	private void copyResources(String reportDateStr) throws IOException {
		String reportFolder = System.getProperty("reports.folder") + reportDateStr;
		String targetResourcesFolder = reportFolder + "/resources/";
		FileUtils.createFileIfNotExists(System.getProperty("reports.folder"));
		FileUtils.createFileIfNotExists(reportFolder);
		FileUtils.createFileIfNotExists(targetResourcesFolder);
		FileUtils.copyFile(new File(System.getProperty("resources.folder") + "styles.css")
				, new File(targetResourcesFolder + "styles.css"));
		FileUtils.copyFile(new File(System.getProperty("resources.folder") + "scripts.js")
				, new File(targetResourcesFolder + "scripts.js"));
		FileUtils.copyFile(new File(System.getProperty("resources.folder") + "jquery.min.js")
				, new File(targetResourcesFolder + "jquery.min.js"));
	}

	private String getTestName(String testName) {
		StringBuilder testNameCammel = new StringBuilder();
		char first = testName.charAt(0);
		if (first >= 'a' && first <= 'z') {
			first += ('A' - 'a');
		}
		testNameCammel.append(first);
		for (int i=1, length=testName.length();i<length;i++) {
			char c = testName.charAt(i);
			if (c >= 'A' && c <= 'Z') {
				testNameCammel.append(' ');
			}
			testNameCammel.append(c);
		}
		return testNameCammel.toString();
	}
}