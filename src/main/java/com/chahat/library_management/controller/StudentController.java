package com.chahat.library_management.controller;

import com.chahat.library_management.dto.BookDTO;
import com.chahat.library_management.dto.IssueResponseDTO;
import com.chahat.library_management.dto.UserDTO;
import com.chahat.library_management.entity.Issue;
import com.chahat.library_management.entity.User;
import com.chahat.library_management.mapper.IssueMapper;
import com.chahat.library_management.service.StudentService;
import com.chahat.library_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("/issues")
    public List<IssueResponseDTO> getAllIssues(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        List<Issue> issues = studentService.getIssuedBooks(user);
        return issues.stream().map(IssueMapper::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/university-staff")
    public ResponseEntity<List<UserDTO>> getUniversityStaff(@RequestHeader("Authorization") String jwt) throws Exception {
        User student = userService.findUserByJWT(jwt);

        if (student.getUniversity() == null) {
            return ResponseEntity.badRequest().build();
        }
        List<User> staff = userService.findStaffByUniversity(student.getUniversity());

        List<UserDTO> staffDto = staff.stream()
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole()
                ))
                .toList();

        return ResponseEntity.ok(staffDto);
    }
}
