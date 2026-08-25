package com.fitsmart.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import com.fitsmart.dto.UpdateEmailRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;

import com.fitsmart.repository.UserRepository;

import org.springframework.web.bind.annotation.RequestBody;
import com.fitsmart.dto.CreateUserRequest;
import com.fitsmart.dto.UpdatePasswordRequest;
import com.fitsmart.dto.UpdateUserRequest;
import com.fitsmart.dto.UserResponse;
import com.fitsmart.service.UserService;


@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(
            UserRepository userRepository,
            UserService userService) {

        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserResponse> createUser(
            @Valid @RequestBody CreateUserRequest request) {

        UserResponse response = userService.createUser(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> listUsers() {

        List<UserResponse> responses = userService.listUsers();

        return ResponseEntity.ok(responses);

    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {

        UserResponse response = userService.getUserByid(id);

        return ResponseEntity.ok(response);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/me")
    public ResponseEntity<UserResponse> updateCurrrentUser(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody UpdateUserRequest request) {

        Long userId = getAuthenticatedUserId(jwt);

        UserResponse response = userService.updateUser(userId, request);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/me/password")
    public ResponseEntity<Void> updatePassword(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody UpdatePasswordRequest request) {

        Long userId = getAuthenticatedUserId(jwt);

        userService.updatePassword(userId, request);

        return ResponseEntity.noContent().build();
    }


    @PatchMapping("/me/email")
    public ResponseEntity<UserResponse> updateEmail(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody UpdateEmailRequest request) {

        Long userId = getAuthenticatedUserId(jwt);

        UserResponse response = userService.updateEmail(userId, request);

        return ResponseEntity.ok(response);
    }


    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(
            @AuthenticationPrincipal Jwt jwt) {
        
        Long userId = getAuthenticatedUserId(jwt);

        UserResponse response = userService.getUserByid(userId);
        
        return ResponseEntity.ok(response);
    }
    

    private Long getAuthenticatedUserId(Jwt jwt) {

        Object userIdClaim = jwt.getClaim("user_id");

        if (userIdClaim instanceof Number number) {
            return number.longValue();
        }

        return Long.valueOf(userIdClaim.toString());
    }

}
