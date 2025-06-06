package com.chahat.library_management.controller;

import com.chahat.library_management.domain.ROLE;
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

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/librarian")
    public List<User> getLibrarian(){
        return userService.getUserByRole(ROLE.ROLE_LIBRARIAN);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId){
        userService.deleteUser(userId);
        return ResponseEntity.ok().body("User Deleted Successfully");
    }

    @PostMapping("/add")
    public ResponseEntity<?> addLibrarian(@RequestBody UserRequest userRequest,@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        University university = user.getUniversity();

        userService.addLibrarian(userRequest, university);
        return ResponseEntity.ok("Librarian Added");
    }
}
