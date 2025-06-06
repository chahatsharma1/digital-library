package com.chahat.library_management.repository;

import com.chahat.library_management.domain.ROLE;
import com.chahat.library_management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByEmail(String email);
    List<User> findUserByRole(ROLE role);
}
