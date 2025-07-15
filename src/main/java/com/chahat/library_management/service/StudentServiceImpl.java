package com.chahat.library_management.service;

import com.chahat.library_management.dto.BookDTO;
import com.chahat.library_management.entity.Book;
import com.chahat.library_management.entity.University;
import com.chahat.library_management.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public List<BookDTO> getAvailableBooks(University university) {
        List<Book> books= bookRepository.findByUniversity(university);
        return books.stream().map(book -> new BookDTO(book.getId(), book.getTitle(), book.getAuthor(), book.getGenre(), book.getAvailabilityStatus())).toList();
    }
}
