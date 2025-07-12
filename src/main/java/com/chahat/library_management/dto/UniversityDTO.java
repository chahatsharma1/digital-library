package com.chahat.library_management.dto;

import lombok.Data;

@Data
public class UniversityDTO {
    private String name;
    private String city;

    public UniversityDTO(String name, String city) {
        this.name = name;
        this.city = city;
    }
}
