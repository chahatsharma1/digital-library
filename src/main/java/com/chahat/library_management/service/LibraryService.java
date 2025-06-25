package com.chahat.library_management.service;

import com.chahat.library_management.entity.Library;
import java.util.List;

public interface LibraryService {
    List<Library> getAllLibraries();
    Library getLibraryById(Long id);
}
