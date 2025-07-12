package com.chahat.library_management.service;

import com.chahat.library_management.dto.UniversityDTO;
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

    @Override
    public University updateUniversity(Long id, UniversityDTO updatedUniversity) {
        University university = universityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("University not found"));

        university.setName(updatedUniversity.getName());
        university.setCity(updatedUniversity.getCity());
        return universityRepository.save(university);
    }

    @Override
    public void deleteUniversity(Long id) {
        universityRepository.deleteById(id);
    }
}
