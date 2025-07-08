package com.chahat.library_management.response;

import lombok.Data;

@Data
public class AuthResponse {
    private String jwt;
    private String message;

    public AuthResponse() {
    }

    public AuthResponse(String jwt, String message) {
        this.jwt = jwt;
        this.message = message;
    }
}
