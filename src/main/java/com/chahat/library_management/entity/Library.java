package com.chahat.library_management.entity;

import com.chahat.library_management.domain.LibraryType;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Library {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private LibraryType libraryType;

    @ManyToOne
    @JoinColumn(name = "university_id")
    private University university;

    @OneToMany(mappedBy = "library", cascade = CascadeType.ALL)
    private List<User> users;

    @OneToMany(mappedBy = "library", cascade = CascadeType.ALL)
    private List<Book> books;
}
