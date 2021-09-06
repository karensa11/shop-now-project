package com.demo.tracking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.demo.tracking.data.Notification;
import com.demo.tracking.repository.NotificationRepository;
import com.demo.utility.CommonConsts;

@RestController
public class TrackingController {
	
	private static final String BASE_PATH = CommonConsts.MS_PREFIX + "/tracking";
	
	@Autowired
	private NotificationRepository notificationRepository;

	@GetMapping(path = BASE_PATH + "/userId/{userId}")
	public List<Notification> getNotifications(@PathVariable Long userId) {
		return notificationRepository.findAllByUserId(userId);
	}
}
