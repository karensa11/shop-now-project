package com.demo.sanity.report.util;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Various utilitis related to string
 * 
 * @author karensa
 * @since  17-9-2015
 */
public class StringUtils 
{
	private StringUtils(){throw new AssertionError("do now initialize utility class");}

	public static String cleanStringFromCaseAndSpace(String string)
	{
		String result = "";
		if(string!=null){
			result = string.toLowerCase().trim();
		}
		return result;
	}

	public static List<String> cleanStringListFromCaseAndSpace(List<String> strings)
	{
		List<String> result = new ArrayList<String>();
		for(String string:strings){
			result.add(cleanStringFromCaseAndSpace(string));
		}
		return result;
	}

	public static String removeSpacesFromString(String query)
	{
		ValidationUtils.validateNotNull(query, "query");

		Pattern pattern = Pattern.compile("[ \t\n\r]+");
		Matcher matcher = pattern.matcher(query);
		// Check all occurrences
		while (matcher.find()) {
			query = query.replace(matcher.group(), " ");
		}
		return query;
	}

	public static boolean isNullEmpty(String string)
	{
		boolean check = 
				string == null ||
				string.isEmpty();
		return check;
	}

	public static String generateNumberSequence(int length)
	{
		Random random = new Random(new Date().getTime());
		StringBuilder sb = new StringBuilder(length);
		for( int i = 0; i < length; i++ ) {
			sb.append(random.nextInt(10));
		}
		return sb.toString();
	}

	public static String generateCharsSequence(int length) {
		Random random = new Random(new Date().getTime());
		StringBuilder sb = new StringBuilder(length);
		for (int i = 0; i < length; ++i) {
			sb.append((char)(random.nextInt(25)+(random.nextInt(1)==0 ? 'a':'A')));
		}
		return sb.toString();
	}

	public static boolean stringContainsOtherStrings(String string, String[] otherStrings)
	{
		ValidationUtils.validateNotNull(string, "string");
		ValidationUtils.validateNotNull(otherStrings, "otherStrings");

		boolean check = false;
		for(String otherString:otherStrings)
		{
			if(string.contains(otherString)){
				check = true;
				break;
			}
		}
		return check;
	}

	public static boolean stringContainsAllOtherStrings(String string, String[] otherStrings)
	{
		ValidationUtils.validateNotNull(string, "string");
		ValidationUtils.validateNotNull(otherStrings, "otherStrings");

		boolean check = true;
		for(String otherString:otherStrings)
		{
			if(!string.contains(otherString)){
				check = false;
				break;
			}
		}
		return check;
	}

	public static String createStringWithSeperator(Object[] objects, String seperator)
	{
		ValidationUtils.validateNotNull(objects, "objects");
		ValidationUtils.validateNotNull(seperator, "seperator");

		StringBuilder builder = new StringBuilder();
		String result = "";
		if(objects.length>0){
			for(Object object:objects){
				builder.append(object).append(seperator);
			}
			result = builder.substring(0, builder.length()-seperator.length());
		}
		return result;
	}

	public static String createStringWithSeperatorAndWrapper(String[] strings, String seperator, String wrapper)
	{
		ValidationUtils.validateNotNull(strings, "strings");
		ValidationUtils.validateNotNull(seperator, "seperator");

		StringBuilder builder = new StringBuilder();
		String result = "";
		if(strings.length>0){
			for(String string:strings){
				builder.append(wrapper).append(string).append(wrapper).append(seperator);
			}
			result = builder.substring(0, builder.length()-seperator.length());
		}
		return result;
	}

	public static boolean stringIsOneOfValues(String string, String... values)
	{
		ValidationUtils.validateNotNull(string, "string");

		boolean check = false;
		for(String value:values){
			if(value.equals(string)){
				check = true;
				break;
			}
		}
		return check;
	}

	public static String exceptionStackTrace(Throwable t)
	{
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		t.printStackTrace(pw);
		String result = sw.toString(); // stack trace as a string
		pw.close();

		return result;
	}

	public static void replaceForAllStrings(String[] strings, String search, String replace)
	{
		ValidationUtils.validateNotNull(strings, "strings");
		ValidationUtils.validateNotNull(search, "search");
		ValidationUtils.validateNotNull(replace, "replace");

		for(int i=0;i<strings.length;i++){
			strings[i] = strings[i].replace(search, replace);
		}
	}

	public static void wrapAllStrings(String[] strings, String wrapper)
	{
		ValidationUtils.validateNotNull(strings, "strings");

		for(int i=0;i<strings.length;i++){
			strings[i] = wrapper+strings[i]+wrapper;
		}
	}

	public static void toLowerCaseForAllStrings(String[] strings)
	{
		ValidationUtils.validateNotNull(strings, "strings");

		for(int i=0;i<strings.length;i++){
			strings[i] = strings[i].toLowerCase();
		}
	}

	public static void toUpperCaseForAllStrings(String[] strings)
	{
		ValidationUtils.validateNotNull(strings, "strings");

		for(int i=0;i<strings.length;i++){
			strings[i] = strings[i].toUpperCase();
		}
	}

	public static boolean matchesAnyRegex(String[] regexes, String string)
	{
		ValidationUtils.validateNotNull(regexes, "regexes");
		ValidationUtils.validateNotNull(string, "string");

		boolean matches = false;
		for(String regex:regexes){
			if(string.matches(regex)){
				matches = true;
				break;
			}
		}
		return matches;
	}

	public static boolean equals(String str1, String str2)
	{
		boolean check =
				(str1==null && str2==null) ||
				(str1!=null && str1.equals(str2));
		return check;
	}

	public static String replaceFirstStringIntance(String string, String toSearch, String toReplace)
	{
		StringBuilder builder = new StringBuilder(string);
		int indexOf = builder.indexOf(toSearch);
		if(indexOf>=0){
			builder.replace(indexOf, indexOf+toSearch.length(), toReplace);
		}
		String result = builder.toString();
		return result;
	}
}