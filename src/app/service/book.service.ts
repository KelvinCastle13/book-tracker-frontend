import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  status: boolean;
}

export interface BookCreate {
  title: string;
  author: string;
  genre: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class BookService {
  private apiUrl = 'http://localhost:8000'

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/`);
  }

  addBook(book: BookCreate): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books/`, book);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${id}`);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/books/${id}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/books/${id}`);
  }
}
