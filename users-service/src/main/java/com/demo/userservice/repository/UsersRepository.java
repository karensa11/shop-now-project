package com.demo.userservice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.userservice.data.User;

@Repository
public interface UsersRepository extends JpaRepository<User, Long> {
	public Optional<User> findByEmail(String email);
}
