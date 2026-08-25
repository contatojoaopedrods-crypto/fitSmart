package com.fitsmart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.fitsmart.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmailIgnoreCase(String email);  
    
    Optional<User> findByEmailIgnoreCase(String email);
}