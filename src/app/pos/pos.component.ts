import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { POSDialogComponent } from './pos.dialog.component';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {
  name: string;
  price: number;
  quantity: number;
  total: number;

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }

  opened = false;

  log(state) {
    console.log(state)
  }

  goTo(link) {
    setTimeout (() => {
       this.router.navigate(['/' + link]);
    }, 300); 
  }

  searchbar = true;
  toggleClass(searchbar){
  	searchbar = !false;
  } 

  openDialog($name, $price, $qty, $total): void {
    const dialogRef = this.dialog.open(POSDialogComponent, {
      width: '270px',
      data: { 
        name: $name, 
        price: $price, 
        quantity: $qty, 
        total: $total
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.name = '';
      this.price = 0;
      this.quantity = 0;
      this.total = 0;
      console.log('closed');
    });
  }

}
