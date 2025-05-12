package com.chahat.library_management.dto;

import com.chahat.library_management.domain.AvailabilityStatus;
import lombok.Data;

@Data
public class BookDTO {
    private Long id;
    private String title;
    private String author;
    private String genre;
    private AvailabilityStatus availabilityStatus;
}
