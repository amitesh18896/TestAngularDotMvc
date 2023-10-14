import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookComponent } from './book/book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { RouterModule,Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const appRoutes: Routes = [
  {
    path: 'details/:id',
    component: BookDetailsComponent,
    data: { title: 'Book Details' }
  },
  {
    path: '',
    component: BookComponent,
    data: { title: 'Book List' }
  },

  {
    path: 'books',
    component: BookComponent,
    data: { title: 'Book List' }
  },
  { 
    path: 'create',
    component: AddBookComponent,
    data: { title: 'Add Book' }
  },
  {
    path: 'edit/:id',
    component: EditBookComponent,
    data: { title: 'Edit Book' }  
  },
  {
    path: 'delete/:id',
    component: EditBookComponent,
    data: { title: 'Delete Book' }
  }
];


@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    BookComponent,
    BookDetailsComponent,
    EditBookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
 
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
