package com.fitsmart.service;

import java.util.Locale;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fitsmart.dto.LoginRequest;
import com.fitsmart.dto.LoginResponse;
import com.fitsmart.exception.InactiveUserException;
import com.fitsmart.exception.InvalidCredentialsException;
import com.fitsmart.model.User;
import com.fitsmart.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(

            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {

        String email = request.email()
                .trim()
                .toLowerCase(Locale.ROOT);

        User user = userRepository
                .findByEmailIgnoreCase(email)
                .orElseThrow(() -> new InvalidCredentialsException("E-mail ou senha inválidos"));

        boolean passwordMatches = passwordEncoder.matches(
                request.senha(),
                user.getSenha());

        if (!passwordMatches) {
            throw new InvalidCredentialsException("E-mail ou senha inválidos");
        }

        if (!user.isAtivo()) {
            throw new InactiveUserException("Este usário está inativo");
        }

        String token = jwtService.generateToken(user);

        return new LoginResponse(
                user.getId(),
                user.getNome(),
                user.getSobrenome(),
                user.getEmail(),
                user.getTipo_usuario(),
                token,
                "Bearer",
                jwtService.getExpirationSeconds());
    }

}
