package com.chahat.library_management.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import javax.crypto.SecretKey;
import java.util.*;

public class JWTProvider {

    private final static SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(JwtConstant.SECRET_KEY));

    public static String generateToken(Authentication auth){
        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
        List<String> roles = new ArrayList<>();
        for (GrantedAuthority authority : authorities) {
            roles.add(authority.getAuthority());
        }

        return Jwts.builder()
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + 86400000))
                .claim("email", auth.getName())
                .claim("roles", roles)
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

    public static List<String> getRolesFromToken(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
        return claims.get("roles", List.class);
    }
}