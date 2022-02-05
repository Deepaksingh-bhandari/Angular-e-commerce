import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { Product } from '../components/products/product/Product-Interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any[] = [];

  public productList$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor() { }

  grandTotal: number = 0;

  getProducts(): Observable<Product[]> {
    return this.productList$.asObservable();
  }

  setProduct(product: Product[]) {
    this.cartItemList.push(product);
    this.productList$.next(product);
  }
  updateProductQuantity(id: number, qty: number) {
        let x = this.cartItemList.findIndex((elem) => { return elem.id === id });

        if (x > -1) {
          let elem = this.cartItemList[x]
          elem.quantity = qty;
          elem.total = elem.price * qty;
          this.productList$.next(this.cartItemList)
        }
        else
          console.log("Item not present in cart");
  }

  addToCart(product: any) {
          let x = this.cartItemList.findIndex((elem) => { return elem.id === product.id });

          if (x > -1) {
            let elem = this.cartItemList[x]
            elem.quantity += 1;
            elem.total += elem.price;
          }
          else
            this.cartItemList.push(product);
          this.productList$.next(this.cartItemList)
          this.getTotalPrice();
          console.log("Item added to cart", this.cartItemList);
  }
  getTotalPrice() {
    this.cartItemList.map((elem) => {
      this.grandTotal += elem.amount
    })
  }
  removeCartItem(id: number) {
    this.cartItemList = this.cartItemList.filter(elem => id === elem.id ? false : true)
    this.productList$.next(this.cartItemList)
  }

}

