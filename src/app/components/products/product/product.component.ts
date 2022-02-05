import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from './Product-Interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private cartServ:CartService) { }

  @Input()product!:Product;
  
  addToCart(product:Product){
    this.cartServ.addToCart(product);
  }
  ngOnInit(): void {
  }

}
