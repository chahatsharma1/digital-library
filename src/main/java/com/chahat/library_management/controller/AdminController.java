package com.chahat.library_management.controller;

import com.chahat.library_management.domain.ROLE;
import com.chahat.library_management.entity.Library;
import com.chahat.library_management.entity.University;
import com.chahat.library_management.entity.User;
import com.chahat.library_management.request.UserRequest;
import com.chahat.library_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/students")
    public List<User> getAllStudents(@RequestHeader("Authorization") String jwt) throws Exception {
        User adminUser = userService.findUserByJWT(jwt);
        University university = adminUser.getUniversity();
        return userService.getUserByRoleAndUniversity(ROLE.ROLE_STUDENT, university);
    }

    @GetMapping("/librarian")
    public ResponseEntity<User> getLibrarian(@RequestHeader("Authorization") String jwt) throws Exception {
        User adminUser = userService.findUserByJWT(jwt);
        University university = adminUser.getUniversity();
        Library library = adminUser.getLibrary();
        User librarian;

        if (library != null){
            librarian = userService.getLibrarianByLibrary(library);
        } else {
            librarian = userService.getLibrarianByUniversity(university);
        }
        if (librarian == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(librarian);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId){
        userService.deleteUser(userId);
        return ResponseEntity.ok().body("User Deleted Successfully");
    }

    @PostMapping("/add")
    public ResponseEntity<?> addLibrarian(@RequestBody UserRequest userRequest,@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        Library library = user.getLibrary();
        University university = user.getUniversity();

        userService.addLibrarian(userRequest, university, library);
        return ResponseEntity.ok("Librarian Added");
    }
}
