package com.chahat.library_management.service;

import com.chahat.library_management.config.JWTProvider;
import com.chahat.library_management.domain.ROLE;
import com.chahat.library_management.entity.Library;
import com.chahat.library_management.entity.University;
import com.chahat.library_management.entity.User;
import com.chahat.library_management.repository.UserRepository;
import com.chahat.library_management.request.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getUserByRole(ROLE role) {
        return userRepository.findUserByRole(role);
    }

    @Override
    public User getLibrarianByUniversity(University university) {
        return userRepository.findByRoleAndUniversity(ROLE.ROLE_LIBRARIAN, university);
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
}
