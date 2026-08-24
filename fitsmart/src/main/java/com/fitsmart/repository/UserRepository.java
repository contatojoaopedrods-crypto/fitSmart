package com.fitsmart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fitsmart.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmailIgnoreCase(String email);    
}