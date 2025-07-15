package com.chahat.library_management.controller;

import com.chahat.library_management.dto.BookDTO;
import com.chahat.library_management.entity.User;
import com.chahat.library_management.service.StudentService;
import com.chahat.library_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private UserService userService;

    @Autowired
    private StudentService studentService;

    @GetMapping("/books")
    public ResponseEntity<List<BookDTO>> getAllBooks(@RequestHeader ("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        List<BookDTO> bookDTOList = studentService.getAvailableBooks(user.getUniversity());
        return ResponseEntity.ok(bookDTOList);
    }
}
