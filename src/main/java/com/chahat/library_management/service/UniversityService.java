package com.chahat.library_management.service;

import com.chahat.library_management.dto.UniversityDTO;
import com.chahat.library_management.entity.University;
import java.util.List;

public interface UniversityService {
    List<University> getAllUniversities();
    University updateUniversity(Long id, UniversityDTO updatedUniversity);
    void deleteUniversity(Long id);
}