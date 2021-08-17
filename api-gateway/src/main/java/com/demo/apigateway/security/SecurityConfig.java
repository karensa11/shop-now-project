package com.demo.apigateway.security;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;

@Component
public class SecurityConfig {

	private static final String PORPERTIES_FILE_NAME = "security.properties";

	private Properties properties;

	@PostConstruct
	private void init() {
		properties = new Properties();
		InputStream inputStream = null;
		try {
			inputStream = getClass().getClassLoader().getResourceAsStream(PORPERTIES_FILE_NAME);
			if (inputStream != null) {
				properties.load(inputStream);
			} else {
				throw new FileNotFoundException("property file '" + PORPERTIES_FILE_NAME + "' not found in the classpath");
			}
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
		String securityRoles = properties.getProperty(serviceName);
		if (securityRoles != null) {
			return Arrays.asList(securityRoles.split(","));
		}
		return null;
	}
}
