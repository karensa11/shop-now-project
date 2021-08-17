package com.demo.orderservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.demo.orderservice.data.OrderDetails;
import com.demo.orderservice.data.OrderStatus;

@Repository
public interface OrderRepository extends JpaRepository<OrderDetails, Long>{
	public List<OrderDetails> findByUserId(Long userId);
	
	@Query(value = "select * from ORDER_DETAILS where STATUS = '" + OrderStatus.OPEN + "' and USER_ID = ?", nativeQuery = true)
	public Optional<OrderDetails> findOpenOrderByUserId(Long userId);
}
