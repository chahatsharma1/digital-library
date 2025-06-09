package com.chahat.library_management.controller;

import com.chahat.library_management.entity.Book;
import com.chahat.library_management.entity.Issue;
import com.chahat.library_management.entity.University;
import com.chahat.library_management.entity.User;
import com.chahat.library_management.service.LibrarianService;
import com.chahat.library_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/librarian")
public class LibrarianController {

    @Autowired
    private LibrarianService librarianService;

    @Autowired
    private UserService userService;

    @GetMapping("/books")
    public ResponseEntity<List<Book>> getAllBooks(@RequestHeader("Authorization") String jwt) throws Exception {
        User librarian = userService.findUserByJWT(jwt);
        University university = librarian.getUniversity();
        List<Book> books = librarianService.getAllBooks(university);
        return ResponseEntity.ok(books);
    }

    @PostMapping("/issue")
    public ResponseEntity<Issue> issueBookToStudent(@RequestParam Long bookId, @RequestParam Long studentId, @RequestHeader("Authorization") String jwt) throws Exception {
        User librarian = userService.findUserByJWT(jwt);
        University university = librarian.getUniversity();
        Issue issue = librarianService.issueBookToStudent(bookId, studentId, university);
        return ResponseEntity.ok(issue);
    }

    @PostMapping("/return")
    public ResponseEntity<Issue> returnBook(@RequestParam Long issueId, @RequestHeader("Authorization") String jwt) throws Exception {
        User librarian = userService.findUserByJWT(jwt);
        University university = librarian.getUniversity();
        Issue returned = librarianService.returnBook(issueId, university);
        return ResponseEntity.ok(returned);
    }

    @GetMapping("/issues")
    public ResponseEntity<List<Issue>> getAllIssuedBooks(@RequestHeader("Authorization") String jwt) throws Exception {
        User librarian = userService.findUserByJWT(jwt);
        University university = librarian.getUniversity();
        List<Issue> issues = librarianService.getAllIssuedBooks(university);
        return ResponseEntity.ok(issues);
    }

    @GetMapping("/issues/student/{studentId}")
    public ResponseEntity<List<Issue>> getIssuedBooksByStudent(@PathVariable Long studentId, @RequestHeader("Authorization") String jwt) throws Exception {
        User librarian = userService.findUserByJWT(jwt);
        University university = librarian.getUniversity();
        List<Issue> issues = librarianService.getIssuedBooksByStudent(studentId, university);
        return ResponseEntity.ok(issues);
    }
}
