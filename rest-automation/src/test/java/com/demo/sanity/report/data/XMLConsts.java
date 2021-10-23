package com.demo.sanity.report.data;

/**
 * Strings used in XML files
 * 
 * @author karensa
 * @since  3-10-2015
 */
public interface XMLConsts 
{
	String PROPERTY_IDENT_AMOUNT = "{http://xml.apache.org/xslt}indent-amount";
	String HEADER_AFTER_TRANSFORMER = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>";
	String HEADER_ASC = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE ASC [\n<!ENTITY empty \"&#x2400;\" >]>\n";
	String ENCODE_SPACE_ASC = "&empty;";
}