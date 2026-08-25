package com.fitsmart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitsmart.dto.LoginRequest;
import com.fitsmart.dto.LoginResponse;
import com.fitsmart.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> Login(
        @Valid @RequestBody LoginRequest request) {
        
        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }
    
}
