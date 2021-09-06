package com.demo.tracking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.tracking.data.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
	public List<Notification> findAllByUserId(Long userId);
}
