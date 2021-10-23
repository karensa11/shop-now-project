package com.demo.sanity.report.util;

import java.util.Arrays;
import java.util.List;

import javax.xml.xpath.XPathConstants;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.demo.sanity.report.data.Chars;

/**
 * 
 * @author karensa
 * @since  9-9-2015
 */
public class GeneralUtils 
{
	private GeneralUtils(){throw new AssertionError("do now initialize utility class");}

	public static String formatMillisToTime(long millis)
	{
		long second = (millis / 1000) % 60;
		long minute = (millis / (1000 * 60)) % 60;
		long hour = (millis / (1000 * 60 * 60)) % 24;
		long millisAfter = millis%1000;

		String time = String.format("%02d:%02d:%02d:%03d", hour, minute, second, millisAfter);
		return time;
	}

	public static int calculatePecentage(int value, int total)
	{
		int result = (int)((((double)value)/((double)total))*100);
		return result;
	}

	public static int random(int limit)
	{
		int result = (int)(Math.random()*100)%limit;
		return result;
	}

	public static int enableTestsByFilterPlusIncludePlusExclude(Document doc, String filterName, String includeStr, String excludeStr) throws Exception
	{
		ValidationUtils.validateNotNull(doc, "doc");
		ValidationUtils.validateNotNull(excludeStr, "excludeStr");
		ValidationUtils.validateNotNull(excludeStr, "excludeStr");

		int testsEnabled = 0;
		String[] includeRegexs = includeStr.toLowerCase().split(Chars.COMMA);
		StringUtils.replaceForAllStrings(includeRegexs, Chars.STAR, ".*");
		String[] excludeRegexes = excludeStr.toLowerCase().split(Chars.COMMA);
		StringUtils.replaceForAllStrings(excludeRegexes, Chars.STAR, ".*");
		NodeList tests = (NodeList)XMLUtils.executeXPath(doc, "//test", XPathConstants.NODESET);
		for(int i=0;i<tests.getLength();i++)
		{
			Element test = (Element)tests.item(i);
			String testName = test.getAttribute("name").toLowerCase();
			NodeList childNodes = test.getChildNodes();
			boolean isValidTest = false;
			for(int j=0;j<childNodes.getLength();j++)
			{
				Node childNode = childNodes.item(j);
				if(childNode.getNodeName().equals("parameter") && ((Element)childNode).getAttribute("name").equals("filter"))
				{
					String filterValue = ((Element)childNode).getAttribute("value");
					List<String> testFilters = Arrays.asList(filterValue.split(Chars.COMMA));
					if(testFilters.contains(filterName) && !testName.endsWith("todo") && StringUtils.matchesAnyRegex(includeRegexs, testName) && !StringUtils.matchesAnyRegex(excludeRegexes, testName)){
						testsEnabled++;
						isValidTest = true;
					}
				}
			}
			test.setAttribute("enabled", isValidTest ? "true":"false");
		}
		return testsEnabled;
	}

	public static int handleTestLoops(Document doc, int loops) throws Exception
	{
		ValidationUtils.validateNotNull(doc, "doc");
		ValidationUtils.validateNonNegativeNumber(loops, "loops");

		NodeList tests = (NodeList)XMLUtils.executeXPath(doc, "//test", XPathConstants.NODESET);
		int testsCount = tests.getLength()*loops;
		for(int i=0;i<tests.getLength();i++)
		{
			Element test = (Element)tests.item(i);
			String testName = test.getAttribute("name");
			boolean isEnabled = Boolean.parseBoolean(test.getAttribute("enabled"));
			if(isEnabled)
			{
				for(int j=0;j<loops;j++)
				{
					Element testTmp = (Element)test.cloneNode(true);
					testTmp.setAttribute("name", testName+Chars.UNDERSCORE+j);
					test.getParentNode().appendChild(testTmp);
				}
				test.getParentNode().removeChild(test);
			}
		}
		return testsCount;
	}
}