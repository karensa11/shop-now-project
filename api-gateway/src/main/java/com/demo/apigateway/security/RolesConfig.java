package com.demo.apigateway.security;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class RolesConfig {

	private static final String PORPERTIES_FILE_NAME = "security.properties";

	private Map<String, List<String>> properties = new HashMap<>();

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@PostConstruct
	private void init() {
		Properties propertiesFromConfiguration = new Properties();
		InputStream inputStream = null;
		try {
			inputStream = getClass().getClassLoader().getResourceAsStream(PORPERTIES_FILE_NAME);
			if (inputStream != null) {
				propertiesFromConfiguration.load(inputStream);
			} else {
				throw new FileNotFoundException("property file '" + PORPERTIES_FILE_NAME + "' not found in the classpath");
			}
			for (Object key : propertiesFromConfiguration.keySet()) {
				String value = (String) propertiesFromConfiguration.get(key);
				String[] roles = value.split(";");
				for (String role:roles) {
					if (SecurityRole.valueOf(role) == null) {
						throw new IllegalArgumentException("invalid roles for key " + key);
					}
				}
				properties.put(((String)key).replace("*", ".*"), Arrays.asList(roles));
			}
			logger.info("security config {}", properties);
		}
		catch (Exception e) {
			throw new RuntimeException("issue reading property file", e);
		}
		finally {
			if (inputStream!=null) {
				try { 
					inputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	public List<String> getSecurityRole(String serviceName) {
		for (String key : properties.keySet()) {
			if (serviceName.matches(key)) {
				logger.info("found match {} , {}", key, serviceName);
				return properties.get(key);
			}
		}
		return null;
	}
}
