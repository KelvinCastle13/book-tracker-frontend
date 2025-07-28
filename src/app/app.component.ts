import { Component, OnInit } from '@angular/core';
import { BookService, Book } from './service/book.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
  books: Book[] = [];
  newBook: Partial<Book> = {};
  editBook: Book | null = null;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => this.books = data);
  }

  createBook() {
    if (this.newBook.title && this.newBook.author && this.newBook.genre) {
      this.bookService.addBook(this.newBook as Book).subscribe(() => {
        this.newBook = {};
        this.loadBooks();
      });
    }
  }

  startEdit(book: Book) {
    this.editBook = { ...book };
  }

  cancelEdit() {
    this.editBook = null;
  }

  saveEdit() {
    if (this.editBook) {
      this.bookService.updateBook(this.editBook.id, this.editBook).subscribe(() => {
        this.editBook = null;
        this.loadBooks();
      });
    }
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
  }
}