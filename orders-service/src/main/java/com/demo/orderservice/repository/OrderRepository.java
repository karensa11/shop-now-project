package com.demo.orderservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.demo.orderservice.data.entity.OrderDetails;

@Repository
public interface OrderRepository extends JpaRepository<OrderDetails, Long>{
	@Query(value = "select * from ORDER_DETAILS where STATUS <> 'OPEN' and USER_ID = ?", nativeQuery = true)
	public List<OrderDetails> findNotOpenOrdersByUserId(Long userId);
	
	@Query(value = "select * from ORDER_DETAILS where STATUS = 'OPEN' and USER_ID = ?", nativeQuery = true)
	public Optional<OrderDetails> findOpenOrderByUserId(Long userId);
	
	@Query(value = "select * from ORDER_DETAILS where STATUS = 'PLACED' and USER_ID = ?", nativeQuery = true)
	public List<OrderDetails> findAllPlacedOrderByUserId(Long userId);
}
