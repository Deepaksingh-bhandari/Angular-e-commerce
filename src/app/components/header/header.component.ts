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
    this.api.getAllProduct();
  }
  totalItem=5;

  ngOnInit(): void {
    this.cartServ.getProducts().subscribe((res)=>{
      this.totalItem=res.length;
    })
  }
  filterProducts(e:any){
  let val=e.target.value;
  console.log("filtered Products called",e,val)
  if(e.code==="Enter" || val==='')
   this.api.filterProduct$.next(val) 
  }
}
