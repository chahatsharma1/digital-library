package com.chahat.library_management.seed;

import com.chahat.library_management.domain.AvailabilityStatus;
import com.chahat.library_management.entity.Book;
import com.chahat.library_management.entity.Library;
import com.chahat.library_management.repository.BookRepository;
import com.chahat.library_management.repository.LibraryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class BookSeeder implements CommandLineRunner {

    private final BookRepository bookRepository;
    private final LibraryRepository libraryRepository;

    @Value("${app.seed-books:false}")
    private boolean seedBooks;

    @Override
    public void run(String... args){
        if (!seedBooks) {
            System.out.println("🚫 Book seeding disabled. Skipping...");
            return;
        }

        if (bookRepository.count() > 0) {
            System.out.println("📚 Books already exist. Skipping seeding...");
            return;
        }

        List<String[]> books = List.of(
                new String[]{"The Great Gatsby", "F. Scott Fitzgerald", "Fiction"},
                new String[]{"1984", "George Orwell", "Dystopian"},
                new String[]{"To Kill a Mockingbird", "Harper Lee", "Fiction"},
                new String[]{"Pride and Prejudice", "Jane Austen", "Romance"},
                new String[]{"The Catcher in the Rye", "J.D. Salinger", "Fiction"},
                new String[]{"The Hobbit", "J.R.R. Tolkien", "Fantasy"},
                new String[]{"Moby Dick", "Herman Melville", "Adventure"},
                new String[]{"Brave New World", "Aldous Huxley", "Sci-Fi"},
                new String[]{"Crime and Punishment", "Fyodor Dostoevsky", "Classic"},
                new String[]{"Wuthering Heights", "Emily Brontë", "Romance"},
                new String[]{"The Alchemist", "Paulo Coelho", "Philosophical"},
                new String[]{"Jane Eyre", "Charlotte Brontë", "Romance"},
                new String[]{"Animal Farm", "George Orwell", "Political Satire"},
                new String[]{"Lord of the Flies", "William Golding", "Fiction"},
                new String[]{"The Brothers Karamazov", "Fyodor Dostoevsky", "Classic"},
                new String[]{"Frankenstein", "Mary Shelley", "Horror"},
                new String[]{"Dracula", "Bram Stoker", "Horror"},
                new String[]{"The Picture of Dorian Gray", "Oscar Wilde", "Philosophical"},
                new String[]{"Great Expectations", "Charles Dickens", "Classic"},
                new String[]{"A Tale of Two Cities", "Charles Dickens", "Historical"},
                new String[]{"Little Women", "Louisa May Alcott", "Classic"},
                new String[]{"The Scarlet Letter", "Nathaniel Hawthorne", "Classic"},
                new String[]{"The Odyssey", "Homer", "Epic"},
                new String[]{"The Iliad", "Homer", "Epic"},
                new String[]{"Les Misérables", "Victor Hugo", "Historical"},
                new String[]{"The Divine Comedy", "Dante Alighieri", "Epic"},
                new String[]{"War and Peace", "Leo Tolstoy", "Historical"},
                new String[]{"Anna Karenina", "Leo Tolstoy", "Romance"},
                new String[]{"The Stranger", "Albert Camus", "Philosophical"},
                new String[]{"Siddhartha", "Hermann Hesse", "Philosophical"},
                new String[]{"The Old Man and the Sea", "Ernest Hemingway", "Adventure"},
                new String[]{"Fahrenheit 451", "Ray Bradbury", "Dystopian"},
                new String[]{"The Road", "Cormac McCarthy", "Post-Apocalyptic"},
                new String[]{"One Hundred Years of Solitude", "Gabriel García Márquez", "Magical Realism"},
                new String[]{"The Kite Runner", "Khaled Hosseini", "Historical"},
                new String[]{"A Thousand Splendid Suns", "Khaled Hosseini", "Historical"},
                new String[]{"The Book Thief", "Markus Zusak", "Historical"},
                new String[]{"The Girl on the Train", "Paula Hawkins", "Thriller"},
                new String[]{"Gone Girl", "Gillian Flynn", "Thriller"},
                new String[]{"The Da Vinci Code", "Dan Brown", "Thriller"},
                new String[]{"Angels & Demons", "Dan Brown", "Thriller"},
                new String[]{"The Shining", "Stephen King", "Horror"},
                new String[]{"It", "Stephen King", "Horror"},
                new String[]{"Misery", "Stephen King", "Horror"},
                new String[]{"The Hunger Games", "Suzanne Collins", "Dystopian"},
                new String[]{"Catching Fire", "Suzanne Collins", "Dystopian"},
                new String[]{"Mockingjay", "Suzanne Collins", "Dystopian"},
                new String[]{"Twilight", "Stephenie Meyer", "Fantasy"},
                new String[]{"New Moon", "Stephenie Meyer", "Fantasy"},
                new String[]{"Eclipse", "Stephenie Meyer", "Fantasy"}
        );

        List<Library> libraries = libraryRepository.findAll();

        for (Library library : libraries) {
            for (String[] b : books) {
                Book book = new Book();
                book.setTitle(b[0]);
                book.setAuthor(b[1]);
                book.setGenre(b[2]);
                book.setAvailabilityStatus(AvailabilityStatus.AVAILABLE);
                book.setLibrary(library);
                bookRepository.save(book);
            }
            System.out.println("✅ Seeded 50 books for library: " + library.getName());
        }

        System.out.println("🎉 Book seeding complete!");
    }
}
