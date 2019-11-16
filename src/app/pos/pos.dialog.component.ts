import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ModalData } from './model-data';

@Component({
  selector: 'pos-dialog',
  templateUrl: './pos.dialog.html'
})

export class POSDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<POSDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData) 
  { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}