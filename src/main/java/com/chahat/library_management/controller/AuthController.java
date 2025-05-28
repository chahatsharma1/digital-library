package com.chahat.library_management.controller;

import com.chahat.library_management.config.JWTProvider;
import com.chahat.library_management.entity.User;
import com.chahat.library_management.repository.UserRepository;
import com.chahat.library_management.request.UserRequest;
import com.chahat.library_management.response.AuthResponse;
import com.chahat.library_management.response.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody UserRequest request){

        User exist = userRepository.findUserByEmail(request.getEmail());
        if (exist != null){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new AuthResponse(null, "User already Exist, try again with a different email"));
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

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
