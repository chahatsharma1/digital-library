package com.chahat.library_management.entity;

import com.chahat.library_management.domain.ROLE;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Enumerated(EnumType.STRING)
    private ROLE role;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "university_id")
    private University university;

    @ManyToOne
    private Library library;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Issue> issues;

}
