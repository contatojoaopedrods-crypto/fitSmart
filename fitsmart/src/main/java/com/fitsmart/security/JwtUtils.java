package com.fitsmart.security;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.jwt.Jwt;

public final class JwtUtils {

    private JwtUtils() {
    }

    public static Long getUserId(Jwt jwt) {
        Object claim = jwt.getClaim("user_id");

        if (claim == null) {
            throw new AccessDeniedException("Token sem identificação de usuário");
        }
        if (claim instanceof Number number) {
            return number.longValue();
        }
        return Long.valueOf(claim.toString());
    }
}