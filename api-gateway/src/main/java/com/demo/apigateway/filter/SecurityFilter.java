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
import com.demo.apigateway.security.SecurityConfig;
import com.demo.apigateway.security.SecurityRole;

import reactor.core.publisher.Mono;

@Component
public class SecurityFilter implements GlobalFilter{
	private Logger logger = LoggerFactory.getLogger(SecurityFilter.class);

	@Autowired
	private SecurityConfig securityConfig;

	@Override
	public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
		String userId = exchange.getRequest().getHeaders().get("userId") == null ? null : exchange.getRequest().getHeaders().get("userId").get(0);
		logger.info("User id {}", userId);
		String serviceName = ((ServerWebExchangeDecorator)exchange).getDelegate().getRequest().getPath().value();
		logger.info("serviceName " + serviceName);
		List<String> securityRoles = securityConfig.getSecurityRole(serviceName);
		logger.info("Security roles {}", securityRoles);
		if (securityRoles == null || securityRoles.isEmpty()) {
			throw new RuntimeException("no security definition found for " + serviceName);
		}
		if (userId == null) {
			if (!securityRoles.contains(SecurityRole.GUEST.toString())) {
				throw new RuntimeException("access to this rest not allowed for guest user. Please send authenticated user id");
			}
		} else {
			Map<String, String> pathVariables = new HashMap<>();
			pathVariables.put("userId", userId);
			ResponseEntity<User> userResponse = 
					new RestTemplate().getForEntity("http://users-service:8200/msp/users/admin/v1/{userId}", User.class, pathVariables);
			User user = userResponse.getBody();
			logger.info("user {}", user);
			if (securityRoles.contains(SecurityRole.ADMIN.toString())) {
				if (!user.getIsAdmin()) {
					throw new RuntimeException("access to " + serviceName + " requires user with admin permissions");
				}
			}
		}
		return chain.filter(exchange);
	}
}
