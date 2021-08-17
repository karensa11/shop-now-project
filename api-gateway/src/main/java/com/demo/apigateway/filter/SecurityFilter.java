package com.demo.apigateway.filter;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.ServerWebExchangeDecorator;

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
		logger.info("User id {}", exchange.getRequest().getHeaders().get("userId"));
		String serviceName = ((ServerWebExchangeDecorator)exchange).getDelegate().getRequest().getPath().value();
		serviceName = serviceName.substring(1, serviceName.length());
		serviceName = serviceName.substring(0, serviceName.indexOf('/'));
		List<String> securityRoles = securityConfig.getSecurityRole(serviceName);
		logger.info("Security configuration {}", securityConfig.getSecurityRole(serviceName));
		if (securityRoles == null) {
			throw new RuntimeException("no security definition found for " + serviceName);
		}
		if (!securityRoles.contains(SecurityRole.GUEST) && (userId == null || userId.isEmpty())) {
			throw new RuntimeException("access to " + serviceName + " requires authentication");
		}
		return chain.filter(exchange);
	}
}
