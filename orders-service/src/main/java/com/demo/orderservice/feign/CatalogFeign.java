package com.demo.orderservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.demo.orderservice.data.CatalogItem;

@FeignClient(name = "catalog-service")
public interface CatalogFeign {

	@GetMapping(path = "/catalog/items/{itemId}")
	public CatalogItem getCatalogItem(@PathVariable("itemId") Long itemId);
}
