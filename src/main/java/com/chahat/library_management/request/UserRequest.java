package com.chahat.library_management.request;

import com.chahat.library_management.domain.ROLE;
import lombok.Data;

@Data
public class UserRequest {
    private String name;
    private String email;
    private String password;
    private ROLE role;
    private Long universityId;
    private String universityName;
    private String city;
}
