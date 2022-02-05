import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from '../products/product/Product-Interface';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cartItems: any[] = [];

  productSubscription!: Subscription;
  totalItem:number=0
  constructor(private cartServ: CartService) {
  }
  removeFromCart(id:number){
    this.cartServ.removeCartItem(id);
  }

  updateQuantity(id:number,qty:number){
    console.log("update qty called",id,qty);
      this.cartServ.updateProductQuantity(id,qty)
  }
  ngOnInit(): void {

    this.productSubscription = this.cartServ.getProducts().subscribe((res) => {
      this.cartItems = [...res];
      this.totalItem=res.length;
      console.log("From Cart component subscription", res);
    })
  }
  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

}
