package com.chahat.library_management.mapper;

import com.chahat.library_management.dto.BookDTO;
import com.chahat.library_management.dto.IssueResponseDTO;
import com.chahat.library_management.dto.StudentDTO;
import com.chahat.library_management.entity.Issue;

public class IssueMapper {

    public static IssueResponseDTO toDTO(Issue issue) {
        BookDTO bookDTO = new BookDTO();
        bookDTO.setId(issue.getBook().getId());
        bookDTO.setTitle(issue.getBook().getTitle());
        bookDTO.setAuthor(issue.getBook().getAuthor());

        StudentDTO studentDTO = new StudentDTO();
        studentDTO.setId(issue.getUser().getId());
        studentDTO.setName(issue.getUser().getName());
        studentDTO.setEmail(issue.getUser().getEmail());

        IssueResponseDTO dto = new IssueResponseDTO();
        dto.setId(issue.getId());
        dto.setBook(bookDTO);
        dto.setStudent(studentDTO);
        dto.setIssueDate(issue.getIssueDate().toString());
        dto.setReturnDate(issue.getReturnDate() != null ? issue.getReturnDate().toString() : null);

        return dto;
    }
}
