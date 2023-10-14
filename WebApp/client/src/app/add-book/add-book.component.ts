import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table'; 
interface Book {
  Title: string;
  Description: string;
  PublishedOn: string;
  Author: string;
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddBookComponent implements OnInit {
  book: Book = {
    Title: '',
    Description: '',
    PublishedOn: '',
    Author: '',
  };
    loading: any;

  constructor(private http: HttpClient, private router: Router, private MatDialog: MatDialog,
    private MatDatepickerModule: MatDatepickerModule
    ) { }

  ngOnInit() { }

  openDialog() {
    this.MatDialog.open(AddBookComponent, {
      width: '350px',
    })

  }

  //save(): void {
  //  this.loading = true;
  //}



  createBook() {
    this.http.post('/api/books', this.book).subscribe(
      (res: any) => {
        let id = res['Id'];
       // this.router.navigate(['/details', id]);
        this.router.navigate(['/books']);
      },
      (err) => {
        console.error('Error:', err); 
        // Handle the error here, e.g., display an error message to the user
      }
    );
  }
}

