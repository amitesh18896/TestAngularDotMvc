import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { BookComponent } from '../book/book.component';
interface Book {
  Id: number;
  Title: string;
  Description: string;
  PublishedOn: string;
  Author: string;
}

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditBookComponent implements OnInit {
  book!: { Id: number; Title: string; Description: string; PublishedOn: string; Author: string; };
  //book: Book = {
  //  Id: 0,
  //  Title: '',
  //  Description: '',
  //  PublishedOn: '',
  //  Author: '',
  //};

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EditBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book }
  ) { }

  ngOnInit() {
    //  const id = this.route.snapshot.params['id'];
    //  if (id) {
    //    this.getBookDetail(id);
    //  }
    //}
    if (this.data && this.data.book) {
      // Fill the form with the book data passed from the parent component
      this.book = { ...this.data.book };
    }
  }

  getBookDetail(id: number) {
    this.http.get<Book>('/api/books/' + id).subscribe(
      (data) => {
        this.book = data;
      },
      (err) => {
        console.error('Error:', err);
       
      }
    );
  }

  updateBook(id: number) {
    this.http.put('/api/books/' + id, this.book).subscribe(
      () => {
      //  this.router.navigate(['/details', id]);
        this.router.navigate(['/books']);
      },
      (err) => {
        console.error('Error:', err);
     
      }
    );
  }

  onSave(): void {
    // Handle the save action here, if needed
    this.dialogRef.close(this.data.book);
  }

  onCancel(): void {
    this.dialogRef.close();
  }



  deleteBook(id: number) {
    this.http.delete('/api/books/' + id).subscribe(
      () => {
        this.router.navigate(['/books']);
      },
      (err) => {
        console.error('Error:', err);
      }
    );
  }
}














