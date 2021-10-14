package com.demo.userservice.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import com.demo.userservice.data.feign.OrderDetails;
import com.demo.utility.CommonConsts;

@FeignClient(name = "orders-service")
public interface OrdersFeign {
	
	static final String BASE_PATH = CommonConsts.MS_PREFIX+"/orders"+CommonConsts.V1;

	@GetMapping(path = BASE_PATH + "/user/open")
	public OrderDetails getOpenOrderForUser(
			@RequestHeader Long authenticationId);

	@GetMapping(path = BASE_PATH + "/user/not-open")
	public List<OrderDetails> getNotOpenedOrdersForUser(
			@RequestHeader Long authenticationId);

	@DeleteMapping(path = BASE_PATH + "/{orderId}")
	public void cancelOrder(
			@PathVariable Long orderId, 
			@RequestHeader Long authenticationId);
}
