package com.chahat.library_management.service;

import com.chahat.library_management.domain.ROLE;
import com.chahat.library_management.entity.Library;
import com.chahat.library_management.entity.University;
import com.chahat.library_management.entity.User;
import com.chahat.library_management.request.UserRequest;

import java.util.List;

public interface UserService {
    User findUserByJWT(String jwt) throws Exception;
    List<User> getUserByRoleAndUniversity(ROLE role, University university);
    User getLibrarianByUniversity(University university);
    User getLibrarianByLibrary(Library library);
    void deleteUser(Long userId);
    void addLibrarian(UserRequest librarian, University university, Library library);
    List<User> findStaffByUniversity(University university);
}
