package com.demo.userservice.feign;

import javax.validation.constraints.NotNull;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import com.demo.userservice.data.OrderDetails;
import com.demo.utility.CommonConsts;

@FeignClient(name = "orders-service")
public interface OrdersFeign {
	
	static final String BASE_PATH = CommonConsts.MS_PREFIX+"/orders";

	@GetMapping(path = BASE_PATH + "/user")
	public OrderDetails getOpenOrderForUser(@RequestHeader @NotNull Long userId);

	@DeleteMapping(path = BASE_PATH + "/{orderId}")
	public void cancelOrder(@PathVariable Long orderId);
}
