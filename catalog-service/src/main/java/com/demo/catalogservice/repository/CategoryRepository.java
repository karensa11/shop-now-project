package com.demo.catalogservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.catalogservice.data.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
