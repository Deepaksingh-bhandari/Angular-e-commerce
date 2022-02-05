import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private api:ApiService,private cartServ:CartService) { 
    this.api.getProduct();
  }
  totalItem=5;
  ngOnInit(): void {
    this.cartServ.getProducts().subscribe((res)=>{
      this.totalItem=res.length;
    })
  }

}
