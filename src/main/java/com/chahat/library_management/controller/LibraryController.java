package com.chahat.library_management.controller;

import com.chahat.library_management.entity.Book;
import com.chahat.library_management.entity.Library;
import com.chahat.library_management.repository.BookRepository;
import com.chahat.library_management.service.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/libraries")
public class LibraryController {

    @Autowired
    private LibraryService libraryService;

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public ResponseEntity<List<Library>> getAllLibraries() {
        List<Library> libraries = libraryService.getAllLibraries();
        return ResponseEntity.ok(libraries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Library> getLibraryById(@PathVariable Long id) {
        Library library = libraryService.getLibraryById(id);
        return ResponseEntity.ok(library);
    }

    @GetMapping("/{libraryId}/books")
    public ResponseEntity<List<Book>> getBooksByLibrary(@PathVariable Long libraryId){
        List<Book> books = bookRepository.findByLibraryId(libraryId);
        return ResponseEntity.ok(books);
    }
}
