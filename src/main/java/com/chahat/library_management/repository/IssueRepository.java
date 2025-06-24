package com.chahat.library_management.repository;

import com.chahat.library_management.entity.Issue;
import com.chahat.library_management.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByUniversity(University university);
    List<Issue> findByUserIdAndUniversity(Long userId, University university);
}
