package com.chahat.library_management.entity;

import com.chahat.library_management.domain.ROLE;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private ROLE role;
}
