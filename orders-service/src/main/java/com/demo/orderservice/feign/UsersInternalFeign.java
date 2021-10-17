package com.demo.orderservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.demo.orderservice.data.feign.User;
import com.demo.utility.CommonConsts;

@FeignClient(name = "users-service")
public interface UsersInternalFeign {
	String BASE_PATH = CommonConsts.MS_PREFIX+"/users/internal" + CommonConsts.V1;

	@GetMapping(path = BASE_PATH+"/{userId}")
	public User getUser(@PathVariable Long userId);
}
