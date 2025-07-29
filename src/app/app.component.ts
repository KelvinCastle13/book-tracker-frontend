import { Component, OnInit } from '@angular/core';
import { BookService, Book } from './service/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
  books: Book[] = [];
  newBook: Partial<Book> = {
    status: false
  };
  editBook: Book | null = null;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => this.books = data);
  }

  createBook() {
    console.log('Sending new book:', this.newBook);

    if (this.newBook.title && this.newBook.author && this.newBook.genre) {
      this.bookService.addBook(this.newBook as Book).subscribe({
        next: () => {
          this.newBook = {};
          this.loadBooks();
        },
        error: (error) => {
          console.error('Server returned 422:', error);
          alert('Validation Error: ' + JSON.stringify(error.error, null, 2));
        }
      });
    } else {
      console.warn('Missing required fields:', this.newBook);
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