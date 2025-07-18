package com.chahat.library_management.controller;

import com.chahat.library_management.domain.ROLE;
import com.chahat.library_management.dto.IssueResponseDTO;
import com.chahat.library_management.entity.*;
import com.chahat.library_management.mapper.IssueMapper;
import com.chahat.library_management.response.ApiResponse;
import com.chahat.library_management.service.LibrarianService;
import com.chahat.library_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/librarian")
public class LibrarianController {

    @Autowired
    private LibrarianService librarianService;

    @Autowired
    private UserService userService;

    @GetMapping("/students")
    public List<User> getStudents(@RequestHeader("Authorization") String jwt) throws Exception {
        User adminUser = userService.findUserByJWT(jwt);
        University university = adminUser.getUniversity();
        return userService.getUserByRoleAndUniversity(ROLE.ROLE_STUDENT, university);
    }

    @PostMapping("/book")
    public ResponseEntity<Book> addBook(@RequestBody Book book, @RequestHeader("Authorization") String jwt) throws Exception {
        User librarian = userService.findUserByJWT(jwt);
        University university = librarian.getUniversity();
        Library library = librarian.getLibrary();
        Book createdBook = librarianService.addBook(book, university, library);
        return ResponseEntity.ok(createdBook);
    }

    @GetMapping("/books")
    public ResponseEntity<List<Book>> getAllBooks(@RequestHeader("Authorization") String jwt) throws Exception {
        User librarian = userService.findUserByJWT(jwt);
        List<Book> books;
        if (librarian.getUniversity() != null){
            books = librarianService.getAllBooks(librarian.getUniversity());
        } else {
            books = librarianService.getAllBooksByLibrary(librarian.getLibrary());
        }

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
    public ResponseEntity<ApiResponse> returnBook(@RequestParam Long issueId, @RequestHeader("Authorization") String jwt) throws Exception {
        User librarian = userService.findUserByJWT(jwt);
        University university = librarian.getUniversity();
        Issue returned = librarianService.returnBook(issueId, university);
        return ResponseEntity.ok(new ApiResponse(true, "Book Returned"));
    }

    @GetMapping("/issues")
    public List<IssueResponseDTO> getAllIssues(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        University university = user.getUniversity();
        List<Issue> issues = librarianService.getAllIssuedBooks(university);
        return issues.stream().map(IssueMapper::toDTO).collect(Collectors.toList());
    }


    @GetMapping("/issues/student/{studentId}")
    public ResponseEntity<List<Issue>> getIssuedBooksByStudent(@PathVariable Long studentId, @RequestHeader("Authorization") String jwt) throws Exception {
        User librarian = userService.findUserByJWT(jwt);
        University university = librarian.getUniversity();
        List<Issue> issues = librarianService.getIssuedBooksByStudent(studentId, university);
        return ResponseEntity.ok(issues);
    }
}
