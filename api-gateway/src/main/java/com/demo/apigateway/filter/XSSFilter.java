package com.demo.apigateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.ServerWebExchangeDecorator;

import com.demo.utility.validation.ValidationUtil;

import reactor.core.publisher.Mono;

@Component
public class XSSFilter implements GlobalFilter {

	@Override
	public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
		ServerHttpRequest request = ((ServerWebExchangeDecorator)exchange).getDelegate().getRequest();
		checkIfElementContainsBadCharacters(request.getURI().toString(), "URI");
		for (String key : request.getQueryParams().keySet()) {
			checkIfElementContainsBadCharacters(key, "param name " + key);
			String param = request.getQueryParams().getFirst(key);
			if (param !=null) {
				checkIfElementContainsBadCharacters(param, "param value " + key);
			}
		}
		for (String key : request.getHeaders().keySet()) {
			checkIfElementContainsBadCharacters(key, "header name" + key);
			String header = request.getHeaders().get(key).get(0);
			checkIfElementContainsBadCharacters(header, "header value " + key);
		}
		return chain.filter(exchange);
	}

	private void checkIfElementContainsBadCharacters(String element, String name) {
        ValidationUtil.validateBadString(element, name.equals("header value user-agent"));
	}

}
