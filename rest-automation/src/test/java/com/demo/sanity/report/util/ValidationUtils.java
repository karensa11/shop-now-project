package com.demo.sanity.report.util;

import java.io.File;
import java.io.FileNotFoundException;

/**
 * All validation required - string not null, file exists, etc
 * 
 * @author karensa
 * @since  12-9-2015
 */
public class ValidationUtils 
{
	private ValidationUtils(){throw new AssertionError("do now initialize utility class");}
	
	public static void validateFolder(String path, String variableName) throws FileNotFoundException
	{
		validateFolder(new File(path), variableName);
	}
	
	public static void validateFolder(File folder, String variableName) throws FileNotFoundException
	{
		if(!folder.exists()){
			throw new FileNotFoundException(variableName+" "+folder.getPath()+" not found");
		}
		if(!folder.isDirectory()){
			throw new FileNotFoundException(variableName+" "+folder.getPath()+" is invalid");
		}
	}

	public static void validateFile(String path, String variableName) throws FileNotFoundException
	{
		validateFile(new File(path), variableName);
	}
	
	public static void validateFile(File file, String variableName) throws FileNotFoundException
	{
		if(!file.exists()){
			throw new FileNotFoundException(variableName+" "+file.getPath()+" not found");
		}
		if(file.isDirectory()){
			throw new FileNotFoundException(variableName+" "+file.getPath()+" is invalid");
		}
	}

	public static void validateNotNull(Object value, String variableName)
	{
		if(value==null){
			throw new NullPointerException(variableName+" is null");
		}
	}

	public static void validateNotEmptyOrNull(String value, String variableName)
	{
		if(value==null || value.isEmpty()){
			throw new NullPointerException(variableName+" is null or empty");
		}
	}

	public static void validateStringIsOneOfValues(String value, String variableName, String... values)
	{
		if(!StringUtils.stringIsOneOfValues(value, values)){
			throw new IllegalArgumentException(variableName+" value is "+value+". It should be one of values: "+values);
		}
	}

	public static void validateNonNegativeNumber(int value, String variableName)
	{
		if(value<0){
			throw new IllegalArgumentException(variableName+" should be non negative");
		}
	}

	public static void validateArrayLength(Object[] array, String variableName, int minLength)
	{
		if(array.length<minLength){
			throw new IllegalArgumentException(variableName+" length should be at least "+minLength);
		}
	}

	public static void validateNotEmptyOrNull(Object[] array, String variableName)
	{
		if(array==null){
			throw new NullPointerException(variableName+" is null");
		}
		if(array.length==0){
			throw new IllegalArgumentException(variableName+" cannot be empty");
		}
	}
}