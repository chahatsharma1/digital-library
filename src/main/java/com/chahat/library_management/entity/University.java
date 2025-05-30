package com.chahat.library_management.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class University {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String City;

    @OneToMany(mappedBy = "university", cascade = CascadeType.ALL)
    private List<Library> libraries;
}
