import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from './Product-Interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private cartServ:CartService,private router:Router) { }

  @Input()product!:Product;

  addToCart(product:Product){
    this.cartServ.addToCart(product);
  }

  buyNow(product:Product){
    this.cartServ.addToCart(product);
    this.router.navigate(['/cart'])
  }
  ngOnInit(): void {
  }

}
