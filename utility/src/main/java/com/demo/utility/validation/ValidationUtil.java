package com.demo.utility.validation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ValidationUtil {
	private static Logger logger = LoggerFactory.getLogger(ValidationUtil.class);
	public static void validateBadString(String element, boolean okRoundBrackets) {
		logger.info("validateBadString {} {}", element, okRoundBrackets);
		if (
				(!okRoundBrackets && element.contains("(")) ||
				(!okRoundBrackets && element.contains(")")) ||
				element.contains("{") ||
				element.contains("}") ||
				element.contains("[") ||
				element.contains("]") ||
				element.contains("<") ||
				element.contains(">")
				) {
			throw new SecurityException("invalid value " + element);
		}
	}
}
