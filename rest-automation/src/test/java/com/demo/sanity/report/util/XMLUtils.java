package com.demo.sanity.report.util;

import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.net.URL;
import java.util.List;

import javax.xml.namespace.QName;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.demo.sanity.report.data.Chars;
import com.demo.sanity.report.data.GeneralConsts;
import com.demo.sanity.report.data.XMLConsts;

/**
 * Various utilities related to working with XML.
 * E.g. read XML file and write to XML file
 * 
 * @author karensa
 * @since  28-8-2015
 */
public class XMLUtils 
{
	private XMLUtils(){throw new AssertionError("do now initialize utility class");}
	
	public static String readXMLValue(String filePath, String valueXPath) throws ParserConfigurationException, SAXException, IOException, XPathExpressionException
	{
		ValidationUtils.validateFile(filePath, "filePath");

		DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
		Document doc = docBuilder.parse(filePath);

		XPath xPath = XPathFactory.newInstance().newXPath();
		Node node = (Node) xPath.compile(valueXPath).evaluate(doc, XPathConstants.NODE);
		String name = node.getNodeName();
		if(name==null){
			System.out.println("could not find old value inside file");
			throw new NullPointerException("value not found");
		}
		return name;
	}

	public static void writeXMLToFile(Document doc, File file) throws Exception
	{
		ValidationUtils.validateNotNull(doc, "doc");
		ValidationUtils.validateNotNull(file, "file");
		
		TransformerFactory tf = TransformerFactory.newInstance();
		Transformer transformer = tf.newTransformer();
		transformer.setOutputProperty(XMLConsts.PROPERTY_IDENT_AMOUNT, Chars.NUMBER_2);
		transformer.setOutputProperty(OutputKeys.INDENT, GeneralConsts.BOOLEAN_YES);
		DOMSource domSource = new DOMSource(doc);
		transformer.transform(domSource, new StreamResult(file));
	}

	public static Document readXMLFromNetrowk(String url) throws Exception
	{	
		ValidationUtils.validateNotNull(url, "url");
		
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		DocumentBuilder db = dbf.newDocumentBuilder();
		Document doc = db.parse(new URL(url).openStream());
		return doc;
	}

	public static Document readXMLFromString(String string) throws Exception
	{	
		ValidationUtils.validateNotNull(string, "string");

		string = string.trim().replaceFirst("^([\\W]+)<","<");
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	    DocumentBuilder builder = factory.newDocumentBuilder();
	    InputSource is = new InputSource(new StringReader(string));
	    return builder.parse(is);
	}

	public static boolean isDefinitionXMLNode(Node node)
	{
		ValidationUtils.validateNotNull(node, "node");
		
		boolean result = 
				node.getNodeType()!=Node.ELEMENT_NODE ||
				node.getNodeName().startsWith(Chars.NUMBER);
		return result;
	}

	public static String retrieveXMLAttributeValue(Node node, String attributeName)
	{
		ValidationUtils.validateNotNull(node, "node");
		
		String result = null;
		NamedNodeMap attributes = node.getAttributes();
		if(attributes!=null){
			Node nodeAttr = attributes.getNamedItem(attributeName);
			if(nodeAttr!=null){
				result = nodeAttr.getNodeValue();
			}
		}
		return result;
	}

	public static Node searchXMLChild(Node parent, String childName)
	{
		ValidationUtils.validateNotNull(parent, "parent");
		
		Node result = null;
		NodeList childNodes = parent.getChildNodes(); // return child nodes, ordered manner
		for(int i=0;i<childNodes.getLength();i++)
		{
			if(childNodes.item(i).getNodeName().equals(childName))
			{
				result = childNodes.item(i);
				break;
			}
		}
		return result;
	}

	public static void replaceXMLNodeValueWithAnother(Node oldNode, Node newNode, Node parentTarget, Document documentTarget)
	{
		ValidationUtils.validateNotNull(oldNode, "oldNode");
		ValidationUtils.validateNotNull(parentTarget, "parentTarget");
		ValidationUtils.validateNotNull(documentTarget, "documentTarget");
		
		Node sibiling = oldNode.getNextSibling();
		parentTarget.removeChild(oldNode);
		parentTarget.insertBefore(documentTarget.importNode(newNode, true), sibiling);
	}

	public static boolean isSameXMLNodeContent(Node node1, Node node2)
	{
		ValidationUtils.validateNotNull(node1, "node1");
		ValidationUtils.validateNotNull(node2, "node2");
		
		String text1 = node1.getTextContent();
		String text2 = node2.getTextContent();
		boolean check = text1.equals(text2);
		return check;
	}

	public static Object executeXPath(Node node, String expression, QName returnType) throws XPathExpressionException
	{
		ValidationUtils.validateNotNull(returnType, "returnType");
		
		XPathFactory xPathfactory = XPathFactory.newInstance();
		XPath xpath = xPathfactory.newXPath();
		XPathExpression expr = xpath.compile(expression);
		return expr.evaluate(node, returnType);
	}

	public static void clearChildNodes(Node parent)
	{
		ValidationUtils.validateNotNull(parent, "parent");
		
		NodeList childNodes = parent.getChildNodes();
		for(;childNodes.getLength()>0;childNodes = parent.getChildNodes())
		{
			for(int j=0, length=childNodes.getLength();j<length;j++){ // remove rows, leave first (title) row
				Node childTestNode = childNodes.item(j);
				if(childTestNode!=null){
					parent.removeChild(childNodes.item(j));
				}
			}
		}
	}

	public static void addChildNodeFromList(Node parent, List<Node> newChildNodes)
	{
		ValidationUtils.validateNotNull(parent, "parent");
		ValidationUtils.validateNotNull(newChildNodes, "newChildNodes");
		
		for(Node node:newChildNodes){
			parent.appendChild(node);
		}
	}

	public static Document createNewDocument() throws Exception
	{
		DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
		Document newDoc = docBuilder.newDocument();
		return newDoc;
	}

	public static Node cloneNode(Node sourceNode, Document document) throws Exception
	{
		ValidationUtils.validateNotNull(sourceNode, "sourceNode");
		ValidationUtils.validateNotNull(document, "document");
		
		Node newNode = sourceNode.cloneNode(true);
		document.adoptNode(newNode);
		return newNode;
	}

	public static Node cloneNode(Node sourceNode, Node newParent, Document document) throws Exception
	{
		ValidationUtils.validateNotNull(sourceNode, "sourceNode");
		ValidationUtils.validateNotNull(newParent, "newParent");
		ValidationUtils.validateNotNull(document, "document");
		
		Node newNode = sourceNode.cloneNode(true);
		document.adoptNode(newNode);
		newParent.appendChild(newNode);
		return newNode;
	}

	public static void removeChildByIndex(Node parent, int index)
	{
		ValidationUtils.validateNotNull(parent, "parent");
		
		Node child = parent.getChildNodes().item(index);
		if(child!=null){
			parent.removeChild(child);
		}
	}

	public static Node getChild(Node parent, int index)
	{
		ValidationUtils.validateNotNull(parent, "parent");
		
		Node child = parent.getChildNodes().item(index);
		return child;
	}

	public static Element getChildAsElement(Node parent, int index)
	{
		ValidationUtils.validateNotNull(parent, "parent");
		
		Element child = (Element)parent.getChildNodes().item(index);
		return child;
	}

	public static Element createElementWithText(Document doc, String tagName, String text)
	{
		ValidationUtils.validateNotNull(doc, "doc");
		
		Element node = doc.createElement(tagName);
		node.setTextContent(text);
		return node;
	}

	public static Element createElementWithText(Document doc, Node parent, String tagName, String text)
	{
		ValidationUtils.validateNotNull(doc, "doc");
		ValidationUtils.validateNotNull(parent, "parent");
		
		Element node = doc.createElement(tagName);
		node.setTextContent(text);
		parent.appendChild(node);
		return node;
	}

	public static Element createElement(Document doc, Node parent, String tagName)
	{
		ValidationUtils.validateNotNull(doc, "doc");
		ValidationUtils.validateNotNull(parent, "parent");
		
		Element node = doc.createElement(tagName);
		parent.appendChild(node);
		return node;
	}

	public static void setTextForChild(Node parent, int childIndex, String text)
	{
		ValidationUtils.validateNotNull(parent, "parent");
		
		Node node = parent.getChildNodes().item(childIndex);
		node.setTextContent(text);
	}

	public static void setAtributteForAllNodes(NodeList nodes, String attributeName, String attributeValue)
	{
		ValidationUtils.validateNotNull(nodes, "nodes");
		
		for(int i=0, length=nodes.getLength();i<length;i++)
		{
			((Element)nodes.item(i)).setAttribute(attributeName, attributeValue);
		}
	}

	public static void removeFromAtributteForAllNodes(NodeList nodes, String attributeName, String toRemove)
	{
		ValidationUtils.validateNotNull(nodes, "nodes");
		
		for(int i=0, length=nodes.getLength();i<length;i++)
		{
			String currentValue = ((Element)nodes.item(i)).getAttribute(attributeName);
			((Element)nodes.item(i)).setAttribute(attributeName, currentValue.replace(toRemove, Chars.EMPTY_STRING));
		}
	}

	public static void addToAtributteForNodesStartingFrom(NodeList nodes, int index, String attributeName, String toAdd)
	{
		ValidationUtils.validateNotNull(nodes, "nodes");
		
		for(int i=index, length=nodes.getLength();i<length;i++)
		{
			String newValue = ((Element)nodes.item(i)).getAttribute(attributeName)+toAdd;
			((Element)nodes.item(i)).setAttribute(attributeName, newValue);
		}
	}

	public static void replaceInNodeText(Node node, String from, String to)
	{
		ValidationUtils.validateNotNull(node, "node");
		
		String text = node.getTextContent();
		text = text.replace(from, to);
		node.setTextContent(text);
	}

	public static void removeNodes(Node parent, Node... nodes)
	{
		ValidationUtils.validateNotNull(parent, "parent");
		
		for(Node node:nodes){
			parent.removeChild(node);
		}
	}

	public static void createText(Document doc, Node parent, String text)
	{
		ValidationUtils.validateNotNull(doc, "doc");
		ValidationUtils.validateNotNull(parent, "parent");
		
		parent.appendChild(doc.createTextNode(text));
	}
}