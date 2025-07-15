package com.chahat.library_management.service;

import com.chahat.library_management.dto.BookDTO;
import com.chahat.library_management.entity.University;

import java.util.List;

public interface StudentService {
    List<BookDTO> getAvailableBooks(University university);
}