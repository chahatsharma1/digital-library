package com.chahat.library_management.dto;

import com.chahat.library_management.domain.AvailabilityStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BookDTO {
    private final Long id;
    private final String title;
    private final String author;
    private final String genre;
    private final AvailabilityStatus availabilityStatus;
}
