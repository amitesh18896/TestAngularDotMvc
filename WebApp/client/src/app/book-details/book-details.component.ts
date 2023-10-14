import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
interface Book {
  Id: number;
  Title: string;
  Description: string;
  PublishedOn: string;
  Author: string;
}

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BookDetailsComponent implements OnInit {
  book: Book = {
    Id: 0,
    Title: '',
    Description: '',
    PublishedOn: '',
    Author: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private MatCardModule: MatCardModule
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.getBookDetail(id);
    }
  }

  getBookDetail(id: number) {
    this.http.get<Book>('/api/books/' + id).subscribe(
      (data) => {
        this.book = data;
      },
      (err) => {
        console.error('Error:', err);
        // Handle the error here, e.g., display an error message to the user
      }
    );
  }

  deleteBook(id: number) {
    this.http.delete('/api/books/' + id).subscribe(
      () => {
        this.router.navigate(['/books']);
      },
      (err) => {
        console.error('Error:', err);
        // Handle the error here, e.g., display an error message to the user
      }
    );
  }
}



