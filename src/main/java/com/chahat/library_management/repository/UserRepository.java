package com.chahat.library_management.repository;

import com.chahat.library_management.domain.ROLE;
import com.chahat.library_management.entity.Library;
import com.chahat.library_management.entity.University;
import com.chahat.library_management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByEmail(String email);
    List<User> findUserByRoleAndUniversity(ROLE role, University university);
    User findByRoleAndUniversity(ROLE role, University university);
    User findByRoleAndLibrary(ROLE role, Library library);
    List<User> findByUniversityAndRoleIn(University university, Collection<ROLE> role);
}