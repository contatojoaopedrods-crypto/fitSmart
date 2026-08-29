package com.fitsmart.exception;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.fitsmart.dto.ApiErrorResponse;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler({
                        EmailAlreadyExistsException.class,
                        CrefAlreadyExistsException.class,
                        SelfDeactivationException.class
        })

        public ResponseEntity<ApiErrorResponse> handleConflict(
                        RuntimeException exception,
                        HttpServletRequest request) {

                ApiErrorResponse response = new ApiErrorResponse(
                                LocalDateTime.now(),
                                HttpStatus.CONFLICT.value(),
                                HttpStatus.CONFLICT.getReasonPhrase(),
                                exception.getMessage(),
                                request.getRequestURI(),
                                null);

                return ResponseEntity
                                .status(HttpStatus.CONFLICT)
                                .body(response);
        }

        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<ApiErrorResponse> handleResourceNotFound(
                        ResourceNotFoundException exception,
                        HttpServletRequest request) {

                ApiErrorResponse response = new ApiErrorResponse(
                                LocalDateTime.now(),
                                HttpStatus.NOT_FOUND.value(),
                                HttpStatus.NOT_FOUND.getReasonPhrase(),
                                exception.getMessage(),
                                request.getRequestURI(),
                                null);

                return ResponseEntity
                                .status(HttpStatus.NOT_FOUND)
                                .body(response);
        }

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ApiErrorResponse> handleValidationErrors(
                        MethodArgumentNotValidException exception,
                        HttpServletRequest request) {

                Map<String, String> fieldErrors = new LinkedHashMap<>();

                exception.getBindingResult()
                                .getFieldErrors()
                                .forEach(error -> fieldErrors.put(
                                                error.getField(),
                                                error.getDefaultMessage()));

                ApiErrorResponse response = new ApiErrorResponse(
                                LocalDateTime.now(),
                                HttpStatus.BAD_REQUEST.value(),
                                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                                "Existem campos inválidos na requisição",
                                request.getRequestURI(),
                                fieldErrors);

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(response);
        }

        @ExceptionHandler(InvalidPasswordException.class)
        public ResponseEntity<ApiErrorResponse> handleInvalidPassword(
                        InvalidPasswordException exception,
                        HttpServletRequest request) {

                ApiErrorResponse response = new ApiErrorResponse(
                                LocalDateTime.now(),
                                HttpStatus.BAD_REQUEST.value(),
                                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                                exception.getMessage(),
                                request.getRequestURI(),
                                null);

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(response);
        }

        @ExceptionHandler(InvalidEmailException.class)
        public ResponseEntity<ApiErrorResponse> handleInvalidEmail(
                        InvalidEmailException exception,
                        HttpServletRequest request) {

                ApiErrorResponse response = new ApiErrorResponse(
                                LocalDateTime.now(),
                                HttpStatus.BAD_REQUEST.value(),
                                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                                exception.getMessage(),
                                request.getRequestURI(),
                                null);

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(response);
        }

        @ExceptionHandler(InvalidCredentialsException.class)
        public ResponseEntity<ApiErrorResponse> handleInvalidCredentials(
                        InvalidCredentialsException exception,
                        HttpServletRequest request) {

                ApiErrorResponse response = new ApiErrorResponse(
                                LocalDateTime.now(),
                                HttpStatus.UNAUTHORIZED.value(),
                                HttpStatus.UNAUTHORIZED.getReasonPhrase(),
                                exception.getMessage(),
                                request.getRequestURI(),
                                null);

                return ResponseEntity
                                .status(HttpStatus.UNAUTHORIZED)
                                .body(response);
        }

        @ExceptionHandler(InactiveUserException.class)
        public ResponseEntity<ApiErrorResponse> handleInactiveUser(
                        InactiveUserException exception,
                        HttpServletRequest request) {

                ApiErrorResponse response = new ApiErrorResponse(
                                LocalDateTime.now(),
                                HttpStatus.FORBIDDEN.value(),
                                HttpStatus.FORBIDDEN.getReasonPhrase(),
                                exception.getMessage(),
                                request.getRequestURI(),
                                null);

                return ResponseEntity
                                .status(HttpStatus.FORBIDDEN)
                                .body(response);
        }
}