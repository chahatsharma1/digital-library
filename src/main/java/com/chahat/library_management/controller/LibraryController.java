package com.chahat.library_management.controller;

import com.chahat.library_management.entity.Book;
import com.chahat.library_management.entity.Library;
import com.chahat.library_management.entity.University;
import com.chahat.library_management.repository.BookRepository;
import com.chahat.library_management.service.LibraryService;
import com.chahat.library_management.service.UniversityService;
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

    @Autowired
    private UniversityService universityService;

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

    @GetMapping("/universities")
    public ResponseEntity<List<University>> getAllUniversity(){
        List<University> universities = universityService.getAllUniversities();
        return ResponseEntity.ok(universities);
    }
}
