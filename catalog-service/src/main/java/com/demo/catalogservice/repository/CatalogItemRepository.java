package com.demo.catalogservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.demo.catalogservice.data.CatalogItem;

@Repository
public interface CatalogItemRepository extends JpaRepository<CatalogItem, Long> {
	public List<CatalogItem> findAllByCategoryId(Long categoryId);

	@Query(value = "select * from CATALOG_ITEM where NAME like ?", nativeQuery = true)
	public List<CatalogItem> findAllBySearchString(String searchString);
}
