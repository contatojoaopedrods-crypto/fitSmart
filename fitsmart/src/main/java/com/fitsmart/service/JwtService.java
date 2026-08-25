package com.fitsmart.service;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.stereotype.Service;

import com.fitsmart.model.User;

@Service
public class JwtService {

    private static final String ISSUER = "fitsmart-api";

    private final JwtEncoder jwtEncoder;
    private final long expirationSeconds;

    public JwtService(
            JwtEncoder jwtEncoder,
            @Value("${security.jwt.expiration-seconds}") Long expirationSeconds) {

        this.jwtEncoder = jwtEncoder;
        this.expirationSeconds = expirationSeconds;
    }

    public String generateToken(User user) {

        Instant now = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(ISSUER)
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expirationSeconds))
                .subject(user.getEmail())
                .claim("user_id", user.getId())
                .claim("role", user.getTipo_usuario().name())
                .build();

        JwsHeader header = JwsHeader
            .with(MacAlgorithm.HS256)
            .type("JWT")
            .build();

        
        return jwtEncoder
            .encode(JwtEncoderParameters.from(header, claims))
            .getTokenValue();
    }


    public long getExpirationSeconds() {
        return expirationSeconds;
    }
}
