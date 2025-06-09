package com.chahat.library_management.service;

import com.chahat.library_management.entity.Book;
import com.chahat.library_management.entity.Issue;
import com.chahat.library_management.entity.University;
import com.chahat.library_management.entity.User;
import com.chahat.library_management.repository.BookRepository;
import com.chahat.library_management.repository.IssueRepository;
import com.chahat.library_management.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class LibrarianServiceImpl implements LibrarianService {

    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Book addBook(Book book, University university) {
        book.setUniversity(university);
        return bookService.addBook(book);
    }

    @Override
    public List<Book> getAllBooks(University university) {
        return bookRepository.findByUniversity(university);
    }

    @Override
    public Issue issueBookToStudent(Long bookId, Long studentId, University university) {
        Book book = bookRepository.findByIdAndUniversity(bookId, university)
                .orElseThrow(() -> new IllegalArgumentException("Book not found for this university"));

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));

        if (!student.getUniversity().getId().equals(university.getId())) {
            throw new IllegalArgumentException("Student does not belong to this university");
        }

        Issue issue = Issue.builder()
                .book(book)
                .user(student)
                .university(university)
                .issueDate(LocalDate.now())
                .build();

        return issueRepository.save(issue);
    }

    @Override
    public Issue returnBook(Long issueId, University university) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new IllegalArgumentException("Issue record not found"));

        if (!issue.getUniversity().getId().equals(university.getId())) {
            throw new IllegalArgumentException("Issue does not belong to this university");
        }

        issue.setReturnDate(LocalDate.now());

        return issueRepository.save(issue);
    }

    @Override
    public List<Issue> getAllIssuedBooks(University university) {
        return issueRepository.findByUniversity(university);
    }

    @Override
    public List<Issue> getIssuedBooksByStudent(Long studentId, University university) {
        return issueRepository.findByUserIdAndUniversity(studentId, university);
    }
}
