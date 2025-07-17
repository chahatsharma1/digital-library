package com.chahat.library_management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IssueResponseDTO {
    private Long id;
    private BookDTO book;
    private StudentDTO student;
    private String issueDate;
    private String returnDate;
}
