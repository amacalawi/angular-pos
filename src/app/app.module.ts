import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatGridListModule, MatMenuModule, MatCardModule, MatDialogModule } from  '@angular/material';
import { PosComponent } from './pos/pos.component';
import { POSDialogComponent } from './pos/pos.dialog.component';

import { ProductsService } from './services/products.services';
import { ProductFilterPipe } from './shared/product-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PosComponent,
    POSDialogComponent,
    ProductFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [
    ProductsService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [POSDialogComponent]
})
export class AppModule { }
