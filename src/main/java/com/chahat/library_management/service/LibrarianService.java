package com.chahat.library_management.service;

import com.chahat.library_management.entity.Book;
import com.chahat.library_management.entity.Issue;
import com.chahat.library_management.entity.University;

import java.util.List;

public interface LibrarianService {

    Book addBook(Book book, University university);
    List<Book> getAllBooks(University University);
    Issue issueBookToStudent(Long bookId, Long studentId, University University);
    Issue returnBook(Long issueId, University University);
    List<Issue> getAllIssuedBooks(University University);
    List<Issue> getIssuedBooksByStudent(Long studentId, University University);
}
