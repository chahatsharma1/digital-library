package com.chahat.library_management.config;

import com.chahat.library_management.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

public class JWTProvider {

    private final static SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(JwtConstant.SECRET_KEY));

    public static String generateToken(User user){
        return Jwts.builder()
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000))
                .claim("email", user.getEmail())
                .claim("role", user.getRole())
                .claim("userId", user.getId())
                .claim("universityId", user.getUniversity() != null ? user.getUniversity().getId() : null)
                .signWith(key)
                .compact();
    }

    public static String generateToken(Authentication auth) {
        String email = auth.getName();
        String role = auth.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("USER");

        Object principal = auth.getPrincipal();

        Long universityId = null;
        Long userId = null;

        if (principal instanceof User user) {
            universityId = user.getUniversity() != null ? user.getUniversity().getId() : null;
            userId = user.getId();
        }

        return Jwts.builder()
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000))
                .claim("email", email)
                .claim("role", role)
                .claim("userId", userId)
                .claim("universityId", universityId)
                .signWith(key)
                .compact();
    }

    public static String getEmailFromToken(String token){
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
        return String.valueOf(claims.get("email"));
    }
}
