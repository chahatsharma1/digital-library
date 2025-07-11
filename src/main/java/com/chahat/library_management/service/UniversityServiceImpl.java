package com.chahat.library_management.service;

import com.chahat.library_management.entity.University;
import com.chahat.library_management.repository.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UniversityServiceImpl implements UniversityService {

    @Autowired
    private UniversityRepository universityRepository;

    @Override
    public List<University> getAllUniversities() {
        return universityRepository.findAll();
    }
}
