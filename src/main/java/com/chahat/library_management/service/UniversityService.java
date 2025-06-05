package com.chahat.library_management.service;

import com.chahat.library_management.entity.University;
import java.util.List;
import java.util.Optional;

public interface UniversityService {
    Optional<University> getUniversityById(Long id);
    List<University> getAllUniversities();
    void deleteUniversity(Long id);
}
