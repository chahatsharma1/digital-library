package com.chahat.library_management.repository;

import com.chahat.library_management.entity.Issue;
import com.chahat.library_management.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByUniversity(University university);
    List<Issue> findByUserIdAndUniversity(Long userId, University university);
}
