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

  openDialog(): void {
    const dialogRef = this.dialog.open(POSDialogComponent, {
      width: '270px',
      data: { name: this.name, color: this.color }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.color = res;
    });
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(POSDialog);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
}
