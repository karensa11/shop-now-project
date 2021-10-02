package com.demo.orderservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.demo.orderservice.data.User;
import com.demo.utility.CommonConsts;

@FeignClient(name = "users-service")
public interface UsersAdminFeign {

	String BASE_PATH = CommonConsts.MS_PREFIX+"/users/admin" + CommonConsts.V1;

	@GetMapping(path = BASE_PATH+"/search-by-email")
	public User searchUserByEmail(@RequestParam String email);
}
