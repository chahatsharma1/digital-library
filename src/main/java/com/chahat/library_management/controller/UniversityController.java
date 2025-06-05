package com.chahat.library_management.controller;

import com.chahat.library_management.entity.University;
import com.chahat.library_management.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("university")
public class UniversityController {

    @Autowired
    private UniversityService universityService;

    @GetMapping("/all")
    public ResponseEntity<List<University>> getAllUniversities() {
        return ResponseEntity.ok(universityService.getAllUniversities());
    }
}
