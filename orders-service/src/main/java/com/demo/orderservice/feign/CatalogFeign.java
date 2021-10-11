package com.demo.orderservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.demo.orderservice.data.feign.CatalogItem;
import com.demo.utility.CommonConsts;

@FeignClient(name = "catalog-service")
public interface CatalogFeign {

	static final String BASE_PATH = CommonConsts.MS_PREFIX+"/catalog"+CommonConsts.V1;
	
	@GetMapping(path = BASE_PATH+"/items/{itemId}")
	public CatalogItem getCatalogItem(@PathVariable("itemId") Long itemId);
}
