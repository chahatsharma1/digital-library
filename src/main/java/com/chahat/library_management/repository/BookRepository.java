package com.chahat.library_management.repository;

import com.chahat.library_management.entity.Book;
import com.chahat.library_management.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByTitle(String title);
    List<Book> findByUniversity(University university);
    Optional<Book> findByIdAndUniversity(Long id, University university);
    List<Book> findByLibraryId(Long libraryId);
}
