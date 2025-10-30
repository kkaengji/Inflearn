package com.group.libraryapp.service.book;

import com.group.libraryapp.repository.book.BookMemoryRepository;
import com.group.libraryapp.repository.book.BookMySqlRepository;
import com.group.libraryapp.repository.book.BookRepository;

public class BookService {

    private final BookRepository bookRepository = new BookMySqlRepository();

    public void saveBook() {
        bookRepository.saveBook();
    }
}
