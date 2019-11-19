import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { POSDialogComponent } from './pos.dialog.component';
import { ProductsService } from '../services/products.services';
import { Product } from '../shared/product';
import { finalize, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
  }
  
  items: any = [];
  name: string;
  price: number;
  quantity: number;
  total: number;
  numberOfProducts: number;
  limit: number;
  page: number = 1;
  products: Product[]; 

  constructor(private productsService: ProductsService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.getSelectedItems();
    this.getAllProducts();
  }

  opened = false;

  log(state) {
    console.log(state)
  }

  onContextMenuAction($items) {
    document.querySelector('#filterCategory span').innerHTML = $items;
    this.getAllProducts($items);
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
      this.getSelectedItems();
      console.log('dialog closed!');
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

  getAllProducts($filter = '') {
    if ($filter != '' && $filter != 'All') {
        console.log('true');
        this.productsService.getProducts().pipe(
          map(data => data)
        ).subscribe((products: Product[]) => {
          this.products = products.filter(product => product.category === $filter);
          this.numberOfProducts = this.products.length;
          this.limit = this.products.length;
        }, error => {console.log(error)});
    } else {
        console.log('false');
        this.productsService.getProducts().pipe(
          map(data => data)
        ).subscribe((products: Product[]) => {
          this.products = products;
          this.numberOfProducts = this.products.length;
          this.limit = this.products.length;
        }, error => {console.log(error)});
    }
  }

  
}
