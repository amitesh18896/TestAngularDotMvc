import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from './add-book/add-book.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'join';

  constructor(private MatDialog: MatDialog) {

  }


  openDialog() {
    this.MatDialog.open(AddBookComponent, {
      width: '350px',
    })
  }
}


