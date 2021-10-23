package com.demo.sanity.report.util;

import static com.demo.sanity.report.data.HTML.A;
import static com.demo.sanity.report.data.HTML.ALIGN;
import static com.demo.sanity.report.data.HTML.BODY;
import static com.demo.sanity.report.data.HTML.BR;
import static com.demo.sanity.report.data.HTML.BUTTON;
import static com.demo.sanity.report.data.HTML.CLASS;
import static com.demo.sanity.report.data.HTML.COLSPAN;
import static com.demo.sanity.report.data.HTML.DIV;
import static com.demo.sanity.report.data.HTML.HEAD;
import static com.demo.sanity.report.data.HTML.HR;
import static com.demo.sanity.report.data.HTML.HREF;
import static com.demo.sanity.report.data.HTML.HTML;
import static com.demo.sanity.report.data.HTML.ID;
import static com.demo.sanity.report.data.HTML.IMG;
import static com.demo.sanity.report.data.HTML.LINK;
import static com.demo.sanity.report.data.HTML.ONCLICK;
import static com.demo.sanity.report.data.HTML.REL;
import static com.demo.sanity.report.data.HTML.SCRIPT;
import static com.demo.sanity.report.data.HTML.SRC;
import static com.demo.sanity.report.data.HTML.STYLE;
import static com.demo.sanity.report.data.HTML.TABLE;
import static com.demo.sanity.report.data.HTML.TARGET;
import static com.demo.sanity.report.data.HTML.TD;
import static com.demo.sanity.report.data.HTML.TITLE;
import static com.demo.sanity.report.data.HTML.TR;
import static com.demo.sanity.report.data.HTML.TYPE;

import javax.xml.xpath.XPathConstants;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import com.demo.sanity.report.data.Chars;

/**
 * Utilities related to HTML, including manipulation and creation
 * 
 * @author karensa
 * @since  22-9-2015
 */
public class HTMLUtils 
{
	private HTMLUtils(){throw new AssertionError("do now initialize utility class");}
	
	public static Node createHTML(Document doc) 
	{
		return createElement(doc, doc, HTML, null);
	}
	public static void setTitle(Document doc, Node head, String text) 
	{
		Node title = createElement(doc, head, TITLE, null);
		title.setTextContent(text);
	}
	public static Node createBody(Document doc, Node html) 
	{
		return createElement(doc, html, BODY, null);
	}
	public static Node createHead(Document doc, Node html) 
	{
		return createElement(doc, html, HEAD, null);
	}
	public static void addScript(Document doc, Node head, String path)
	{
		Element result = createElement(doc, head, SCRIPT, null);
		result.setAttribute(SRC, path);
	}
	public static void addCSS(Document doc, Node head, String path)
	{
		Element result = createElement(doc, head, LINK, null);
		result.setAttribute(REL, "stylesheet");
		result.setAttribute(TYPE, "text/css");
		result.setAttribute(HREF, path);
	}

	public static Element createLink(Document doc, Node parent, String title, String href, String onclick, boolean openInNewTarges)
	{
		Element result = createElement(doc, parent, A, null);
		if(href!=null){
			result.setAttribute(HREF, href);
		}
		if(onclick!=null){
			result.setAttribute(ONCLICK, onclick);
		}
		result.setTextContent(title);
		if(openInNewTarges){
			result.setAttribute(TARGET, "_blank");
		}
		return result;
	}

	public static Element createImage(Document doc, Node parent, String src, String onclick, String cssClass)
	{
		Element result = createElement(doc, parent, IMG, cssClass);
		result.setAttribute(SRC, src);
		if(onclick!=null){
			result.setAttribute(ONCLICK, onclick);
		}
		if(cssClass!=null){
			result.setAttribute(CLASS, cssClass);
		}
		return result;
	}

	public static Element createDiv(Document doc, Node parent, String cssClass, String id, String text)
	{
		Element result = createElement(doc, parent, DIV, cssClass);
		if(id!=null){
			result.setAttribute(ID, id);
		}
		if(text!=null){
			result.setTextContent(text);
		}
		return result;
	}

	public static Element createCenteredDiv(Document doc, Node parent, String cssClass, String id, String text)
	{
		Element result = createDiv(doc, parent, cssClass, id, text);
		result.setAttribute(ALIGN, "center");
		return result;
	}

	public static Element createTable(Document doc, Node parent, String cssClass)
	{
		Element result = createElement(doc, parent, TABLE, cssClass);
		parent.appendChild(result);
		return result;
	}

	public static Element createTableTitles(Document doc, Node table, String[] titles, String cssClass)
	{
		Element result = createElement(doc, table, TR, cssClass);
		for(String title:titles)
		{
			Node th = XMLUtils.createElementWithText(doc, "th", title);
			result.appendChild(th);
		}
		return result;
	}

	public static Element createTableRow(Document doc, Node table, String[] values, String cssClass)
	{
		Element result = createElement(doc, table, TR, cssClass);
		for(String value:values)
		{
			Node td = XMLUtils.createElementWithText(doc, TD, value);
			result.appendChild(td);
		}
		return result;
	}

	public static Element createTableRowWithStyles(Document doc, Node table, String[] values, String[] cssClass)
	{
		Element result = createElement(doc, table, TR, null);
		for(int i = 0;i<values.length;i++)
		{
			Node td = createCellWithText(doc, result, values[i], cssClass[i]);
			result.appendChild(td);
		}
		return result;
	}

	public static Element createCellWithText(Document doc, Node tr, String value, String cssClass)
	{
		Element result = XMLUtils.createElementWithText(doc, TD, value);
		result.setAttribute(CLASS, cssClass);
		return result;
	}

	public static Element createEmptyRowAndCell(Document doc, Node table, String cssClass, int colspan)
	{
		Element tr = createElement(doc, table, TR, null);
		Element td = createElement(doc, tr, TD, cssClass);
		td.setAttribute(COLSPAN, Integer.valueOf(colspan).toString());
		return td;
	}

	public static Element createEmptyTableRow(Document doc, Node table, String cssClass)
	{
		Element result = createElement(doc, table, TR, cssClass);
		return result;
	}

	public static Element createHTMLElement(Document doc, String tagName, Node parent, String text, String cssClass, boolean isCenter, String id, String onClick)
	{
		Element element = doc.createElement(tagName);
		if(cssClass!=null){
			element.setAttribute(CLASS, cssClass);
		}
		if(isCenter){
			element.setAttribute(ALIGN, "center");
		}
		if(id!=null){
			element.setAttribute(ID, id);
		}
		if(onClick!=null){
			element.setAttribute(ONCLICK, onClick);
		}
		if(text!=null){
			element.setTextContent(text);
		}
		if(parent!=null){
			parent.appendChild(element);
		}
		return element;
	}

	public static void newLine(Document doc, Node parent)
	{
		parent.appendChild(doc.createElement(BR));
	}

	public static void verticalSeparator(Document doc, Node parent)
	{
		createHTMLElement(doc, HR, parent, null, null, false, null, null);
	}

	public static void horizontalSeprator(Document doc, Node parent)
	{
		parent.appendChild(doc.createTextNode(Chars.SPACE+Chars.PIPE+Chars.SPACE));
	}

	public static Node getHTMLBody(Document doc) throws Exception
	{
		Node body = (Node)XMLUtils.executeXPath(doc, "//"+BODY, XPathConstants.NODE);
		return body;
	}

	public static void hideElement(Element element)
	{
		element.setAttribute(STYLE, "display:none");
	}

	public static String replaceEOL(String string)
	{
		if(string!=null){
			string = string.replace(Chars.EOL, "<br/>");
		}
		return string;
	}

	public static String[] replaceEOL(String[] strings)
	{
		for(int j=0;j<strings.length;j++){
			strings[j] = replaceEOL(strings[j]);
		}
		return strings;
	}
	public static void setOnClick(Element element, String onClick) 
	{
		element.setAttribute(ONCLICK, onClick);
	}	

	public static void insertCell(Document doc, Node tr, String className, String value)
	{
		Element td = doc.createElement(TD);
		td.setTextContent(value);
		if(className!=null){
			td.setAttribute(CLASS, className);
		}
		tr.appendChild(td);
	}
	
	public static void addButton(Document doc, Node parent, String className, String id, String onClick, String text, String defaultStyle)
	{
		Element result = createElement(doc, parent, BUTTON, className);
		if(className!=null){
			result.setAttribute(CLASS, className);
		}
		if(onClick!=null){
			result.setAttribute(ONCLICK, onClick);
		}
		if(id!=null){
			result.setAttribute(ID, id);
		}
		if(defaultStyle!=null){
			result.setAttribute(STYLE, defaultStyle);
		}
		if(text!=null){
			result.setTextContent(text);
		}
	}
	
	public static void addBR(Document doc, Node parent) 
	{
		createElement(doc, parent, BR, null);
	}
	
	private static Element createElement(Document doc, Node parent, String type, String className) {
		Element result = XMLUtils.createElement(doc, parent, type);
		if(className!=null){
			result.setAttribute(CLASS, className);
		}
		return result;
	}
}