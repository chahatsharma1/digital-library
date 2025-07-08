package com.chahat.library_management.request;

import com.chahat.library_management.domain.ROLE;
import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
    private ROLE role;
}
