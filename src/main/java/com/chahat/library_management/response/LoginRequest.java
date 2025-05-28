package com.chahat.library_management.response;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
