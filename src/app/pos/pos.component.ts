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
  items: any = [];
  name: string;
  price: number;
  quantity: number;
  total: number;
  products: any = [
    {
      name: "Product 1",
      price: 25.00,
      category: "category-1",
      image: "assets/img/1.jpg",
      color: "blue-badge"
    },
    {
      name: "Product 2",
      price: 105.00,
      category: "category-2",
      image: "assets/img/2.jpg",
      color: "yellow-badge"
    },
    {
      name: "Product 3",
      price: 49.00,
      category: "category-3",
      image: "assets/img/3.jpg",
      color: "red-badge"
    },
    {
      name: "Product 4",
      price: 95.00,
      category: "category-4",
      image: "assets/img/4.jpg",
      color: "purple-badge"
    },
    {
      name: "Product 5",
      price: 80.00,
      category: "category-5",
      image: "assets/img/5.jpg",
      color: "green-badge"
    },
    {
      name: "Product 6",
      price: 140.00,
      category: "category-6",
      image: "assets/img/1.jpg",
      color: "orange-badge"
    }
  ]

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.getSelectedItems();
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
      this.getSelectedItems();
    });
  }

  getSelectedItems() {
    this.items = [];
    let arr = [];
    Object.keys(sessionStorage).forEach(function(key){
      arr.push(JSON.parse(sessionStorage.getItem(key)));
    });
    this.items = arr;
    console.log(this.items);
  }

}
