package com.chahat.library_management.mapper;

import com.chahat.library_management.dto.UserDetailDTO;
import com.chahat.library_management.entity.Library;
import com.chahat.library_management.entity.University;
import com.chahat.library_management.entity.User;

public class UserMapper {
    public static UserDetailDTO toDetailDTO(User user) {
        if (user == null) {
            return null;
        }

        UserDetailDTO dto = new UserDetailDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());

        if (user.getUniversity() != null) {
            University uni = user.getUniversity();
            dto.setUniversityName(uni.getName());
            dto.setCity(uni.getCity());
        }

        if (user.getLibrary() != null) {
            Library lib = user.getLibrary();
            dto.setLibraryName(lib.getName());
            dto.setCity(lib.getCity());
        }
        return dto;
    }
}