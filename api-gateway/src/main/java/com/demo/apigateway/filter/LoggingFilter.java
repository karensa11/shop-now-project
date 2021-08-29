package com.demo.apigateway.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import reactor.core.publisher.Mono;

@Component
public class LoggingFilter implements GlobalFilter{
	private Logger logger = LoggerFactory.getLogger(LoggingFilter.class);

	@Override
	public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
		logger.info("Path recieved {} \"{}\", sessionId {}, transactionId {}, userId {}", 
				exchange.getRequest().getMethod().name(),
				exchange.getRequest().getPath().value(),
				exchange.getRequest().getHeaders().get("sessionId"),
				exchange.getRequest().getHeaders().get("transactionId"),
				exchange.getRequest().getHeaders().get("userId"));
		return chain.filter(exchange);
	}
}
