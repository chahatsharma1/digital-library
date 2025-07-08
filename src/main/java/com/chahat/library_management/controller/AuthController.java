package com.chahat.library_management.controller;

import com.chahat.library_management.config.JWTProvider;
import com.chahat.library_management.entity.Library;
import com.chahat.library_management.entity.University;
import com.chahat.library_management.entity.User;
import com.chahat.library_management.repository.LibraryRepository;
import com.chahat.library_management.repository.UniversityRepository;
import com.chahat.library_management.repository.UserRepository;
import com.chahat.library_management.request.UserRequest;
import com.chahat.library_management.response.AuthResponse;
import com.chahat.library_management.request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UniversityRepository universityRepository;

    @Autowired
    private LibraryRepository libraryRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Transactional
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody UserRequest request){

        if (userRepository.findUserByEmail(request.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new AuthResponse(null, "User already exists with this email"));
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        switch (request.getRole()){
            case ROLE_STUDENT -> {
                if (request.getUniversityId() == null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new AuthResponse(null, "University ID is required for STUDENT registration"));
                }

                University university = universityRepository.findById(request.getUniversityId())
                        .orElseThrow(() -> new RuntimeException("University not found"));

                user.setUniversity(university);
            }

            case ROLE_ADMIN -> {
                if (request.getUniversityName() == null){
                    return ResponseEntity.badRequest().body(new AuthResponse(null, "University Name is Required"));
                }

                University university = new University();
                university.setName(request.getUniversityName());
                university.setCity(request.getCity());
                universityRepository.save(university);

                user.setUniversity(university);
            }

            case ROLE_LIBRARY_ADMIN -> {
                if (request.getLibraryName() == null) {
                    return ResponseEntity.badRequest().body(new AuthResponse(null, "Library Name is required for LIBRARY_ADMIN registration"));
                }

                Library library = new Library();
                library.setName(request.getLibraryName());
                library.setCity(request.getCity());
                libraryRepository.save(library);

                user.setLibrary(library);
            }

            default -> {
                return ResponseEntity.badRequest().body(new AuthResponse(null, "Invalid Role"));
            }
        }

        userRepository.save(user);

        String jwt = JWTProvider.generateToken(user);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Successfully Registered");
        return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
        try {

            User user = userRepository.findUserByEmail(request.getEmail());
            if(user == null){
                throw new UsernameNotFoundException("User Does Not Exist");
            }

            if (!user.getRole().equals(request.getRole())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new AuthResponse(null, "Access denied for this role"));
            }

            Authentication auth = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            String jwt = JWTProvider.generateToken(auth);

            return ResponseEntity.ok(new AuthResponse(jwt, "Login Successfully"));

        } catch (BadCredentialsException e){

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(null, "Invalid Email or password"));
        }
    }
}
