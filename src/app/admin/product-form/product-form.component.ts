import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../category.service';
import { take } from 'rxjs/operators';
import { ProductService } from '../../product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any>;
  product: any = {};
  id: string;

  constructor(
    categoryService: CategoryService, 
    private productService: ProductService, 
    private router: Router,
    private route: ActivatedRoute
    ) { 
      this.categories$ = categoryService.getAll();
      
      this.id = this.route.snapshot.paramMap.get('id');
    
      if(this.id) {
        this.productService.get(this.id).pipe(
          take(1))
          .subscribe(p => {
            this.product = p;
          });
    }
  }

  ngOnInit(): void {
  }

  save(product) {
    if(this.id)  this.productService.update(this.id,product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure to delete this product')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
    
  }
}
