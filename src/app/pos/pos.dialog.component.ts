import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ModalData } from './model-data';

@Component({
  selector: 'pos-dialog',
  templateUrl: './pos.dialog.html'
})

export class POSDialogComponent implements OnInit {
  indexs: number;

  constructor(
    public dialogRef: MatDialogRef<POSDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData) 
  { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  compute(v: number) {

    let vals = new Number(this.data.quantity);
    let str = new String(this.data.quantity);

    if (vals == 0 && str.length <= 2) {
      this.data.quantity = v;
    } else {
      this.data.quantity += v;
    }

    this.data.total = (this.data.quantity * this.data.price);
  }

  clear() {

    let vals = new String(this.data.quantity);

    if (vals.length > 1) {
      this.data.quantity = parseFloat(vals.substring(0, vals.length - 1));
    } else {
      this.data.quantity = 0;
    }

    this.data.total = (this.data.quantity * this.data.price);
  }

  addItem() {
    let json = {
      name: this.data.name,
      quantity: parseFloat(this.data.quantity),
      price: parseFloat(this.data.price),
      discount: parseFloat(0),
      total_price : parseFloat(this.data.total)
    }

    sessionStorage.setItem(sessionStorage.length, JSON.stringify(json));
    console.log('save');
  }


}