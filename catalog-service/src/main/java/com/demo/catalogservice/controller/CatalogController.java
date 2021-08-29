package com.demo.catalogservice.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.catalogservice.data.CatalogItem;
import com.demo.catalogservice.data.Category;
import com.demo.catalogservice.repository.CatalogItemRepository;
import com.demo.catalogservice.repository.CategoryRepository;
import com.demo.utility.CommonConsts;
import com.demo.utility.exception.DetailsNotFoundException;

@CrossOrigin(origins= "*")
@RestController
public class CatalogController {
	
	private static final String BASE_URL = CommonConsts.MS_PREFIX+"/catalog";
	
	@Autowired
	private CatalogItemRepository catalogItemRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private Environment environment;

	@GetMapping(path= BASE_URL + "/categories")
	public List<Category> getCategories() {
		return categoryRepository.findAll();
	}

	@GetMapping(path= BASE_URL + "/categories/{categoryId}/items")
	public List<CatalogItem> getCategoryItems(@PathVariable Long categoryId) {
		Optional<Category> category = categoryRepository.findById(categoryId);
		if (!category.isPresent()) {
			throw new DetailsNotFoundException("category with id " + categoryId + "not exists");
		}
		return catalogItemRepository.findAllByCategoryId(categoryId);
	}

	@GetMapping(path= BASE_URL + "/items/{itemId}")
	public CatalogItem getCatalogItem(@PathVariable Long itemId) {
		Optional<CatalogItem> item = catalogItemRepository.findById(itemId);
		if (!item.isPresent()) {
			throw new DetailsNotFoundException("item with id " + itemId + " not exists");
		}
		CatalogItem result = item.get();
		result.setPort(environment.getProperty("local.server.port"));
		return result;
	}

	@GetMapping(path = BASE_URL + "/items/search")
	public List<CatalogItem> search(@NotNull @RequestParam String searchString) {
		return catalogItemRepository.findAllBySearchString("%" + searchString.toLowerCase() + "%");
	}
}
