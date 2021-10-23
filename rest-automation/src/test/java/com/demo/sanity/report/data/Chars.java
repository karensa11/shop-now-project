package com.demo.sanity.report.data;

/**
 * Common characters
 * 
 * @author karensa
 * @since  19-9-2015
 */
public interface Chars
{
	String NEWLINE = System.getProperty("line.separator");
	String ATSIGN = "@";
	String NUMBER = "#";
	String EQUAL = "=";
	String COLON = ":";
	String DOT = ".";
	String UNDERSCORE = "_";
	String COMMA = ",";
	String SLASH = "/";
	String STAR = "*";
	String SEMI_COLLON = ";";
	String PERCENT = "%";
	String SEMICOLON = ";";
	String LINE_SEPERATOR = System.getProperty("line.separator");
	String NON_ASCII = "[^\\x00-\\x7F]";
	String EMPTY_STRING = "";
	String QUESTION = "?";
	String OP_SLASH = "\\";
	String SPACE = " ";
	String EOL = "\n";
	String EOL_UNIX = "\r\n";
	String QUOTE = "'";
	String DOUBLE_QUOTE = "\"";
	String DASH = "-";
	String PIPE = "|";
	String NUMBER_0 = "0";
	String NUMBER_2 = "2";
	String ASCII_DOWN = "\u25BC";
	String ASCII_UP = "\u25B2";
}