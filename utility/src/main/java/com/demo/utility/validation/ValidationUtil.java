package com.demo.utility.validation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ValidationUtil {
	private static Logger logger = LoggerFactory.getLogger(ValidationUtil.class);
	private static final String[] forbiddenCaractersRoundBrackets = {"(", ")"};
	private static final String[] forbiddenCaracters = {"{", "}", "[", "]", "<", ">"};
	private static final String[] forbiddenWords = {"table", "select"};
	public static void validateBadString(String element, boolean okRoundBrackets) {
		logger.info("validateBadString {} {}", element, okRoundBrackets);
		String elementToAnalize = element.toLowerCase();
		if (!okRoundBrackets) {
			for (String item:forbiddenCaractersRoundBrackets) {
				if (elementToAnalize.contains(item)) {
					throw new SecurityException("invalid value " + element);
				}
			}
		}
		for (String item:forbiddenCaracters) {
			if (elementToAnalize.contains(item)) {
				throw new SecurityException("invalid value " + element + ", " + item);
			}
		}
		for (String item:forbiddenWords) {
			if (elementToAnalize.contains(item)) {
				throw new SecurityException("invalid value " + element);
			}
		}
	}
}
