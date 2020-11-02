import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs';

import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscribtion: Subscription;

  constructor(private productService:ProductService) { 
    this.subscribtion = this.productService.getAll().subscribe(products => 
      {
        this.filteredProducts = this.products = products;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
  }
}
