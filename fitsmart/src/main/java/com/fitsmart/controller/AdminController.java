package com.fitsmart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.oauth2.jwt.Jwt;

import com.fitsmart.dto.UpdateUserStatusRequest;
import com.fitsmart.dto.UserResponse;
import com.fitsmart.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @PatchMapping("/users/{userId}/status")
    public ResponseEntity<UserResponse> updateUserStatus(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long userId,
            @Valid @RequestBody UpdateUserStatusRequest request) {

        Long authenticatedAdminId = Long.valueOf(
                jwt.getClaim("user_id").toString()  
        );

        UserResponse response = userService.updateUserStatus(
            userId,
            authenticatedAdminId,
             request);

        return ResponseEntity.ok(response);
    }
}