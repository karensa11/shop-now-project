package com.demo.apigateway.filter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.ServerWebExchangeDecorator;

import com.demo.apigateway.data.User;
import com.demo.apigateway.security.RolesConfig;
import com.demo.apigateway.security.SecurityRole;
import com.demo.orderservice.exception.ConfigException;

import reactor.core.publisher.Mono;

@Component
public class RolesFilter implements GlobalFilter{
	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private RolesConfig securityConfig;

	@Override
	public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
		String userId = exchange.getRequest().getHeaders().get("userId") == null ? 
				null : exchange.getRequest().getHeaders().get("userId").get(0);
		String serviceName = ((ServerWebExchangeDecorator)exchange).getDelegate().getRequest().getPath().value();
		List<String> securityRoles = securityConfig.getSecurityRole(serviceName);
		logger.info("User id {}, serviceName {}, Security roles {}", userId, serviceName, securityRoles);

		if (securityRoles == null || securityRoles.isEmpty()) {
			throw new ConfigException("no security configuration found for " + serviceName);
		}

		if (securityRoles.contains(SecurityRole.INTERNAL.toString())) {
			throw new SecurityException("access to this rest not allowed");
		}

		if (userId == null) {
			if (!securityRoles.contains(SecurityRole.GUEST.toString())) {
				throw new SecurityException("Access to this rest not allowed for guest user. Please send authenticated user id");
			}
		} else {
			User user = getUserDetails(userId);
			if (securityRoles.contains(SecurityRole.ADMIN.toString()) && !user.getIsAdmin()) {
				throw new SecurityException("access to " + serviceName + " requires user with admin permissions");
			}
		}
		return chain.filter(exchange);
	}

	private User getUserDetails(String userId) {
		Map<String, String> pathVariables = new HashMap<>();
		pathVariables.put("userId", userId);
		ResponseEntity<User> userResponse = 
				new RestTemplate().getForEntity("http://users-service:8200/msp/users/internal/v1/{userId}", User.class, pathVariables);
		User user = userResponse.getBody();
		logger.info("user {}", user);
		return user;
	}
}
