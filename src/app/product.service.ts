import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from 'angularfire2/database';
import { Observable } from 'rxjs';

import { Product } from './models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db.list('/products')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action: SnapshotAction<Product>) => {
            return {
              key: action.key,
              title: action.payload.val().title,
              price: action.payload.val().price,
              category: action.payload.val().category,
              imageUrl: action.payload.val().imageUrl,
            };
          });
        }),
      );
  }

  get(productId: string): Observable<any> {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/'+productId).remove();
  }
}
