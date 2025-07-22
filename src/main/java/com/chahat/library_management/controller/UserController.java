package com.chahat.library_management.controller;

import com.chahat.library_management.dto.ChangePasswordRequestDTO;
import com.chahat.library_management.dto.UserDetailDTO;
import com.chahat.library_management.entity.User;
import com.chahat.library_management.mapper.UserMapper;
import com.chahat.library_management.request.EditUserRequest;
import com.chahat.library_management.response.ApiResponse;
import com.chahat.library_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/user")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDetailDTO> getMyProfile(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        UserDetailDTO userDto = UserMapper.toDetailDTO(user);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/edit-user")
    public ResponseEntity<String> editUser(@RequestBody EditUserRequest editUserRequest, @RequestHeader ("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        User updated = userService.updateUser(user.getId(), editUserRequest);
        if (updated != null){
            return ResponseEntity.ok("User Updated Successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Try Again");
    }
    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse> changePassword(@RequestHeader("Authorization") String jwt, @RequestBody ChangePasswordRequestDTO req) {
        try {
            User user = userService.findUserByJWT(jwt);
            userService.changeUserPassword(user, req);
            return ResponseEntity.ok(new ApiResponse(true, "Password updated successfully."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, e.getMessage()));
        }
    }
}
