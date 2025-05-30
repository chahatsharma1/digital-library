package com.chahat.library_management.controller;

import com.chahat.library_management.entity.University;
import com.chahat.library_management.repository.UniversityRepository;
import com.chahat.library_management.request.UniversityRequest;
import com.chahat.library_management.response.UniversityResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/universities")
public class UniversityController {

    @Autowired
    private UniversityRepository universityRepository;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<UniversityResponse> createUniversity(@RequestBody UniversityRequest universityRequest) {
        University university = new University();
        university.setName(universityRequest.getName());
        university.setCity(universityRequest.getCity());
        universityRepository.save(university);

        return ResponseEntity.status(HttpStatus.CREATED).body(new UniversityResponse(universityRequest.getName(), "University Successfully added"));
    }

    @GetMapping
    public ResponseEntity<List<University>> getAllUniversities() {
        return ResponseEntity.ok(universityRepository.findAll());
    }
}
