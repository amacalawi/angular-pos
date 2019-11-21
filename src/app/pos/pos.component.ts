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
  totalItems: number;
  subTotal: number;
  vatTotal: number;
  totalDiscount: number;
  totalPayment: number; 

  constructor(private productsService: ProductsService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.getSelectedItems();
    this.getAllProducts();
    this.computeTotalPayments();
  }

  opened = false;

  log(state: any) {
    console.log(state)
  }

  onContextMenuAction($items: string) {
    this.getAllProducts($items);
  }

  goTo(link: string) {
    setTimeout(() => {
      this.router.navigate(['/' + link]);
    }, 300);
  }

  searchbar = true;
  toggleClass(searchbar: boolean) {
    searchbar = !false;
  }

  openDialog($name: any, $price: any, $qty: any, $total: any): void {
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
      this.computeTotalPayments();
      console.log('dialog closed!');
    });
  }

  getSelectedItems() {
    this.items = [];
    let arr = [];
    let keys = [];

    Object.keys(sessionStorage).forEach(function(key){
      keys.push(key);
    });

    keys.sort(function(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    for (let i = 0; i < keys.length; i++) {
      let key: any = keys[i];
      arr.push(JSON.parse(sessionStorage.getItem(key)));
    }
    
    this.items = arr;
    this.totalItems = arr.length;
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
      }, error => { console.log(error) });
    } else {
      console.log('false');
      this.productsService.getProducts().pipe(
        map(data => data)
      ).subscribe((products: Product[]) => {
        this.products = products;
        this.numberOfProducts = this.products.length;
        this.limit = this.products.length;
      }, error => { console.log(error) });
    }
  }

  computeTotalPayments() {
    let vat: number = 0;
    let sub: number = 0;
    let vatMultiplier: number = parseFloat(0.12);
    this.items.forEach(function(data: any){
      vat += (parseFloat(data.total) * parseFloat(vatMultiplier));
      sub += parseFloat(data.total);
    });
    this.vatTotal = vat;
    this.subTotal = sub;
    this.totalDiscount = 0;
    this.totalPayment = (vat + sub);
    console.log(this.vatTotal);
    console.log(this.subTotal);
  }

}
