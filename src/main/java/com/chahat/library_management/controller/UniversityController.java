package com.chahat.library_management.controller;

import com.chahat.library_management.dto.UniversityDTO;
import com.chahat.library_management.entity.University;
import com.chahat.library_management.entity.User;
import com.chahat.library_management.service.UniversityService;
import com.chahat.library_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/university")
public class UniversityController {

    @Autowired
    private UniversityService universityService;

    @Autowired
    private UserService userService;

    @GetMapping("/my")
    public UniversityDTO getUniversitySummary(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        University university = user.getUniversity();

        return new UniversityDTO(university.getName(), university.getCity());
    }

    @PutMapping("/update")
    public University updateUniversity(@RequestHeader("Authorization") String jwt, @RequestBody UniversityDTO updated) throws Exception {
        User user = userService.findUserByJWT(jwt);
        return universityService.updateUniversity(user.getUniversity().getId(), updated);
    }

    @DeleteMapping("/delete")
    public void deleteUniversity(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        universityService.deleteUniversity(user.getUniversity().getId());
    }
}
