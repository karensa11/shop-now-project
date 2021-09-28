package com.demo.orderservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.demo.utility.CommonConsts;

@FeignClient(name = "users-service")
public interface UsersFeign {

	String BASE_PATH = CommonConsts.MS_PREFIX+"/users" + CommonConsts.V1;

	@GetMapping(path = BASE_PATH + "/{userId}/is-admin")
	public boolean isAdmin(@PathVariable Long userId);
}
