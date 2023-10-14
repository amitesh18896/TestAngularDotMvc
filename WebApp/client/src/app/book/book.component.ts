import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx'; // Import XLSX from xlsx
import { saveAs } from 'file-saver'; // Import saveAs from file-saver
interface Book {
  Id: number;
  Title: string;
  Description: string;
  PublishedOn: string;
  Author: string;
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {

  dataSource = new MatTableDataSource<Book>(); // Initialize a MatTableDataSource
  pageSize = 5; // Define the page size
  pageSizeOptions = [5, 10, 25, 100]; // Define page size options

  @ViewChild(MatPaginator)
    paginator!: MatPaginator;




  book: Book = {
    Id: 0,
    Title: '',
    Description: '',
    PublishedOn: '',
    Author: '',
  };

  books: any;
  isLoading: boolean = true;
  output: any;
  private _Route: any;


  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.http.get('/api/books').subscribe((data: any) => {
      this.books = data;
      this.dataSource.data = this.books;
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
     // setTimeout(() => this.isLoading = false, 5000);
    });
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.getBookDetail(id);
    }
  }
  //downloadDataAsExcel(): void {
  //  // Convert your data to an Excel-friendly format, for example, a 2D array
  //  const excelData = this.books.map((book: any) => [book.Title, book.Author, book.Description]);

  //  const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(excelData);
  //  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

  //  // Generate the XLSX blob
  //  const excelBlob = XLSX.write(workbook, { bookType: 'xlsx', type: 'string', Bolb:'any'});

  //  // Save the blob as an Excel file using file-saver
  //  saveAs(excelBlob, 'book_data.xlsx');
  //}

  //// ... (rest of your component code)


  downloadDataAsExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.books);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Books');

    // Generate a unique name for the Excel file (e.g., based on date and time)
    const fileName = 'books_' + new Date().getTime() + '.xlsx';

    // Save the file using Blob and saveAs (you can use the FileSaver.js library for this)
    XLSX.writeFile(wb, fileName);
  }





  getBookDetail(id: number) {
    this.http.get<Book>('/api/books/' + id).subscribe(
      (data: Book) => {
        this.book = data;
      },
      (err: any) => {
        console.error('Error:', err);
      }
    );
  }
  onPageChange(event: any): void {
    // Handle page change here, e.g., update your data source with the new page
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource.data = this.books.slice(startIndex, endIndex);
  }

  openDialog(book: Book) {
    const bookClone = { ...book };
    const dialogRef = this.dialog.open(EditBookComponent, {
      width: '550px',
      data: { book: bookClone }, 
    });

    dialogRef.afterClosed().subscribe((result: { Id: number; }) => {
      if (result) {
        Object.assign(book, result);
        this.updateBook(result.Id);
      }
    });
  }
  updateBook(id: number) {
    this.http.put('/api/books/' + id, this.book).subscribe(
      () => {
        this.router.navigate(['/details', id]);
        this.router.navigate(['/books']);
      },
      (err: any) => {
        console.error('Error:', err);

      }
    );
  }

}
