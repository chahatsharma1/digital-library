package com.chahat.library_management.service;

import com.chahat.library_management.config.JWTProvider;
import com.chahat.library_management.domain.ROLE;
import com.chahat.library_management.dto.ChangePasswordRequestDTO;
import com.chahat.library_management.entity.Library;
import com.chahat.library_management.entity.University;
import com.chahat.library_management.entity.User;
import com.chahat.library_management.repository.UserRepository;
import com.chahat.library_management.request.EditUserRequest;
import com.chahat.library_management.request.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User findUserByJWT(String jwt) throws Exception {
        String email = JWTProvider.getEmailFromToken(jwt);
        User user = userRepository.findUserByEmail(email);

        if (user == null){
            throw new Exception("User Not Found");
        }
        return user;
    }

    @Override
    public List<User> getUserByRoleAndUniversity(ROLE role, University university){
        return userRepository.findUserByRoleAndUniversity(role, university);
    }

    @Override
    public User getLibrarianByUniversity(University university) {
        return userRepository.findByRoleAndUniversity(ROLE.ROLE_LIBRARIAN, university);
    }

    @Override
    public User getLibrarianByLibrary(Library library) {
        return userRepository.findByRoleAndLibrary(ROLE.ROLE_LIBRARIAN, library);
    }

    @Override
    public User updateUser(Long userId, EditUserRequest request) {
        User updated = userRepository.findUserById(userId);

        if (request.getName() != null && !request.getName().isEmpty()) {
            updated.setName(request.getName());
        }

        if (request.getEmail() != null && !request.getEmail().isEmpty()){
            if (userRepository.findUserByEmail(request.getEmail()) == null){
                updated.setEmail(request.getEmail());
            }
        }
        return userRepository.save(updated);
    }

    @Override
    public void changeUserPassword(User user, ChangePasswordRequestDTO req) throws Exception {
        if (!passwordEncoder.matches(req.getCurrentPassword(), user.getPassword())) {
            throw new Exception("Incorrect current password.");
        }

        if (!req.getNewPassword().equals(req.getConfirmPassword())) {
            throw new Exception("New password and confirm password do not match.");
        }

        user.setPassword(passwordEncoder.encode(req.getNewPassword()));

        userRepository.save(user);
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public void addLibrarian(UserRequest librarian, University university, Library library) {
        User user = new User();
        user.setName(librarian.getName());
        user.setUniversity(university);
        user.setLibrary(library);
        user.setEmail(librarian.getEmail());
        user.setPassword(passwordEncoder.encode(librarian.getPassword()));
        user.setRole(ROLE.ROLE_LIBRARIAN);
        userRepository.save(user);
    }
    @Override
    public List<User> findStaffByUniversity(University university) {
        List<ROLE> roles = Arrays.asList(ROLE.ROLE_ADMIN, ROLE.ROLE_LIBRARIAN);
        return userRepository.findByUniversityAndRoleIn(university, roles);
    }
}
