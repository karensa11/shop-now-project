package com.demo.sanity.report.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.demo.sanity.report.data.Chars;
import com.demo.sanity.report.data.GeneralConsts;

/**
 * Common operations on files, such as read object/write string
 * 
 * @author karensa
 * @since  29-8-2015
 */
public class FileUtils 
{
	private FileUtils(){throw new AssertionError("do now initialize utility class");}
	
	public static List<String> extractFilesNamesAsList(File[] files)
	{
		ValidationUtils.validateNotNull(files, "files");
		
		List<String> result = new ArrayList<String>();
		for(File file:files){
			result.add(file.getName());
		}
		return result;
	}

	public static File[] extractChildFilesOrdered(File folder) throws FileNotFoundException
	{
		ValidationUtils.validateNotNull(folder, "folder");
		ValidationUtils.validateFolder(folder, "folder");
		
		File[] result = folder.listFiles();
		Arrays.sort(result);
		return result;
	}

	public static void copyFile(File source, File target) throws IOException 
	{
		ValidationUtils.validateNotNull(source, "source");
		ValidationUtils.validateFile(source, "source");
		ValidationUtils.validateNotNull(target, "target");
		InputStream is = null;
		OutputStream os = null;
		try {
			is = new FileInputStream(source);
			os = new FileOutputStream(target);
			System.out.println("copyFile" + os);
			byte[] buffer = new byte[1024];
			int length;
			while ((length = is.read(buffer)) > 0) {
				os.write(buffer, 0, length);
			}
		} 
		finally {
			System.out.println("copyFile" + os);
			is.close();
			os.close();
		}
	}

	public static String readStringFromFile(String filePath) throws IOException
	{
		ValidationUtils.validateNotNull(filePath, "filePath");
		ValidationUtils.validateFile(filePath, "filePath");
		
		byte[] bytes = Files.readAllBytes(new File(filePath).toPath());
		String result = new String(bytes, GeneralConsts.ENCODING_UTF8);
		return result;
	}

	public static boolean compareFileAsBinary(String filePath1, String filePath2) throws IOException
	{
		ValidationUtils.validateNotNull(filePath1, "filePath1");
		ValidationUtils.validateFile(filePath1, "filePath1");
		ValidationUtils.validateNotNull(filePath2, "filePath2");
		ValidationUtils.validateFile(filePath2, "filePath2");
		
		byte[] bytes1 = Files.readAllBytes(new File(filePath1).toPath());
		byte[] bytes2 = Files.readAllBytes(new File(filePath2).toPath());
		boolean check = Arrays.equals(bytes1, bytes2);
		return check;
	}

	public static void deleteAllGivenFilesInFolder(String folder, String[] files)
	{
		ValidationUtils.validateNotNull(folder, "folder");
		ValidationUtils.validateNotNull(files, "files");
		
		for(String fileName:files){
			new File(folder+fileName).delete();
		}
	}

	public static String[] readStringFromFiles(String folder, String[] files) throws IOException
	{
		ValidationUtils.validateNotNull(folder, "folder");
		ValidationUtils.validateFolder(folder, "folder");
		ValidationUtils.validateNotNull(files, "files");
		
		List<String> result = new ArrayList<String>();
		for(String file:files)
		{
			String fileContent = readStringFromFile(folder+file);
			result.add(fileContent);
		}
		return result.toArray(new String[result.size()]);
	}

	public static void writeStringToFile(String filePath, String fileContentStr) throws FileNotFoundException
	{
		ValidationUtils.validateNotNull(fileContentStr, "fileContentStr");
		
		PrintWriter out = new PrintWriter(filePath);
		out.write(fileContentStr);
		out.close();
	}

	public static void writeObjectToFile(String filePath, Object object) throws FileNotFoundException, IOException
	{
		ObjectOutputStream osStream = null;
		try{
			osStream = 
					new ObjectOutputStream(
							new FileOutputStream(
									new File(filePath)));
			osStream.writeObject(object);
		}
		finally
		{
			if(osStream!=null){
				osStream.close();
			}
		}
	}

	public static Object readObjectFromFile(String filePath) throws FileNotFoundException, IOException, ClassNotFoundException
	{
		ValidationUtils.validateFile(filePath, "filePath");
		
		ObjectInputStream oiStream = null;
		try{
			oiStream = 
					new ObjectInputStream(
							new FileInputStream(
									new File(filePath)));
			Object o = oiStream.readObject();
			return o;
		}
		finally
		{
			if(oiStream!=null){
				oiStream.close();
			}
		}
	}

	public static void relaceStringInFile(String filePath, String oldValue, String newValue) throws IOException
	{
		ValidationUtils.validateFile(filePath, "filePath");
		ValidationUtils.validateNotNull(oldValue, "oldValue");
		ValidationUtils.validateNotNull(newValue, "newValue");
		
		String fileContentStr = readStringFromFile(filePath);
		fileContentStr = fileContentStr.replace(oldValue, newValue);
		writeStringToFile(filePath, fileContentStr);
	}

	public static void relaceStringsInFile(String filePath, Map<String, String> keysAndValues) throws IOException
	{
		ValidationUtils.validateFile(filePath, "filePath");
		ValidationUtils.validateNotNull(keysAndValues, "keysAndValues");
		
		String fileContentStr = readStringFromFile(filePath);
		for(String key:keysAndValues.keySet())
		{
			fileContentStr = fileContentStr.replace(key, keysAndValues.get(key));
		}
		writeStringToFile(filePath, fileContentStr);
	}

	public static void replaceNonASCIInFile(String filePath) throws IOException
	{
		ValidationUtils.validateFile(filePath, "filePath");
		
		BufferedReader br = new BufferedReader(new FileReader(filePath));
		String line;
		StringBuilder builder = new StringBuilder();
		while ((line = br.readLine()) != null) {
			String subjectString = Normalizer.normalize(line, Normalizer.Form.NFD);
			String resultString = subjectString.replaceAll(Chars.NON_ASCII, Chars.EMPTY_STRING);
			builder.append(resultString).append(Chars.LINE_SEPERATOR);
		}
		br.close();

		PrintWriter out = new PrintWriter(filePath);
		out.println(builder.toString());
		out.close();
	}

	public static void replaceStringsInFile(String filePath, Map<String, String> replacements) throws Exception
	{
		ValidationUtils.validateFile(filePath, "filePath");
		ValidationUtils.validateNotNull(replacements, "replacements");
		
		BufferedReader br = new BufferedReader(new FileReader(filePath));
		String line;
		StringBuilder builder = new StringBuilder();
		while ((line = br.readLine()) != null) 
		{
			for(String key:replacements.keySet()){
				String value = replacements.get(key);
				line = line.replace(key, value);
			}
			builder.append(line).append(Chars.LINE_SEPERATOR);
		}
		br.close();

		PrintWriter out = new PrintWriter(filePath);
		out.println(builder.toString());
		out.close();
	}

	public static String searchStringsInFiles(String folderPath, String filePattenRegex, String[] toSearch1, String[] toSearch2) throws Exception
	{
		ValidationUtils.validateFolder(folderPath, "folderPath");
		
		File folder = new File(folderPath);
		String logSTR = "";
		for(File child:folder.listFiles())
		{
			String name = child.getName();
			if(name.matches(filePattenRegex))
			{
				BufferedReader br = new BufferedReader(new FileReader(child));
				String line;
				while ((line = br.readLine()) != null) {
					if(StringUtils.stringContainsAllOtherStrings(line, toSearch1)){
						logSTR += (name+":"+line) + "\n";
					}
					else if(StringUtils.stringContainsAllOtherStrings(line, toSearch2)){
						logSTR += (name+":"+line) + "\n";
					}
				}
				br.close();
			}
		}
		return logSTR;
	}
	
	public static void createFileIfNotExists(String path) {
		if (!new File(path).exists()) {
			new File(path).mkdir();
		}
	}
}